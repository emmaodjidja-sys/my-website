"""Generate the Open Graph card for emmanuelneneodjidja.org.

Renders a 1200x630 PNG using the site's editorial palette: dark navy ground
with cream typography and a single terracotta accent on the family name. Run
on demand; commit the output at public/og-image.png.
"""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H = 1200, 630

# Palette matched to tailwind.config.ts
INK_950 = (14, 14, 20)
INK_900 = (22, 22, 29)
INK_VIGNETTE = (31, 21, 32)
CREAM_50 = (254, 252, 248)
CREAM_300 = (228, 216, 194)
TERRA_500 = (196, 101, 58)
INK_400 = (107, 107, 133)

FONT_DIR = Path("C:/Windows/Fonts")
SERIF_BOLD = ImageFont.truetype(str(FONT_DIR / "georgiab.ttf"), 130)
SERIF_BOLD_SMALL = ImageFont.truetype(str(FONT_DIR / "georgiab.ttf"), 38)
SERIF_REG = ImageFont.truetype(str(FONT_DIR / "georgia.ttf"), 28)
SANS_BOLD = ImageFont.truetype(str(FONT_DIR / "arialbd.ttf"), 18)
SANS_REG = ImageFont.truetype(str(FONT_DIR / "arial.ttf"), 22)


def radial_vignette() -> Image.Image:
    """Subtle ellipse at top-center fading to deep ink — matches hero bg."""
    base = Image.new("RGB", (W, H), INK_950)
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    cx, cy = W // 2, -60
    rx, ry = int(W * 0.55), int(H * 0.85)
    for i in range(160, 0, -2):
        alpha = int(110 * (i / 160) ** 1.6)
        draw.ellipse(
            (cx - rx * i / 160, cy - ry * i / 160, cx + rx * i / 160, cy + ry * i / 160),
            fill=INK_VIGNETTE + (alpha,),
        )
    overlay = overlay.filter(ImageFilter.GaussianBlur(40))
    base.paste(overlay, (0, 0), overlay)
    return base


def render_tracking(draw, text, xy, font, fill, tracking_px):
    """Draw text with manual letter-spacing (PIL has no built-in)."""
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        bbox = draw.textbbox((0, 0), ch, font=font)
        x += (bbox[2] - bbox[0]) + tracking_px


def main():
    img = radial_vignette()
    draw = ImageDraw.Draw(img)

    pad_x = 80

    # Eyebrow — uppercase, wide tracking, terra
    eyebrow = "M&E SPECIALIST  ·  RESEARCHER  ·  EPIDEMIOLOGIST"
    render_tracking(draw, eyebrow, (pad_x, 90), SANS_BOLD, TERRA_500, 4)

    # Name — three stacked lines, last one in terra
    name_y = 150
    line_h = 122
    draw.text((pad_x, name_y), "Emmanuel", font=SERIF_BOLD, fill=CREAM_50)
    draw.text((pad_x, name_y + line_h), "Nene", font=SERIF_BOLD, fill=CREAM_50)
    draw.text((pad_x, name_y + line_h * 2), "Odjidja", font=SERIF_BOLD, fill=TERRA_500)

    # Terra rule under name — matches the underline on the site
    rule_y = name_y + line_h * 3 + 12
    draw.rectangle((pad_x, rule_y, pad_x + 220, rule_y + 3), fill=TERRA_500)

    # Tagline — bottom-left, cream. Sole metadata line; no metric stamp.
    tagline = "I build evaluation systems in places where they're hardest to build."
    draw.text((pad_x, H - 92), tagline, font=SERIF_REG, fill=CREAM_300)

    out = Path("public/og-image.png")
    out.parent.mkdir(parents=True, exist_ok=True)
    img.save(out, "PNG", optimize=True)
    print(f"Wrote {out} ({out.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
