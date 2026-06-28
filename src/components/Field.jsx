// Small labelled form-control helpers shared by both forms.

export function Field({ label, hint, children }) {
  return (
    <label className="field">
      <span className="field-label-app">{label}</span>
      {children}
      {hint ? <span className="field-hint">{hint}</span> : null}
    </label>
  )
}

export function TextInput({ value, onChange, ...rest }) {
  return <input className="input" value={value} onChange={(e) => onChange(e.target.value)} {...rest} />
}

export function DateInput({ value, onChange }) {
  return <input type="date" className="input" value={value} onChange={(e) => onChange(e.target.value)} />
}

// A select that also allows free-typed values (datalist).
export function ComboInput({ value, onChange, options, id, placeholder }) {
  return (
    <>
      <input
        className="input"
        list={id}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      <datalist id={id}>
        {options.map((o) => <option key={o} value={o} />)}
      </datalist>
    </>
  )
}
