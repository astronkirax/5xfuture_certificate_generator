import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const MM_TO_PX = 3.779528 // 96dpi

// Scales the true-A4-size document down to fit the available width.
// The inner (un-scaled) node is what gets captured for the PDF.
// `transform: scale` doesn't shrink the layout box, so we reserve the
// scaled height explicitly via the .preview-frame wrapper.
export default function PreviewPane({ docWidthMm, children }) {
  const wrapRef = useRef(null)
  const innerRef = useRef(null)
  const [scale, setScale] = useState(0.3)
  const [naturalH, setNaturalH] = useState(0)
  const naturalW = docWidthMm * MM_TO_PX

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const update = () => setScale(Math.min(1, el.clientWidth / naturalW))
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [naturalW])

  // Track the document's natural (un-scaled) height as content changes.
  useLayoutEffect(() => {
    const el = innerRef.current
    if (!el) return
    const measure = () => setNaturalH(el.offsetHeight)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  })

  return (
    <div className="preview-pane" ref={wrapRef}>
      <div className="preview-frame" style={{ height: naturalH * scale }}>
        <div
          className="preview-scaler"
          ref={innerRef}
          style={{ transform: `scale(${scale})`, width: naturalW }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
