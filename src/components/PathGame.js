import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { sketchCircle, sketchRoad, sketchUnderline } from "@/lib/sketch";

/**
 * A hand-drawn road the visitor traces with the pointer. There is nothing to
 * click: the pen snaps to the nearest point on the road and glides along it,
 * laying ink behind.
 *
 * Three decisions carry the whole thing:
 *
 *   - Progress is a number in [0, 1] and only ever moves forward, so a careless
 *     sweep can never undo ground the visitor has already covered. The road is
 *     something to be led along, not tested by.
 *   - The ink is one SVG path with pathLength="1" and a dash offset. Drawing it
 *     therefore needs no getTotalLength() measurement, which means there is no
 *     client-only branch that could hydrate differently from the server render.
 *   - The road's visible path and its hit-test points come from a single
 *     geometry (see sketchRoad), so the line you can see and the line you can
 *     draw on are guaranteed to be the same line.
 */

// SVG user units. The wrapper holds this exact aspect ratio, so the pointer's
// position maps 1:1 onto the viewBox with no letterboxing to correct for.
const VIEW = { w: 900, h: 640 };

// Where the road runs, kept clear of the edges so neither the pen glyph nor the
// finish star can clip.
const WAYPOINTS = [
  [70, 450], [200, 450], [300, 320], [420, 230], [540, 300],
  [620, 430], [720, 450], [790, 340], [840, 220],
];

// How near the pointer must come to a point on the road before the pen accepts
// it. Generous on purpose — this should feel like being led, not examined. It is
// also comfortably smaller than the road's closest self-approach (~139 units),
// so the radius can never bridge the loop and let the visitor skip the middle.
const CAPTURE = 88;

// Past this the road counts as finished. Short of 1 so that the final sample
// sitting a fraction behind the pointer cannot strand anyone at 99%.
const DONE = 0.985;

const ID = { ink: "pg-ink", grid: "pg-grid" };

// Five-point star for the finish. Crisp rather than wobbled: it reads as the
// target, which is a useful contrast against the hand-drawn road.
const star = (cx, cy, R, r) => {
  let d = "";
  for (let i = 0; i < 10; i++) {
    const rad = i % 2 ? r : R;
    const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
    d += `${i ? "L" : "M"} ${(cx + Math.cos(a) * rad).toFixed(1)} ${(cy + Math.sin(a) * rad).toFixed(1)} `;
  }
  return `${d}Z`;
};

const UNDERLINE = sketchUnderline(4, 4, 266, 5);

