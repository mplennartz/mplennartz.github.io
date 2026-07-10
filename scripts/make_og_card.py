#!/usr/bin/env python3
"""Generate docs/images/og-card.png — 1200x630 social share card."""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

DOCS = Path(__file__).resolve().parents[1] / "docs"
GREEN, YELLOW, RED, BLACK = "#00ff00", "#ffff00", "#ff0000", "#000000"

img = Image.new("RGB", (1200, 630), BLACK)
d = ImageDraw.Draw(img)


def font(size, bold=True):
    name = "courbd.ttf" if bold else "cour.ttf"
    return ImageFont.truetype(rf"C:\Windows\Fonts\{name}", size)


# subtle scan lines
for y in range(0, 630, 4):
    d.line([(0, y), (1200, y)], fill="#050a05")

# border
d.rectangle([20, 20, 1179, 609], outline=GREEN, width=4)
d.rectangle([32, 32, 1167, 597], outline="#003300", width=2)

# redaction bars above and below the title
d.rectangle([120, 120, 1080, 170], fill=GREEN)
d.rectangle([120, 460, 700, 510], fill=GREEN)
d.rectangle([740, 460, 1080, 510], fill="#111111", outline=RED, width=3)

title = "THE REDACTED TRUTH"
f_title = font(92)
w = d.textlength(title, font=f_title)
d.text(((1200 - w) / 2, 240), title, font=f_title, fill=GREEN)

sub = "CURSED INVESTIGATIONS BUREAU"
f_sub = font(36)
w = d.textlength(sub, font=f_sub)
d.text(((1200 - w) / 2, 370), sub, font=f_sub, fill=YELLOW)

stamp = "CLASSIFIED"
f_stamp = font(28)
w = d.textlength(stamp, font=f_stamp)
d.text((740 + (340 - w) / 2, 468), stamp, font=f_stamp, fill=RED)

out = DOCS / "images" / "og-card.png"
img.save(out, optimize=True)
print(f"wrote {out} ({out.stat().st_size // 1024} KB)")
