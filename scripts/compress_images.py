#!/usr/bin/env python3
"""Compress investigator PNGs: downscale to <=1024px wide (2x the 512px
rendered width) and quantize to a 256-color palette. Same filenames;
originals recoverable from git."""
from pathlib import Path

from PIL import Image

DOCS = Path(__file__).resolve().parents[1] / "docs"
MAX_W = 1024

for sub in ("decrypted", "classified"):
    for p in sorted((DOCS / "images" / "investigators" / sub).glob("*.png")):
        before = p.stat().st_size
        img = Image.open(p)
        w, h = img.size
        if w > MAX_W:
            img = img.resize((MAX_W, round(h * MAX_W / w)), Image.LANCZOS)
        if img.mode not in ("RGB", "RGBA"):
            img = img.convert("RGBA")
        if img.mode == "RGBA" and img.getextrema()[3][0] == 255:
            img = img.convert("RGB")  # fully opaque: drop useless alpha
        method = Image.MEDIANCUT if img.mode == "RGB" else Image.FASTOCTREE
        q = img.quantize(colors=256, method=method, dither=Image.FLOYDSTEINBERG)
        q.save(p, optimize=True)
        after = p.stat().st_size
        print(f"{sub}/{p.name}: {w}x{h} {before // 1024} KB -> "
              f"{q.size[0]}x{q.size[1]} {after // 1024} KB ({100 * after // before}%)")
