import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { ensureFonts } from './fonts.js'

// A4 dimensions in mm
const A4 = { w: 210, h: 297 }

async function captureNode(node, scale) {
  return html2canvas(node, {
    scale,
    backgroundColor: '#ffffff',
    useCORS: true,
    logging: false,
    // Render at the element's true layout size (the .sheet/.certificate is mm-sized)
    width: node.offsetWidth,
    height: node.offsetHeight,
    windowWidth: node.offsetWidth,
    windowHeight: node.offsetHeight,
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
    const canvas = await captureNode(pages[i], scale)
    const img = canvas.toDataURL('image/jpeg', 0.96)
    if (i > 0) pdf.addPage('a4', orientation)
    // Fill the whole A4 page; the source nodes are already exact A4 aspect ratio.
    pdf.addImage(img, 'JPEG', 0, 0, pageW, pageH, undefined, 'FAST')
  }

  pdf.save(`${safeName(fileName)}.pdf`)
}
