import { toCanvas } from 'html-to-image'
import { jsPDF } from 'jspdf'
import { ensureFonts } from './fonts.js'

// A4 dimensions in mm
const A4 = { w: 210, h: 297 }

// We render via html-to-image (native SVG <foreignObject>) so the BROWSER does the
// text layout and gradient painting. This avoids html2canvas's word-spacing collapse
// and its gradient `createPattern` crash on mobile (high-DPR) devices.
async function captureNode(node, pixelRatio) {
  return toCanvas(node, {
    pixelRatio,
    backgroundColor: '#ffffff',
    cacheBust: true,
    width: node.offsetWidth,
    height: node.offsetHeight,
    // Neutralise any inherited preview scaling on the captured node itself.
    style: { transform: 'none', transformOrigin: 'top left', margin: '0', boxShadow: 'none' },
  })
}

function safeName(s) {
  return (s || 'Document').replace(/[^a-z0-9]+/gi, '_').replace(/^_+|_+$/g, '')
}

/**
 * Generate and download a PDF.
 * @param {HTMLElement[]} pages  one element per A4 page
 * @param {object} opts  { orientation: 'portrait'|'landscape', fileName, scale }
 */
export async function downloadPdf(pages, opts = {}) {
  const { orientation = 'portrait', fileName = 'document', scale = 2 } = opts
  await ensureFonts()

  const pdf = new jsPDF({ orientation, unit: 'mm', format: 'a4' })
  const pageW = orientation === 'landscape' ? A4.h : A4.w
  const pageH = orientation === 'landscape' ? A4.w : A4.h

  for (let i = 0; i < pages.length; i++) {
    // Two passes can help Safari/Chrome cache embedded fonts/images on first paint.
    let canvas = await captureNode(pages[i], scale)
    canvas = await captureNode(pages[i], scale)
    const img = canvas.toDataURL('image/jpeg', 0.95)
    if (i > 0) pdf.addPage('a4', orientation)
    pdf.addImage(img, 'JPEG', 0, 0, pageW, pageH, undefined, 'FAST')
  }

  pdf.save(`${safeName(fileName)}.pdf`)
}
