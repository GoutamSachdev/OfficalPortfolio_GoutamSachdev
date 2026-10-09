import React, { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  CATEGORIES,
  CATEGORY_BY_ID,
  NODE_R,
  RING_PHASE,
  RING_R,
  SKETCH_VIEW,
  SKILL_EDGES,
  SKILL_NODES,
} from "@/data/skills";
import { sketchCircle, sketchCurve, sketchEllipse } from "@/lib/sketch";

const NODE_BY_ID = SKILL_NODES.reduce((acc, n) => {
  acc[n.id] = n;
  return acc;
}, {});

// Gap between a node's circle and its label, in SVG user units.
const LABEL_GAP = 26;

const DIM = "opacity-20";
const LIT = "opacity-100";

/**
 * Interactive skills constellation, drawn as if sketched by hand.
 *
 * Two layers share one coordinate space: an SVG that draws the rings, the
 * connectors and the node circles, and an absolutely-positioned HTML layer
 * holding the labels. Splitting them this way means the labels are real
 * <button>s — focusable, keyboard-operable, and rendered as crisp HTML text
 * instead of tiny SVG text — while the drawing stays resolution-independent.
 * The two stay aligned because the wrapper's aspect ratio is pinned to the
 * viewBox's, so the SVG's default preserveAspectRatio maps 1:1.
 *
 * Node opacity is driven by CSS classes, not by framer-motion: the drawing
 * animation owns `pathLength` via whileInView, and a gesture that has already
 * fired will keep overriding any `animate` value on the same property.
 */
