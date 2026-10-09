/**
 * Hand-drawn ("sketch") geometry for SVG.
 *
 * Everything here is a pure function seeded by an integer, deliberately NOT
 * Math.random: the wobble has to be identical between the server render and the
 * client hydration, and identical again on every re-render, or React would flag
 * a mismatch and the drawing would twitch each time state changed.
 */

// Cheap deterministic noise in [0, 1). The magic numbers are the usual
// sin-hash constants; any values work as long as they stay fixed.
export const noise = (seed) => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

// Symmetric noise in [-1, 1) — for offsets that should be able to go both ways.
const wobble = (seed) => noise(seed) * 2 - 1;

const round = (n) => Math.round(n * 100) / 100;

// A tenth of a unit is already far below one screen pixel in the viewBoxes used
// here, and the road path carries a few hundred points, so the extra digit would
// only pad the markup.
const round1 = (n) => Math.round(n * 10) / 10;

/**
 * A closed, slightly irregular ring. Returns a path `d` of quadratic segments,
 * each control point nudged off the true radius, so the result reads as drawn by
 * hand rather than as a perfect circle.
 */
export const sketchCircle = (cx, cy, r, seed, steps = 12) => {
  const points = [];
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    const rr = r * (1 + wobble(seed + i * 3.1) * 0.045);
    points.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, a, rr]);
  }

  let d = `M ${round(points[0][0])} ${round(points[0][1])}`;
  for (let i = 1; i < points.length; i++) {
    const [x, y] = points[i];
    // Control point sits at the midpoint angle, pushed out a touch, which keeps
    // the curve smooth while still bulging away from a true circle.
    const am = points[i - 1][2] + Math.PI / steps;
    const rm = r * (1 + wobble(seed + i * 5.7) * 0.03);
    const cxp = cx + Math.cos(am) * rm;
    const cyp = cy + Math.sin(am) * rm;
    d += ` Q ${round(cxp)} ${round(cyp)} ${round(x)} ${round(y)}`;
  }
  return d + " Z";
};

/**
 * A hand-drawn connector: a quadratic curve whose control point is offset along
 * the perpendicular of the straight line, so it bows very slightly instead of
 * running ruler-straight.
 */
export const sketchCurve = (x1, y1, x2, y2, seed) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  // Perpendicular unit vector.
  const nx = -dy / len;
  const ny = dx / len;
  // Cap the bow so long chords don't turn into dramatic arcs.
  const bow = wobble(seed) * Math.min(16, len * 0.1);
  const mx = (x1 + x2) / 2 + nx * bow;
  const my = (y1 + y2) / 2 + ny * bow;
  return `M ${round(x1)} ${round(y1)} Q ${round(mx)} ${round(my)} ${round(x2)} ${round(y2)}`;
};

/**
 * A wobbly ellipse, used as the decorative frame around the constellation.
 * Same construction as sketchCircle, just with independent radii.
 */
export const sketchEllipse = (cx, cy, rx, ry, seed, steps = 26) => {
  const at = (a, sx, sy) => [
    cx + Math.cos(a) * rx * sx,
    cy + Math.sin(a) * ry * sy,
  ];

  const points = [];
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    const j = 1 + wobble(seed + i * 2.3) * 0.018;
    points.push([...at(a, j, j), a]);
  }

  let d = `M ${round(points[0][0])} ${round(points[0][1])}`;
  for (let i = 1; i < points.length; i++) {
    const [x, y] = points[i];
    const am = points[i - 1][2] + Math.PI / steps;
    const j = 1 + wobble(seed + i * 4.1) * 0.014;
    const [cxp, cyp] = at(am, j, j);
    d += ` Q ${round(cxp)} ${round(cyp)} ${round(x)} ${round(y)}`;
  }
  return d + " Z";
};

/**
 * A short, tapering stroke used as an artistic underline beneath headings — it
 * flicks up at the end the way a pen does when you lift it.
 */
