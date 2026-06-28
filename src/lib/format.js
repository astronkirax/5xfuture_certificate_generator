// Format an <input type="date"> value (YYYY-MM-DD) as "May 1, 2026".
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export function fmtDate(value) {
  if (!value) return ''
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  if (!m) return value
  const [, y, mo, d] = m
  return `${MONTHS[Number(mo) - 1]} ${Number(d)}, ${y}`
}

// Fill {brand}, {parent}, {email}, etc. placeholders in boilerplate strings.
export function tmpl(str, vars) {
  return String(str).replace(/\{(\w+)\}/g, (_, k) => (k in vars ? vars[k] : `{${k}}`))
}
