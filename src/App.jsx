import { useRef, useState } from 'react'
import './styles/documents.css'
import { useConfig } from './context/ConfigContext.jsx'
import { CERTIFICATE_DEFAULTS, OFFER_DEFAULTS } from './data/defaults.js'
import { downloadPdf } from './lib/pdf.js'
import bundledLogo from './assets/logo.png'

import CertificateForm from './components/forms/CertificateForm.jsx'
import OfferLetterForm from './components/forms/OfferLetterForm.jsx'
import CertificateTemplate from './components/templates/CertificateTemplate.jsx'
import OfferLetterTemplate from './components/templates/OfferLetterTemplate.jsx'
import PreviewPane from './components/PreviewPane.jsx'
import TemplateEditor from './components/TemplateEditor.jsx'

const TABS = [
  { id: 'certificate', label: 'Internship Certificate' },
  { id: 'offer', label: 'Offer Letter' },
  { id: 'editor', label: 'Template Editor' },
]

export default function App() {
  const { config } = useConfig()
  const [tab, setTab] = useState('certificate')
  const [cert, setCert] = useState(CERTIFICATE_DEFAULTS)
  const [offer, setOffer] = useState(OFFER_DEFAULTS)
  const [busy, setBusy] = useState(false)

  const previewRef = useRef(null)

  const setCertField = (k, v) => setCert((d) => ({ ...d, [k]: v }))
  const setOfferField = (k, v) => setOffer((d) => ({ ...d, [k]: v }))

  const generate = async () => {
    if (busy) return
    setBusy(true)
    try {
      const root = previewRef.current
      if (tab === 'certificate') {
        const node = root.querySelector('.certificate')
        await downloadPdf([node], {
          orientation: 'landscape',
          fileName: `5XFUTURE_Internship_Certificate_${cert.internName || 'Student'}`,
          scale: 2.5,
        })
      } else {
        const nodes = Array.from(root.querySelectorAll('.offer-sheet'))
        await downloadPdf(nodes, {
          orientation: 'portrait',
          fileName: `5XFUTURE_Offer_Letter_${offer.internName || 'Candidate'}`,
          scale: 2,
        })
      }
    } catch (err) {
      console.error(err)
      alert('Sorry, something went wrong generating the PDF. Check the console for details.')
    } finally {
      setBusy(false)
    }
  }

  const isDoc = tab === 'certificate' || tab === 'offer'
  const logo = config.logoDataUrl || bundledLogo

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-brand">
          <img src={logo} alt={config.company.brandName} />
          <div>
            <div className="app-title">{config.company.brandName} · Document Generator</div>
            <div className="app-sub">{config.company.tagline}</div>
          </div>
        </div>
        <nav className="tabs">
          {TABS.map((t) => (
            <button key={t.id} className={`tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      {tab === 'editor' ? (
        <main className="app-body editor-body">
          <TemplateEditor />
        </main>
      ) : (
        <main className="app-body">
          <aside className="panel form-panel">
            <h2 className="panel-title">{tab === 'certificate' ? 'Certificate Details' : 'Offer Letter Details'}</h2>
            {tab === 'certificate' ? (
              <CertificateForm data={cert} set={setCertField} />
            ) : (
              <OfferLetterForm data={offer} set={setOfferField} />
            )}
            <button className="btn btn-primary btn-generate" onClick={generate} disabled={busy}>
              {busy ? 'Generating…' : '⬇  Generate & Download PDF'}
            </button>
          </aside>

          <section className="panel preview-panel">
            <h2 className="panel-title">Live Preview</h2>
            {isDoc && (
              <div ref={previewRef}>
                {tab === 'certificate' ? (
                  <PreviewPane docWidthMm={297}>
                    <CertificateTemplate data={cert} />
                  </PreviewPane>
                ) : (
                  <PreviewPane docWidthMm={210}>
                    <OfferLetterTemplate data={offer} />
                  </PreviewPane>
                )}
              </div>
            )}
          </section>
        </main>
      )}
    </div>
  )
}