export const sketchUnderline = (x, y, len, seed = 1) => {
  const h = 9 + wobble(seed) * 3;
  const mid = x + len * 0.5;
  const end = x + len;
  return [
    `M ${round(x)} ${round(y + wobble(seed + 1) * 2)}`,
    `Q ${round(mid)} ${round(y + h)} ${round(end)} ${round(y + wobble(seed + 2) * 3)}`,
    // Second pass, slightly offset and much lighter: the "sketched twice" look.
    `M ${round(x + 6)} ${round(y + 3)}`,
    `Q ${round(mid)} ${round(y + h + 4)} ${round(end - 4)} ${round(y + 4)}`,
  ].join(" ");
};

/**
 * A hand-drawn road: a smooth spline through `waypoints`, wavering the way a pen
 * does, returned as BOTH the render path and a dense polyline of the same points.
 *
 * The path the visitor sees and the line the game hit-tests come from one
 * geometry, so they cannot drift apart and leave a road you can see but not
 * draw on. Each sample carries `t`, its normalised distance along the road, so
 * "how far has the visitor got" stays a plain number in [0, 1] rather than an
 * index into a curve.
 */
export const sketchRoad = (waypoints, seed = 1, stepsPerSegment = 28) => {
  const n = waypoints.length;
  // Catmull-Rom needs a neighbour on each side of a segment; clamping the index
  // lets the first and last segments use the same formula as the middle ones
  // instead of collapsing to straight lines.
  const at = (i) => waypoints[Math.min(n - 1, Math.max(0, i))];
  const base = [];

  for (let i = 0; i < n - 1; i++) {
    const [x0, y0] = at(i - 1);
    const [x1, y1] = at(i);
    const [x2, y2] = at(i + 1);
    const [x3, y3] = at(i + 2);
    const axis = (a, b, c, d) => (t, t2, t3) =>
      0.5 *
      (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
    const fx = axis(x0, x1, x2, x3);
    const fy = axis(y0, y1, y2, y3);
    // A segment's own end point is the next segment's start, so stop one step
    // short and append the final waypoint once after the loop.
    for (let s = 0; s < stepsPerSegment; s++) {
      const t = s / stepsPerSegment;
      base.push([fx(t, t * t, t * t * t), fy(t, t * t, t * t * t)]);
    }
  }
  base.push([...at(n - 1)]);

  // Arc length along the *unwobbled* spline. Measuring the smooth curve keeps
  // `t` monotonic however far the waver later pushes individual points.
  const cum = [0];
  for (let i = 1; i < base.length; i++) {
    cum.push(cum[i - 1] + Math.hypot(base[i][0] - base[i - 1][0], base[i][1] - base[i - 1][1]));
  }
  const length = cum[cum.length - 1] || 1;

  // The waver is a function of distance along the road, never of sample index:
  // two sine terms at incommensurate wavelengths read as a hand that drifts and
  // corrects itself, whereas a per-index wobble would alias into fuzz.
  const ph1 = noise(seed) * Math.PI * 2;
  const ph2 = noise(seed + 17) * Math.PI * 2;

  const samples = base.map(([x, y], i) => {
    const prev = base[Math.max(0, i - 1)];
    const next = base[Math.min(base.length - 1, i + 1)];
    const dx = next[0] - prev[0];
    const dy = next[1] - prev[1];
    const len = Math.hypot(dx, dy) || 1;
    const off = Math.sin(cum[i] / 58 + ph1) * 2.2 + Math.sin(cum[i] / 21 + ph2) * 0.9;
    return {
      x: round1(x + (-dy / len) * off),
      y: round1(y + (dx / len) * off),
      t: cum[i] / length,
    };
  });

  const d = samples.map((p, i) => `${i ? "L" : "M"} ${p.x} ${p.y}`).join(" ");
  return { d, samples, length };
};
