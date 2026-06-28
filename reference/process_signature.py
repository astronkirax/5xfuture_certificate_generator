# -*- coding: utf-8 -*-
"""Extract the Director's signature block from a phone photo:
EXIF-orient -> detect blue ink -> transparent background -> crop -> rotate upright.

Outputs (saved next to this script):
  signature.png       full block  -> "For Mahasana IT Solutions Private Limited" / signature / Director
  signature-mark.png  signature + "Director" only (top company line removed)
"""
import os
import numpy as np
from PIL import Image, ImageOps

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "WhatsApp Image 2026-06-06 at 10.20.50 PM.jpeg")


def extract(src):
    """Return an upright, transparent-background RGBA crop of the blue ink."""
    im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    arr = np.asarray(im).astype(np.int16)
    R, G, B = arr[..., 0], arr[..., 1], arr[..., 2]
    gray = (R + G + B) // 3
    # Ink = blue-dominant (pen) OR genuinely dark; paper/shadow are neutral & light.
    blue = np.clip((B - R) * 5, 0, 255)
    dark = np.clip((110 - gray) * 3, 0, 255)
    alpha = np.maximum(blue, dark).astype(np.uint8)
    alpha[(gray > 200) & ((B - R) < 10)] = 0          # hard-kill bright paper
    rgba = np.dstack([arr.astype(np.uint8), alpha])
    out = Image.fromarray(rgba, "RGBA")
    ys, xs = np.where(alpha > 40)
    pad = 18
    box = (max(int(xs.min()) - pad, 0), max(int(ys.min()) - pad, 0),
           min(int(xs.max()) + pad, out.width), min(int(ys.max()) + pad, out.height))
    out = out.crop(box)
    return out.rotate(90, expand=True)                # 90 deg CCW -> upright


def trim_alpha(img, thresh=40, pad=10):
    a = np.asarray(img)[..., 3]
    ys, xs = np.where(a > thresh)
    return img.crop((max(int(xs.min()) - pad, 0), max(int(ys.min()) - pad, 0),
                     min(int(xs.max()) + pad, img.width), min(int(ys.max()) + pad, img.height)))


def split_below_first_line(img):
    """Drop the top printed line ("For Mahasana...") by cutting at the widest
    blank horizontal band in the upper half; keep signature + 'Director' below."""
    a = np.asarray(img)[..., 3]
    rowink = (a > 40).sum(axis=1)
    H = img.height
    inked = rowink > max(2, int(0.012 * img.width))
    # walk rows; find first inked run (the company line) then the following gap
    i = 0
    while i < H and not inked[i]:
        i += 1
    while i < H and inked[i]:          # end of company line
        i += 1
    gap_start = i
    while i < H and not inked[i]:      # the blank band
        i += 1
    gap_end = i
    if gap_start < H * 0.6 and gap_end > gap_start:
        cut = (gap_start + gap_end) // 2
    else:
        cut = int(H * 0.30)            # fallback
    return trim_alpha(img.crop((0, cut, img.width, H)))


full = extract(SRC)
full.save(os.path.join(HERE, "signature.png"))
mark = split_below_first_line(full)
mark.save(os.path.join(HERE, "signature-mark.png"))
print("signature.png      :", full.size)
print("signature-mark.png :", mark.size)
