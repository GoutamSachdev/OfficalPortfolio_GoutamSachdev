"""Generate the portfolio's icon set from one geometry definition.

    python scripts/make-icons.py            # write favicon.svg + the rasters
    python scripts/make-icons.py --check    # re-open them and print ASCII proofs
    python scripts/make-icons.py --glyphs   # print the monogram alone, large

The mark is a "GS" monogram on a dark rounded tile with a magenta ring, matching
the nav logo. public/favicon.svg is written from here too, so the vector and the
rasters cannot drift apart — the SVG's arc flags are derived from the same sweep
angles the rasters sample.

Rasters are drawn 4x oversized and downsampled, which is what smooths the curves.

Outputs: favicon.svg, favicon.ico (16/32/48), apple-touch-icon.png (180),
icon-192.png, icon-512.png. The .ico keeps transparent corners for a browser
tab; the PNGs are full-bleed with the tile inset, because iOS and Android apply
their own mask and would otherwise show transparent corners as black.
"""
import math
import os
import sys

from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, os.pardir)
PUBLIC = os.path.join(ROOT, "public")

DARK = (15, 15, 16, 255)        # #0f0f10
LIGHT = (247, 247, 245, 255)    # #f7f7f5
MAGENTA = (182, 62, 150, 255)   # #B63E96
HEX = {"dark": "#0f0f10", "light": "#f7f7f5", "magenta": "#B63E96"}

UNIT = 100.0        # design space, the SVG viewBox
CORNER = 26.0       # tile corner radius
RING = 9.0          # magenta band, measured inward from the tile edge
STROKE = 9.0        # glyph weight, before scaling
GLYPH_SCALE = 0.92  # shrink the monogram about the tile centre so it clears the ring
SS = 4              # supersampling factor

# --- glyph geometry, in design units -------------------------------------
G_CX, G_CY = 34.7, 50.0     # the G's ellipse
G_RX, G_RY = 13.0, 20.5
G_A0, G_A1 = -55.0, -360.0  # 305 degrees, leaving the opening a G needs
G_BAR_X = 33.7              # crossbar runs left from where the arc ends

S_SPINE = 67.5              # the S is two bowls on one vertical spine
S_R = 8.8
S_TOP_Y, S_BOT_Y = 42.5, 57.5
S_TOP_A0, S_TOP_A1 = -10.0, -270.0
S_BOT_A0, S_BOT_A1 = -90.0, 170.0


def placed(p):
    """The monogram, shrunk about the tile centre. Uniform, so an ellipse stays
    an ellipse and the arc flags survive the transform."""
    return (UNIT / 2 + (p[0] - UNIT / 2) * GLYPH_SCALE,
            UNIT / 2 + (p[1] - UNIT / 2) * GLYPH_SCALE)


def arc(cx, cy, rx, ry, a0, a1, steps=72):
    """Points along an arc, both ends included. Screen convention: y grows
    downward, so a *decreasing* angle reads as counter-clockwise on screen."""
    out = []
    for i in range(steps + 1):
        t = math.radians(a0 + (a1 - a0) * i / steps)
        out.append((cx + rx * math.cos(t), cy + ry * math.sin(t)))
    return out


def glyph():
    """The letterforms as polylines, already placed in the tile."""
    g = [placed(p) for p in arc(G_CX, G_CY, G_RX, G_RY, G_A0, G_A1)]
    g.append(placed((G_BAR_X, G_CY)))  # crossbar, leftward from the arc's end
    return [
        g,
        [placed(p) for p in arc(S_SPINE, S_TOP_Y, S_R, S_R, S_TOP_A0, S_TOP_A1)],
        [placed(p) for p in arc(S_SPINE, S_BOT_Y, S_R, S_R, S_BOT_A0, S_BOT_A1)],
    ]


def weight():
    return STROKE * GLYPH_SCALE


# --- vector ---------------------------------------------------------------
def svg_arc(cx, cy, rx, ry, a0, a1):
    """An SVG elliptical-arc command covering a0 -> a1, plus its start point.

    The flags are read off the sweep rather than typed, which is the whole
    reason the SVG is generated: a hand-written flag is a silent wrong shape.
    """
    x0, y0 = placed((cx + rx * math.cos(math.radians(a0)),
                     cy + ry * math.sin(math.radians(a0))))
    x1, y1 = placed((cx + rx * math.cos(math.radians(a1)),
                     cy + ry * math.sin(math.radians(a1))))
    large = 1 if abs(a1 - a0) > 180 else 0
    sweep = 0 if a1 < a0 else 1
    return (f"{x0:.2f} {y0:.2f}",
            f"A{rx * GLYPH_SCALE:.2f} {ry * GLYPH_SCALE:.2f} 0 {large} {sweep} "
            f"{x1:.2f} {y1:.2f}")


