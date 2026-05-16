"""Generate the Open Graph card for emmanuelneneodjidja.org.

Renders a 1200x630 PNG in the e-flux dialect: off-white ground, Helvetica
only, single kuntunkuni triangle as the signature mark. Mirrors the
homepage chrome (marquee, nameplate, leader). Run on demand; commit the
output at public/og-image.png.
"""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630

# E-flux palette
BG = (250, 250, 246)         # #fafaf6
INK = (12, 12, 20)           # #0c0c14
INK_2 = (38, 38, 48)         # #262630
INK_3 = (106, 106, 120)      # #6a6a78
INK_4 = (156, 156, 170)      # #9c9caa
RULE = (226, 226, 220)       # #e2e2dc
SIGNATURE = (110, 24, 24)    # #6E1818 kuntunkuni

FONT_DIR = Path("C:/Windows/Fonts")
HELV_BOLD_XL = ImageFont.truetype(str(FONT_DIR / "arialbd.ttf"), 70)
HELV_BOLD_LG = ImageFont.truetype(str(FONT_DIR / "arialbd.ttf"), 46)
HELV_BOLD_MD = ImageFont.truetype(str(FONT_DIR / "arialbd.ttf"), 30)
HELV_BOLD_SM = ImageFont.truetype(str(FONT_DIR / "arialbd.ttf"), 22)
HELV_BOLD_XS = ImageFont.truetype(str(FONT_DIR / "arialbd.ttf"), 18)
HELV_REG_LG = ImageFont.truetype(str(FONT_DIR / "arial.ttf"), 26)
HELV_REG = ImageFont.truetype(str(FONT_DIR / "arial.ttf"), 20)


def render_tracking(draw, text, xy, font, fill, tracking_px):
    """Draw text with manual letter-spacing."""
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        bbox = draw.textbbox((0, 0), ch, font=font)
        x += (bbox[2] - bbox[0]) + tracking_px


def main():
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)

    # ------------ MARQUEE STRIP (top, 56 px) ------------
    draw.rectangle((0, 0, W, 56), fill=(255, 255, 255))
    draw.line((0, 56, W, 56), fill=INK, width=1)
    # Kuntunkuni signature triangle (single use on the card)
    draw.polygon([(48, 18), (48, 38), (66, 28)], fill=SIGNATURE)
    # Marquee text (truncated for OG)
    render_tracking(draw, "NOW", (84, 22), HELV_BOLD_XS, INK, 1)
    draw.text((128, 22), "·  PRAXIS v1.0 launches at Glocal Evaluation Week, 3 June 2026",
              font=HELV_REG, fill=INK_2)
    # Issue marker right
    issue = "NO. 04  ·  MAY 2026"
    issue_bbox = draw.textbbox((0, 0), issue, font=HELV_BOLD_XS)
    iw = issue_bbox[2] - issue_bbox[0]
    render_tracking(draw, issue, (W - iw - 48 - 8 * len(issue), 22), HELV_BOLD_XS, INK_3, 1)

    # ------------ NAMEPLATE (under marquee) ------------
    np_y = 76
    np_h = 64
    draw.line((0, np_y + np_h, W, np_y + np_h), fill=INK, width=1)
    brand = "Emmanuel Nene Odjidja"
    brand_bbox = draw.textbbox((0, 0), brand, font=HELV_BOLD_MD)
    bw = brand_bbox[2] - brand_bbox[0]
    draw.text(((W - bw) // 2, np_y + 16), brand, font=HELV_BOLD_MD, fill=INK)

    # ------------ LEADER H1 (centered area) ------------
    leader_y = 188
    pad_x = 80
    # Render across multiple lines manually for control
    h1_lines = [
        "Monitoring and evaluation",
        "in fragile and",
        "conflict-affected settings.",
    ]
    line_h = 84
    for i, line in enumerate(h1_lines):
        draw.text((pad_x, leader_y + i * line_h), line, font=HELV_BOLD_XL, fill=INK)

    # ------------ BOTTOM STRIP ------------
    bot_y = H - 76
    draw.line((0, bot_y, W, bot_y), fill=RULE, width=1)
    # Subtitle: tracked uppercase
    sub = "M&E SPECIALIST  ·  RESEARCHER  ·  EPIDEMIOLOGIST"
    render_tracking(draw, sub, (pad_x, bot_y + 22), HELV_BOLD_SM, INK_3, 2)
    # Site URL right
    url_text = "emmanuelneneodjidja.org"
    url_bbox = draw.textbbox((0, 0), url_text, font=HELV_REG_LG)
    uw = url_bbox[2] - url_bbox[0]
    draw.text((W - uw - pad_x, bot_y + 24), url_text, font=HELV_REG_LG, fill=INK)

    out = Path("public/og-image.png")
    out.parent.mkdir(parents=True, exist_ok=True)
    img.save(out, "PNG", optimize=True)
    print(f"Wrote {out} ({out.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