const PathGame = () => {
  const reduceMotion = useReducedMotion();
  const road = useMemo(() => sketchRoad(WAYPOINTS, 7), []);

  const boxRef = useRef(null);
  // Latest pointer position in viewBox units, and the handle of the frame
  // scheduled to consume it.
  const pending = useRef(null);
  const raf = useRef(0);

  const [progress, setProgress] = useState(0);
  const [tracing, setTracing] = useState(false);

  const won = progress >= DONE;

  // pointermove fires far faster than the screen refreshes. Stash the latest
  // point and let a single animation frame do the work, so a fast trackpad sweep
  // costs one render per frame rather than one per event.
  const advance = useCallback(
    (e) => {
      const box = boxRef.current;
      if (!box || won) return;
      const r = box.getBoundingClientRect();
      pending.current = {
        x: ((e.clientX - r.left) / r.width) * VIEW.w,
        y: ((e.clientY - r.top) / r.height) * VIEW.h,
      };
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = 0;
        const p = pending.current;
        if (!p) return;
        setProgress((cur) => {
          if (cur >= DONE) return cur;
          let best = cur;
          let bestD = CAPTURE * CAPTURE;
          for (let i = 0; i < road.samples.length; i++) {
            const s = road.samples[i];
            // Only samples ahead of the pen count. This is what makes progress
            // monotonic: wandering back can never erase the road already drawn.
            if (s.t <= cur) continue;
            const dx = s.x - p.x;
            const dy = s.y - p.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < bestD) {
              bestD = d2;
              best = s.t;
            }
          }
          return best;
        });
      });
    },
    [road, won]
  );

  useEffect(
    () => () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    },
    []
  );

  // Where the pen sits, interpolated between the two samples straddling the
  // current progress, rotated to the road's tangent so it reads as being pulled
  // along rather than as a dot chasing the cursor.
  const pen = useMemo(() => {
    const s = road.samples;
    let i = 0;
    while (i < s.length - 1 && s[i + 1].t < progress) i++;
    const a = s[i];
    const b = s[Math.min(s.length - 1, i + 1)];
    const span = b.t - a.t || 1;
    const k = Math.min(1, Math.max(0, (progress - a.t) / span));
    return {
      x: a.x + (b.x - a.x) * k,
      y: a.y + (b.y - a.y) * k,
      angle: (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI,
    };
  }, [road, progress]);

  const start = road.samples[0];
  const end = road.samples[road.samples.length - 1];
  const pct = Math.round(progress * 100);

  // pathLength="1" normalises the path to unit length, so the dash offset is
  // just 1 - progress whatever the road's real length turns out to be.
  const ink = { pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1 - progress };

  const hint = won
    ? "Road complete."
    : tracing
      ? "Keep going — follow the line."
      : "Move your cursor along the road to draw.";

  return (
    <div className="w-full">
      <div
        className="relative w-full overflow-hidden rounded-3xl border border-solid border-line
        bg-light/60 shadow-soft dark:border-lineDark dark:bg-dark/60"
      >
        {/* touch-none so a drag plays the game instead of scrolling. The reveal
            button below is the way out for anyone who would rather not, and for
            every keyboard and screen-reader visitor. */}
        <div
          ref={boxRef}
          className="relative aspect-[900/640] w-full touch-none"
          onPointerMove={advance}
          onPointerDown={advance}
          onPointerEnter={() => setTracing(true)}
          onPointerLeave={() => setTracing(false)}
        >
          <svg
            viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <defs>
              {/* Sketchbook dot grid. The colour lives on the pattern element so
                  the dots pick it up through currentColor. */}
              <pattern
                id={ID.grid}
                width="30"
                height="30"
                patternUnits="userSpaceOnUse"
                className="text-dark/10 dark:text-light/10"
              >
                <circle cx="1.7" cy="1.7" r="1.2" fill="currentColor" />
              </pattern>
              <linearGradient id={ID.ink} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#B63E96" />
                <stop offset="100%" stopColor="#58E6D9" />
              </linearGradient>
            </defs>

            <rect width={VIEW.w} height={VIEW.h} fill={`url(#${ID.grid})`} />

            {/* The road, faint and dashed: something to aim at, not to solve. */}
            <path
              d={road.d}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="8 11"
              className="text-dark/20 dark:text-light/25"
            />

            {/* A soft bleed under the fresh ink, so the line looks wet. */}
            <path
              d={road.d}
              fill="none"
              stroke={`url(#${ID.ink})`}
              strokeWidth="9"
              strokeLinecap="round"
              opacity="0.22"
              {...ink}
            />
            <path
              d={road.d}
              fill="none"
              stroke={`url(#${ID.ink})`}
              strokeWidth="2.6"
              strokeLinecap="round"
              {...ink}
            />

            {/* Start */}
            <path
              d={sketchCircle(start.x, start.y, 11, 3)}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="text-dark/30 dark:text-light/40"
            />
            {!won && !reduceMotion && (
              <motion.circle
                cx={start.x}
                cy={start.y}
                r="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                className="text-primary dark:text-primaryDark"
                animate={{ opacity: [0.15, 0.6, 0.15] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
            <text
              x={start.x}
              y={start.y - 22}
              textAnchor="middle"
              fill="currentColor"
              className="text-[11px] font-semibold tracking-wider text-dark/40 dark:text-light/50"
            >
              START
            </text>

            {/* Finish */}
            <path
              d={star(end.x, end.y, 20, 8.5)}
              fill={won ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
              className="text-primary dark:text-primaryDark"
            />
            <text
              x={end.x}
              y={end.y - 30}
              textAnchor="middle"
              fill="currentColor"
              className="text-[11px] font-semibold tracking-wider text-dark/40 dark:text-light/50"
            >
              FINISH
            </text>

            {/* The pen. A single transform on this node, so the translate and the
                rotation compose the way they read. */}
            <g transform={`translate(${pen.x} ${pen.y}) rotate(${pen.angle})`}>
              <path d="M 28 0 L 4 -6.5 L -13 -4 L -13 4 L 4 6.5 Z" className="fill-dark dark:fill-light" />
              <path d="M 26 0 L 5 0" className="stroke-light dark:stroke-dark" strokeWidth="1.1" />
              <circle cx="1" cy="0" r="2.1" className="fill-light dark:fill-dark" />
            </g>
          </svg>
        </div>
      </div>

      {/* Controls. "Reveal it anyway" is not a nicety: it is the keyboard path,
          the screen-reader path, and the way out for anyone who would rather
          read than play. */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-medium text-dark/60 sm:text-sm dark:text-light/60">{hint}</p>
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs font-semibold tabular-nums text-dark/50 dark:text-light/50">
            {pct}%
          </span>
          {won ? (
            <button
              type="button"
              onClick={() => setProgress(0)}
              className="text-xs font-semibold text-dark/70 underline decoration-2 underline-offset-4
              hover:text-primary sm:text-sm dark:text-light/70 dark:hover:text-primaryDark"
            >
              Draw it again
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setProgress(1)}
              className="text-xs font-semibold text-dark/70 underline decoration-2 underline-offset-4
              hover:text-primary sm:text-sm dark:text-light/70 dark:hover:text-primaryDark"
            >
              Reveal it anyway
            </button>
          )}
        </div>
      </div>

      {/* aria-live sits on a container that is always present, so the reveal is
          announced when it appears rather than being silent to a screen reader. */}
      <div aria-live="polite">
        {won && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: reduceMotion ? 0 : 0.15 }}
            className="mt-6 rounded-2xl border border-solid border-line bg-light/70 p-6 shadow-soft
            sm:p-8 dark:border-lineDark dark:bg-dark/60"
          >
            {/* Each line wipes in left to right, the way a pen lays down a
                line of writing. */}
            <motion.h3
              initial={reduceMotion ? false : { clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 0.85, ease: "easeInOut", delay: reduceMotion ? 0 : 0.35 }}
              className="text-2xl font-bold dark:text-light sm:text-3xl"
            >
              You found the path.
            </motion.h3>

            <motion.p
              initial={reduceMotion ? false : { clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 0.75, ease: "easeInOut", delay: reduceMotion ? 0 : 1.05 }}
              className="text-2xl font-bold text-primary dark:text-primaryDark sm:text-3xl"
            >
              Now let&apos;s find yours.
            </motion.p>

            {/* A flourish, not the message: hidden from assistive tech, because
                the words it underlines are already read out. */}
            <svg viewBox="0 0 280 24" className="mt-1 h-4 w-48 text-primary dark:text-primaryDark" aria-hidden="true">
              <motion.path
                d={UNDERLINE}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                initial={reduceMotion ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.55, ease: "easeInOut", delay: reduceMotion ? 0 : 1.7 }}
              />
            </svg>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: reduceMotion ? 0 : 2.0 }}
              className="mt-3 text-sm font-medium text-dark/70 sm:text-base dark:text-light/70"
            >
              Every product I ship starts exactly this way — one uncertain line, then momentum.
            </motion.p>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: reduceMotion ? 0 : 2.25 }}
              className="mt-6"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center rounded-lg border-2 border-solid border-transparent
                bg-dark p-2 px-4 text-base font-semibold text-light shadow-soft transition-all duration-300
                hover:-translate-y-0.5 hover:border-dark hover:shadow-cardHover active:scale-95
                sm:p-2.5 sm:px-6 sm:text-lg dark:bg-light dark:text-dark dark:hover:border-light"
              >
                Start a project
                <span aria-hidden="true" className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PathGame;
