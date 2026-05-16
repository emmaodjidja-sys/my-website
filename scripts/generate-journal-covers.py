"""Generate editorial-style journal cover thumbnails for the publications
strip. Each cover is 720x440 (display ~360x220) with a cream ground, the
journal name set in a large serif, the year in small caps, and a single
brand-accent rule. No journal logos are reproduced; this is an editorial
re-typesetting in the style of a journal index or contents page.
"""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

W, H = 720, 440
PAD = 36

CREAM = (240, 236, 224)        # matches --image-ground in the page
INK   = (12, 12, 20)
INK_2 = (38, 38, 48)
INK_3 = (106, 106, 120)
RULE  = (200, 195, 175)

FONT_DIR = Path("C:/Windows/Fonts")
SERIF_DISPLAY = ImageFont.truetype(str(FONT_DIR / "georgiab.ttf"), 56)
SERIF_DISPLAY_SM = ImageFont.truetype(str(FONT_DIR / "georgiab.ttf"), 44)
SERIF_DISPLAY_XS = ImageFont.truetype(str(FONT_DIR / "georgiab.ttf"), 36)
SERIF_ITALIC = ImageFont.truetype(str(FONT_DIR / "georgiai.ttf"), 22)
SANS_SM = ImageFont.truetype(str(FONT_DIR / "arialbd.ttf"), 13)


# (filename, journal name, publisher mark, year, vol/issue, accent hex)
JOURNALS = [
    ("pub-01-bmc-infdis-2025",       "BMC Infectious Diseases",      "BMC",      "2025", "Vol. 25",  "#0d8390"),
    ("pub-02-nutrients-2024",         "Nutrients",                    "MDPI",     "2024", "Vol. 16",  "#2c4a92"),
    ("pub-03-research-square-2024",   "Survival of Newborns in Burundi", "Research Square (preprint)", "2024", "rs-4337583", "#6a6a78"),
    ("pub-04-bmc-public-health-2022", "BMC Public Health",            "BMC",      "2022", "Vol. 22",  "#2a6e7d"),
    ("pub-05-int-health-2020",        "International Health",         "Oxford",   "2020", "Vol. 12",  "#1a3461"),
    ("pub-06-j-med-virology-2020",    "Journal of Medical Virology",  "Wiley",    "2020", "Vol. 92",  "#7a1a1a"),
    ("pub-07-bmc-hsr-2019",           "BMC Health Services Research", "BMC",      "2019", "Vol. 19",  "#1c6e6e"),
    ("pub-08-pastoralism-2018",       "Pastoralism",                  "Springer", "2018", "Vol. 8",   "#5f7244"),
]


def hex_to_rgb(s):
    s = s.lstrip("#")
    return tuple(int(s[i:i+2], 16) for i in (0, 2, 4))


def wrap_text(draw, text, font, max_w):
    """Word-wrap text to fit within max_w."""
    words = text.split()
    lines = []
    cur = []
    for w in words:
        trial = " ".join(cur + [w])
        bbox = draw.textbbox((0, 0), trial, font=font)
        if (bbox[2] - bbox[0]) <= max_w:
            cur.append(w)
        else:
            if cur:
                lines.append(" ".join(cur))
                cur = [w]
            else:
                lines.append(w)
                cur = []
    if cur:
        lines.append(" ".join(cur))
    return lines


def render_cover(slug, title, mark, year, volume, accent_hex):
    accent = hex_to_rgb(accent_hex)
    img = Image.new("RGB", (W, H), CREAM)
    draw = ImageDraw.Draw(img)

    # Top-left: small uppercase "PUBLISHED · YEAR" eyebrow
    eyebrow = f"PUBLISHED  {year}"
    draw.text((PAD, PAD), eyebrow, font=SANS_SM, fill=INK_3)

    # Top-right: publisher mark, uppercase tracked
    mark_up = mark.upper()
    bbox = draw.textbbox((0, 0), mark_up, font=SANS_SM)
    mark_w = bbox[2] - bbox[0]
    draw.text((W - PAD - mark_w, PAD), mark_up, font=SANS_SM, fill=accent)

    # Choose display font based on title length so it fits
    for font in (SERIF_DISPLAY, SERIF_DISPLAY_SM, SERIF_DISPLAY_XS):
        lines = wrap_text(draw, title, font, W - PAD * 2)
        # accept the first font that yields <= 3 lines
        if len(lines) <= 3:
            break
    line_h = font.size + 6

    # Center the block vertically (with slight upward bias)
    total_h = line_h * len(lines)
    y_start = (H - total_h) // 2 - 10
    for i, line in enumerate(lines):
        draw.text((PAD, y_start + i * line_h), line, font=font, fill=accent)

    # Hairline rule near the bottom
    rule_y = H - 78
    draw.line([(PAD, rule_y), (W - PAD, rule_y)], fill=RULE, width=1)

    # Bottom-left: volume / issue in italic serif
    draw.text((PAD, rule_y + 18), volume, font=SERIF_ITALIC, fill=INK_2)

    # Bottom-right: small dot mark in accent, matched typographic balance
    dot_x, dot_y = W - PAD - 8, rule_y + 30
    draw.ellipse((dot_x - 4, dot_y - 4, dot_x + 4, dot_y + 4), fill=accent)

    out = Path("public/samples/publications") / f"{slug}.png"
    out.parent.mkdir(parents=True, exist_ok=True)
    img.save(out, "PNG", optimize=True)
    print(f"  {out.name:38s}  {out.stat().st_size // 1024} KB")


def main():
    for j in JOURNALS:
        render_cover(*j)
    print(f"\nGenerated {len(JOURNALS)} covers in public/samples/publications/")


if __name__ == "__main__":
    main()