def write_svg():
    g0, g_arc = svg_arc(G_CX, G_CY, G_RX, G_RY, G_A0, G_A1)
    bar = placed((G_BAR_X, G_CY))
    s_top, s_top_arc = svg_arc(S_SPINE, S_TOP_Y, S_R, S_R, S_TOP_A0, S_TOP_A1)
    s_bot, s_bot_arc = svg_arc(S_SPINE, S_BOT_Y, S_R, S_R, S_BOT_A0, S_BOT_A1)

    doc = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <!-- Dark rounded tile with a magenta ring. One rect does both: the stroke is
       centred on the {RING / 2:.1f}..{UNIT - RING / 2:.1f} box, so its outer edge lands exactly
       on 0..100 and its outer corner radius is {CORNER - RING / 2:.1f} + {RING / 2:.1f} = {CORNER:.0f}, matching the
       fill. That leaves a {RING:.0f}-unit band of brand colour, which is what keeps the
       icon legible on a dark tab strip where a plain dark tile would vanish. -->
  <rect x="{RING / 2:.1f}" y="{RING / 2:.1f}" width="{UNIT - RING:.1f}" height="{UNIT - RING:.1f}" rx="{CORNER - RING / 2:.1f}"
        fill="{HEX['dark']}" stroke="{HEX['magenta']}" stroke-width="{RING:.0f}"/>

  <!-- "GS", monoline, matching the nav logo. The G's ellipse is narrowed so the
       two letters balance; its arc runs 305 degrees, leaving the opening and
       crossbar that make it a G rather than an O. -->
  <g fill="none" stroke="{HEX['light']}" stroke-width="{weight():.2f}"
     stroke-linecap="round" stroke-linejoin="round">
    <path d="M{g0} {g_arc} L{bar[0]:.2f} {bar[1]:.2f}"/>
    <path d="M{s_top} {s_top_arc}"/>
    <path d="M{s_bot} {s_bot_arc}"/>
  </g>
</svg>
"""
    path = os.path.join(PUBLIC, "favicon.svg")
    with open(path, "w", encoding="utf-8", newline="\n") as fh:
        fh.write(doc)
    print(f"wrote {os.path.relpath(path, ROOT)}")


# --- raster ---------------------------------------------------------------
def render(size, tile=1.0, bleed=False):
    """Draw the mark at `size` px. `tile` is the tile's share of the canvas, so
    the masked variants can inset the whole composition — ring and monogram
    together — and keep their relative spacing. `bleed` fills the square rather
    than leaving transparent corners."""
    w = size * SS
    s = w * tile / UNIT
    off = (w - w * tile) / 2

    # Transparent pixels carry the ring's RGB, not black: downsampling blends
    # colour as well as alpha, so a black backdrop would fringe the edge.
    img = Image.new("RGBA", (w, w), DARK if bleed else MAGENTA[:3] + (0,))
    d = ImageDraw.Draw(img)

    def box(inset):
        return [off + inset, off + inset, off + UNIT * s - 1 - inset,
                off + UNIT * s - 1 - inset]

    d.rounded_rectangle(box(0), radius=CORNER * s, fill=MAGENTA)
    d.rounded_rectangle(box(RING * s), radius=(CORNER - RING) * s, fill=DARK)

    cap = weight() * s / 2
    for path in glyph():
        pts = [(off + x * s, off + y * s) for x, y in path]
        d.line(pts, fill=LIGHT, width=int(round(weight() * s)), joint="curve")
        # Pillow's thick lines have flat ends; these dots round them off so the
        # terminals match the SVG's stroke-linecap.
        for x, y in (pts[0], pts[-1]):
            d.ellipse([x - cap, y - cap, x + cap, y + cap], fill=LIGHT)

    return img.resize((size, size), Image.LANCZOS)


def ascii_proof(img, label):
    """Print an image as ASCII, each pixel snapped to its nearest palette colour
    so anti-aliased edges read truthfully rather than as holes."""
    print(f"\n{label}  ({img.width}x{img.height})")
    palette = [("@", LIGHT), ("#", MAGENTA), (".", DARK)]
    px = img.convert("RGBA").load()
    for y in range(img.height):
        row = []
        for x in range(img.width):
            r, g, b, a = px[x, y]
            if a < 96:
                row.append(" ")
                continue
            row.append(min(palette, key=lambda c: (r - c[1][0]) ** 2
                           + (g - c[1][1]) ** 2 + (b - c[1][2]) ** 2)[0])
        print("  " + "".join(row))


ICO_SIZES = [(16, 16), (32, 32), (48, 48)]
TARGETS = [
    # name, size, tile share, bleed
    ("apple-touch-icon.png", 180, 0.86, True),
    ("icon-192.png", 192, 0.72, True),
    ("icon-512.png", 512, 0.72, True),
]


def main():
    if "--glyphs" in sys.argv:
        ascii_proof(render(64, tile=1.0).crop((4, 12, 60, 52)).resize((112, 80), Image.LANCZOS),
                    "monogram, 2x")
        return

    if "--check" in sys.argv:
        for name, size, _, _ in TARGETS:
            ascii_proof(Image.open(os.path.join(PUBLIC, name)), name)
        ico = Image.open(os.path.join(PUBLIC, "favicon.ico"))
        for frame in ICO_SIZES:
            ico.size = frame
            ico.load()
            ascii_proof(ico, f"favicon.ico @ {frame[0]}")
        return

    write_svg()

    # Each size drawn at full quality: letting Pillow rescale one master would
    # soften the 16px entry noticeably.
    frames = [render(w, tile=1.0) for w, _ in ICO_SIZES]
    ico_path = os.path.join(PUBLIC, "favicon.ico")
    frames[-1].save(ico_path, format="ICO", sizes=ICO_SIZES, append_images=frames[:-1])
    print(f"wrote {os.path.relpath(ico_path, ROOT)}")

    for name, size, tile, bleed in TARGETS:
        path = os.path.join(PUBLIC, name)
        render(size, tile=tile, bleed=bleed).save(path)
        print(f"wrote {os.path.relpath(path, ROOT)}")


if __name__ == "__main__":
    main()