const SkillsPlayground = () => {
  const reduceMotion = useReducedMotion();

  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [activeCat, setActiveCat] = useState(null);
  // Bumping this remounts the drawing layers, which replays the sketch.
  const [runId, setRunId] = useState(0);

  // Polar layout, one ring per category. The per-ring phase is precomputed (see
  // RING_PHASE) because the rings hold 6, 6, 5 and 7 nodes — no single formula
  // aligns them, so the offsets were fitted offline to keep every node circle
  // clear of its neighbours.
  const layout = useMemo(() => {
    const rings = {};
    SKILL_NODES.forEach((n) => {
      if (!rings[n.ring]) rings[n.ring] = [];
      rings[n.ring].push(n);
    });

    const pos = {};
    Object.keys(rings).forEach((key) => {
      const ring = Number(key);
      const ringNodes = rings[key];
      const radius = RING_R[ring];
      const phase = RING_PHASE[ring];
      ringNodes.forEach((n, i) => {
        const angle = phase + (i / ringNodes.length) * Math.PI * 2;
        pos[n.id] = {
          x: SKETCH_VIEW.cx + Math.cos(angle) * radius,
          y: SKETCH_VIEW.cy + Math.sin(angle) * radius,
          angle,
        };
      });
    });
    return pos;
  }, []);

  const adjacency = useMemo(() => {
    const adj = {};
    SKILL_NODES.forEach((n) => {
      adj[n.id] = [];
    });
    SKILL_EDGES.forEach(([a, b]) => {
      if (adj[a] && adj[b]) {
        adj[a].push(b);
        adj[b].push(a);
      }
    });
    return adj;
  }, []);

  // Hover previews a node's connections; clicking pins them. With neither, a
  // category filter drives the highlight.
  const highlight = useMemo(() => {
    const focus = hovered || selected;
    if (focus) return new Set([focus, ...adjacency[focus]]);
    if (activeCat) {
      return new Set(
        SKILL_NODES.filter((n) => n.category === activeCat).map((n) => n.id)
      );
    }
    return null;
  }, [hovered, selected, activeCat, adjacency]);

  const isOn = (id) => !highlight || highlight.has(id);

  const hubSpokes = useMemo(
    () => SKILL_NODES.filter((n) => n.ring === 1).map((n) => n.id),
    []
  );

  const active = selected ? NODE_BY_ID[selected] : null;
  const activeCatInfo = activeCat ? CATEGORY_BY_ID[activeCat] : null;

  const select = (id) => setSelected((cur) => (cur === id ? null : id));
  const clear = () => {
    setSelected(null);
    setActiveCat(null);
  };

  const drawProps = (delay) => ({
    initial: reduceMotion ? false : { pathLength: 0 },
    whileInView: { pathLength: 1 },
    viewport: { once: true },
    transition: reduceMotion
      ? { duration: 0 }
      : { duration: 0.85, delay, ease: "easeInOut" },
  });

  return (
    <div className="w-full">
      {/* Toolbar: category filters + replay */}
      <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setActiveCat(null)}
          aria-pressed={activeCat === null}
          className={`rounded-full border-2 border-solid px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition-all duration-300 active:scale-95
          ${
            activeCat === null
              ? "border-primary bg-primary/10 text-primary"
              : "border-line text-dark/70 hover:border-primary/50 hover:text-primary dark:border-lineDark dark:text-light/70 dark:hover:border-primaryDark/50 dark:hover:text-primaryDark"
          }`}
        >
          All skills
        </button>
        {CATEGORIES.map((c) => {
          const on = activeCat === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveCat(on ? null : c.id)}
              aria-pressed={on}
              className={`inline-flex items-center gap-2 rounded-full border-2 border-solid px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition-all duration-300 active:scale-95
              ${
                on
                  ? "border-current"
                  : "border-line text-dark/70 hover:border-current dark:border-lineDark dark:text-light/70"
              }`}
              style={on ? { color: c.color } : undefined}
            >
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 shrink-0 rounded-full transition-transform duration-300"
                style={{ backgroundColor: c.color, transform: on ? "scale(1.35)" : "scale(1)" }}
              />
              {c.short}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => setRunId((n) => n + 1)}
          className="inline-flex items-center gap-1.5 rounded-full border-2 border-solid border-line px-3.5 py-1.5
          text-xs sm:text-sm font-semibold text-dark/70 transition-all duration-300 active:scale-95
          hover:border-primary hover:text-primary dark:border-lineDark dark:text-light/70
          dark:hover:border-primaryDark dark:hover:text-primaryDark"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5" />
          </svg>
          Replay the sketch
        </button>
      </div>

      <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        {/* Diagram */}
        <div className="overflow-x-auto">
          {/* min-w keeps the diagram legible on a phone (it pans); the aspect
              ratio matches the viewBox exactly so the HTML labels and the SVG
              drawing can't drift apart. */}
          <div
            key={runId}
            className="relative mx-auto aspect-[1400/1060] w-full min-w-[760px] max-w-3xl"
          >
            <svg
              viewBox={`0 0 ${SKETCH_VIEW.w} ${SKETCH_VIEW.h}`}
              className="absolute inset-0 h-full w-full text-dark dark:text-light"
              aria-hidden="true"
            >
              {/* Double-sketched frame */}
              <motion.path
                d={sketchEllipse(SKETCH_VIEW.cx, SKETCH_VIEW.cy, 600, 500, 11)}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.1"
                strokeOpacity="0.22"
                {...drawProps(0)}
              />
              <motion.path
                d={sketchEllipse(SKETCH_VIEW.cx, SKETCH_VIEW.cy, 618, 516, 27)}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.7"
                strokeOpacity="0.12"
                {...drawProps(0.15)}
              />

              {/* Spokes from the hub out to the specialism ring */}
              {hubSpokes.map((id, i) => {
                const p = layout[id];
                return (
                  <motion.path
                    key={`hub-${id}`}
                    d={sketchCurve(SKETCH_VIEW.cx, SKETCH_VIEW.cy, p.x, p.y, i + 41)}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                    strokeDasharray="3 5"
                    className={`transition-opacity duration-300 ${isOn(id) ? "opacity-40" : DIM}`}
                    {...drawProps(0.1 + i * 0.04)}
                  />
                );
              })}

              {/* Connectors */}
              {SKILL_EDGES.map(([a, b], i) => {
                const p1 = layout[a];
                const p2 = layout[b];
                if (!p1 || !p2) return null;
                const on = isOn(a) && isOn(b);
                return (
                  <motion.path
                    key={`${a}-${b}`}
                    d={sketchCurve(p1.x, p1.y, p2.x, p2.y, i + 3)}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={on ? 1.5 : 0.8}
                    strokeLinecap="round"
                    className={`transition-[opacity,stroke-width] duration-300 ${
                      on ? "opacity-50" : DIM
                    }`}
                    {...drawProps(0.2 + i * 0.025)}
                  />
                );
              })}

              {/* Node rings, tinted with their category colour */}
              {SKILL_NODES.map((n, i) => {
                const p = layout[n.id];
                const cat = CATEGORY_BY_ID[n.category];
                const on = isOn(n.id);
                const isSelected = selected === n.id;
                return (
                  <motion.path
                    key={n.id}
                    d={sketchCircle(p.x, p.y, NODE_R, i * 7 + 2)}
                    fill={isSelected ? cat.color : "none"}
                    fillOpacity={isSelected ? 0.16 : 0}
                    stroke={cat.color}
                    strokeWidth={isSelected ? 2.6 : 1.7}
                    className={`transition-opacity duration-300 ${on ? LIT : DIM}`}
                    {...drawProps(0.35 + i * 0.03)}
                  />
                );
              })}
            </svg>

            {/* Label layer: real buttons, positioned in the same coordinate space */}
            <div className="absolute inset-0">
              {/* Hub */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="rounded-full bg-dark px-3 py-1.5 text-[11px] font-bold text-light shadow-soft sm:px-4 sm:text-xs dark:bg-light dark:text-dark">
                  AI Engineer
                </div>
              </div>

              {SKILL_NODES.map((n) => {
                const p = layout[n.id];
                const cat = CATEGORY_BY_ID[n.category];
                const on = isOn(n.id);
                const isSelected = selected === n.id;
                const dirX = Math.cos(p.angle);
                const dirY = Math.sin(p.angle);

                // Push the label out along the node's own radius, and anchor it
                // to whichever side has more room: horizontal neighbours get a
                // side anchor, top/bottom neighbours get a centred one.
                const push = "132.5%";
                const labelStyle =
                  Math.abs(dirX) >= Math.abs(dirY)
                    ? {
                        top: "50%",
                        transform: "translateY(-50%)",
                        ...(dirX > 0 ? { left: push } : { right: push }),
                      }
                    : {
                        left: "50%",
                        transform: "translateX(-50%)",
                        ...(dirY > 0 ? { top: push } : { bottom: push }),
                      };

                return (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => select(n.id)}
                    onMouseEnter={() => setHovered(n.id)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(n.id)}
                    onBlur={() => setHovered(null)}
                    aria-pressed={isSelected}
                    title={`${n.label} — ${cat.label}`}
                    style={{
                      left: `${(p.x / SKETCH_VIEW.w) * 100}%`,
                      top: `${(p.y / SKETCH_VIEW.h) * 100}%`,
                      width: `${((NODE_R * 2) / SKETCH_VIEW.w) * 100}%`,
                      aspectRatio: "1",
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-300
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                    focus-visible:ring-primary dark:focus-visible:ring-primaryDark
                    dark:focus-visible:ring-offset-dark
                    ${on ? LIT : DIM}`}
                  >
                    <span
                      aria-hidden="true"
                      style={labelStyle}
                      className={`absolute whitespace-nowrap text-[11px] font-semibold leading-none transition-colors duration-300
                      ${isSelected ? "" : "text-dark/80 dark:text-light/80"}`}
                  >
                      <span style={isSelected ? { color: cat.color } : undefined}>
                        {n.label}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Detail panel */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-solid border-line bg-light p-6 shadow-soft dark:border-lineDark dark:bg-dark">
            {active ? (
              <motion.div
                key={active.id}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                <span
                  className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
                  style={{
                    color: CATEGORY_BY_ID[active.category].color,
                    backgroundColor: `${CATEGORY_BY_ID[active.category].color}1f`,
                  }}
                >
                  {CATEGORY_BY_ID[active.category].label}
                </span>
                <h3 className="mt-3 text-2xl font-bold dark:text-light">{active.label}</h3>
                <p className="mt-2 text-sm font-medium text-dark/70 dark:text-light/70">
                  {active.note}
                </p>

                {adjacency[active.id].length > 0 && (
                  <div className="mt-5">
                    <h4 className="text-xs font-bold uppercase tracking-wide text-dark/50 dark:text-light/50">
                      Connects to
                    </h4>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {adjacency[active.id].map((id) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => select(id)}
                          className="rounded-full border border-solid border-line px-2.5 py-1 text-xs font-semibold
                          text-dark/80 transition-all duration-300 hover:border-primary hover:text-primary
                          active:scale-95 dark:border-lineDark dark:text-light/80
                          dark:hover:border-primaryDark dark:hover:text-primaryDark"
                        >
                          {NODE_BY_ID[id].label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {active.usedIn.length > 0 && (
                  <div className="mt-5">
                    <h4 className="text-xs font-bold uppercase tracking-wide text-dark/50 dark:text-light/50">
                      Used in
                    </h4>
                    <ul className="mt-2 space-y-1.5">
                      {active.usedIn.map((p) => (
                        <li
                          key={p}
                          className="flex items-start gap-2 text-sm font-medium text-dark/80 dark:text-light/80"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ backgroundColor: CATEGORY_BY_ID[active.category].color }}
                          />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            ) : (
              <div>
                <h3 className="text-lg font-bold dark:text-light">
                  {activeCatInfo ? activeCatInfo.label : "Explore the stack"}
                </h3>
                <p className="mt-2 text-sm font-medium text-dark/70 dark:text-light/70">
                  {activeCatInfo
                    ? `Highlighting ${SKILL_NODES.filter((n) => n.category === activeCat).length} skills. Pick one to see what it connects to and where it shipped.`
                    : "Every node is clickable. Pick a skill to see what it connects to and which projects it shipped in — or follow the connections and walk the graph."}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {CATEGORIES.map((c) => (
                    <li key={c.id} className="flex items-center gap-2.5 text-sm font-medium dark:text-light">
                      <span
                        aria-hidden="true"
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: c.color }}
                      />
                      <span className="text-dark/80 dark:text-light/80">{c.label}</span>
                      <span className="ml-auto font-mono text-xs text-dark/40 dark:text-light/40">
                        {SKILL_NODES.filter((n) => n.category === c.id).length}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(selected || activeCat) && (
              <button
                type="button"
                onClick={clear}
                className="mt-6 w-full rounded-lg border-2 border-solid border-line px-4 py-2 text-sm font-semibold
                text-dark/70 transition-all duration-300 hover:border-primary hover:text-primary
                active:scale-95 dark:border-lineDark dark:text-light/70
                dark:hover:border-primaryDark dark:hover:text-primaryDark"
              >
                Reset the view
              </button>
            )}
          </div>
        </aside>
      </div>

      {/* Full index — the "see everything" list, and the mobile-friendly path
          into the same selection state as the diagram. */}
      <div className="mt-14">
        <h3 className="text-center text-xl font-bold dark:text-light sm:text-2xl">
          Every skill, by category
        </h3>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => {
            const items = SKILL_NODES.filter((n) => n.category === c.id);
            return (
              <div
                key={c.id}
                className="rounded-2xl border border-solid border-line bg-light/70 p-5 dark:border-lineDark dark:bg-dark/60"
              >
                <div className="mb-3 flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: c.color }}
                  />
                  <h4 className="text-sm font-bold dark:text-light">{c.label}</h4>
                  <span className="ml-auto font-mono text-xs text-dark/40 dark:text-light/40">
                    {items.length}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((n) => (
                    <button
                      key={n.id}
                      type="button"
                      onClick={() => select(n.id)}
                      aria-pressed={selected === n.id}
                      className={`rounded-full border border-solid px-2.5 py-1 text-xs font-medium transition-all duration-300 active:scale-95
                      ${
                        selected === n.id
                          ? "border-primary text-primary"
                          : "border-line text-dark/80 hover:border-primary/50 hover:text-primary dark:border-lineDark dark:text-light/80 dark:hover:border-primaryDark/50 dark:hover:text-primaryDark"
                      }`}
                    >
                      {n.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SkillsPlayground;
