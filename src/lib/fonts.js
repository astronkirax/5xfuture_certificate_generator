// Make sure the serif brand fonts are actually loaded before we rasterise to PDF,
// otherwise html2canvas captures a fallback font.
const FONTS = [
  '700 40px "Playfair Display"',
  '800 40px "Playfair Display"',
  '600 16px "Cormorant Garamond"',
  '700 16px "Cormorant Garamond"',
  '400 16px "EB Garamond"',
  '600 16px "EB Garamond"',
  '700 16px "Cinzel"',
]

export async function ensureFonts() {
  if (!('fonts' in document)) return
  try {
    await Promise.all(FONTS.map((f) => document.fonts.load(f)))
    await document.fonts.ready
  } catch {
    /* non-fatal: fall back to whatever is loaded */
  }
}
