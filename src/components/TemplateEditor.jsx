import { useRef } from 'react'
import { useConfig } from '../context/ConfigContext.jsx'
import { Field, TextInput } from './Field.jsx'

// one-textarea-per-line <-> array helpers
const toLines = (arr) => arr.join('\n')
const fromLines = (s) => s.split('\n').map((x) => x.trim()).filter(Boolean)

// "Key | Value" rows <-> array of [k,v]
const toRows = (rows) => rows.map(([k, v]) => `${k} | ${v}`).join('\n')
const fromRows = (s) =>
  s.split('\n').map((l) => l.split('|').map((x) => x.trim())).filter((p) => p[0])
    .map(([k, v]) => [k, v ?? ''])

function Section({ title, onReset, children }) {
  return (
    <section className="editor-section">
      <div className="editor-section-head">
        <h3>{title}</h3>
        {onReset && <button className="btn btn-ghost" onClick={onReset}>Reset</button>}
      </div>
      {children}
    </section>
  )
}

export default function TemplateEditor() {
  const { config, setConfig, updateSection, resetSection, resetAll } = useConfig()
  const fileRef = useRef(null)

  const setBrand = (k, v) => updateSection('brand', { [k]: v })
  const setCompany = (k, v) => updateSection('company', { [k]: v })
  const setCert = (k, v) => updateSection('certificateText', { [k]: v })
  const setOffer = (k, v) => updateSection('offerText', { [k]: v })
  const setList = (k, v) => setConfig((c) => ({ ...c, [k]: v }))

  const onLogo = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setConfig((c) => ({ ...c, logoDataUrl: reader.result }))
    reader.readAsDataURL(file)
  }

  const colorRow = (label, key) => (
    <div className="color-row" key={key}>
      <span>{label}</span>
      <input type="color" value={config.brand[key]} onChange={(e) => setBrand(key, e.target.value)} />
      <input className="input input-mono" value={config.brand[key]} onChange={(e) => setBrand(key, e.target.value)} />
    </div>
  )

  return (
    <div className="editor">
      <div className="editor-top">
        <p className="editor-intro">
          Edit branding and document text below. Changes preview instantly, apply to generated PDFs,
          and are saved automatically in this browser.
        </p>
        <button className="btn btn-ghost" onClick={resetAll}>Reset everything</button>
      </div>

      <Section title="Brand Colours" onReset={() => resetSection('brand')}>
        <div className="color-grid">
          {colorRow('Primary (purple)', 'purple')}
          {colorRow('Accent (orange)', 'orange')}
          {colorRow('Purple deep', 'purpleDeep')}
          {colorRow('Purple soft', 'purpleSoft')}
          {colorRow('Orange deep', 'orangeDeep')}
          {colorRow('Orange light', 'orangeLight')}
        </div>
      </Section>

      <Section title="Logo">
        <div className="logo-row">
          <img className="logo-preview" src={config.logoDataUrl || new URL('../assets/logo.png', import.meta.url).href} alt="logo" />
          <div>
            <button className="btn" onClick={() => fileRef.current?.click()}>Upload new logo</button>
            {config.logoDataUrl && (
              <button className="btn btn-ghost" onClick={() => setConfig((c) => ({ ...c, logoDataUrl: null }))}>
                Use default
              </button>
            )}
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={onLogo} />
          </div>
        </div>
      </Section>

      <Section title="Company Details" onReset={() => resetSection('company')}>
        <div className="form-grid">
          <Field label="Brand name"><TextInput value={config.company.brandName} onChange={(v) => setCompany('brandName', v)} /></Field>
          <Field label="Sub-line"><TextInput value={config.company.subline} onChange={(v) => setCompany('subline', v)} /></Field>
          <Field label="Parent company"><TextInput value={config.company.parent} onChange={(v) => setCompany('parent', v)} /></Field>
          <Field label="Parent (short)"><TextInput value={config.company.parentShort} onChange={(v) => setCompany('parentShort', v)} /></Field>
          <Field label="CIN"><TextInput value={config.company.cin} onChange={(v) => setCompany('cin', v)} /></Field>
          <Field label="City"><TextInput value={config.company.city} onChange={(v) => setCompany('city', v)} /></Field>
          <Field label="Website"><TextInput value={config.company.website} onChange={(v) => setCompany('website', v)} /></Field>
          <Field label="Email"><TextInput value={config.company.email} onChange={(v) => setCompany('email', v)} /></Field>
          <Field label="Phone"><TextInput value={config.company.phone} onChange={(v) => setCompany('phone', v)} /></Field>
        </div>
      </Section>

      <Section title="Dropdown Options">
        <div className="form-grid">
          <Field label="Courses (one per line)">
            <textarea className="input ta" rows={5} value={toLines(config.courseOptions)} onChange={(e) => setList('courseOptions', fromLines(e.target.value))} />
          </Field>
          <Field label="Positions (one per line)">
            <textarea className="input ta" rows={5} value={toLines(config.positionOptions)} onChange={(e) => setList('positionOptions', fromLines(e.target.value))} />
          </Field>
          <Field label="Departments (one per line)">
            <textarea className="input ta" rows={4} value={toLines(config.departmentOptions)} onChange={(e) => setList('departmentOptions', fromLines(e.target.value))} />
          </Field>
          <Field label="Employment types (one per line)">
            <textarea className="input ta" rows={4} value={toLines(config.employmentTypes)} onChange={(e) => setList('employmentTypes', fromLines(e.target.value))} />
          </Field>
        </div>
      </Section>

      <Section title="Certificate Text" onReset={() => resetSection('certificateText')}>
        <div className="form-grid">
          <Field label="Title"><TextInput value={config.certificateText.title} onChange={(v) => setCert('title', v)} /></Field>
          <Field label="Subtitle"><TextInput value={config.certificateText.subtitle} onChange={(v) => setCert('subtitle', v)} /></Field>
          <Field label="“Presented to” line"><TextInput value={config.certificateText.presented} onChange={(v) => setCert('presented', v)} /></Field>
          <Field label="Closing sentence">
            <textarea className="input ta" rows={3} value={config.certificateText.bodyAfter} onChange={(e) => setCert('bodyAfter', e.target.value)} />
          </Field>
        </div>
      </Section>

      <Section title="Offer Letter Text" onReset={() => resetSection('offerText')}>
        <p className="editor-hint">Use placeholders: {'{brand}'}, {'{parent}'}, {'{email}'}, {'{city}'}.</p>
        <Field label="Intro paragraph">
          <textarea className="input ta" rows={3} value={config.offerText.intro} onChange={(e) => setOffer('intro', e.target.value)} />
        </Field>
        <Field label="Second intro paragraph">
          <textarea className="input ta" rows={2} value={config.offerText.introSecond} onChange={(e) => setOffer('introSecond', e.target.value)} />
        </Field>
        <Field label="Roles & Responsibilities (one per line)">
          <textarea className="input ta" rows={8} value={toLines(config.offerText.roles)} onChange={(e) => setOffer('roles', fromLines(e.target.value))} />
        </Field>
        <Field label="Working Hours (format: Label | Value)">
          <textarea className="input ta" rows={4} value={toRows(config.offerText.workingHours)} onChange={(e) => setOffer('workingHours', fromRows(e.target.value))} />
        </Field>
        <Field label="Terms & Conditions (one per line)">
          <textarea className="input ta" rows={8} value={toLines(config.offerText.terms)} onChange={(e) => setOffer('terms', fromLines(e.target.value))} />
        </Field>
        <Field label="Performance Evaluation (format: Dimension | Weight)">
          <textarea className="input ta" rows={4} value={toRows(config.offerText.performance)} onChange={(e) => setOffer('performance', fromRows(e.target.value))} />
        </Field>
        <Field label="Closing paragraph">
          <textarea className="input ta" rows={3} value={config.offerText.closing} onChange={(e) => setOffer('closing', e.target.value)} />
        </Field>
        <Field label="Closing contact line">
          <textarea className="input ta" rows={2} value={config.offerText.closingContact} onChange={(e) => setOffer('closingContact', e.target.value)} />
        </Field>
      </Section>
    </div>
  )
}
