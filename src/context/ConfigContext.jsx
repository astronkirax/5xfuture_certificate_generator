import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { DEFAULT_CONFIG } from '../data/defaults.js'

const STORAGE_KEY = '5xfuture.config.v1'
const ConfigContext = createContext(null)

// Deep-merge persisted config over defaults so newly added default keys always exist.
function mergeConfig(base, override) {
  if (Array.isArray(base)) return override ?? base
  if (base && typeof base === 'object') {
    const out = { ...base }
    if (override && typeof override === 'object') {
      for (const key of Object.keys(override)) {
        out[key] = mergeConfig(base[key], override[key])
      }
    }
    return out
  }
  return override ?? base
}

function loadConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_CONFIG
    return mergeConfig(DEFAULT_CONFIG, JSON.parse(raw))
  } catch {
    return DEFAULT_CONFIG
  }
}

export function ConfigProvider({ children }) {
  const [config, setConfig] = useState(loadConfig)

  // Persist on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
    } catch {
      /* storage may be unavailable (private mode); ignore */
    }
  }, [config])

  // Push brand colours into CSS variables so the live preview + PDF use them
  useEffect(() => {
    const root = document.documentElement
    const b = config.brand
    root.style.setProperty('--purple', b.purple)
    root.style.setProperty('--purple-deep', b.purpleDeep)
    root.style.setProperty('--purple-soft', b.purpleSoft)
    root.style.setProperty('--orange', b.orange)
    root.style.setProperty('--orange-deep', b.orangeDeep)
    root.style.setProperty('--orange-light', b.orangeLight)
    root.style.setProperty('--cream', b.cream)
    root.style.setProperty('--ink', b.ink)
    root.style.setProperty('--muted', b.muted)
    root.style.setProperty('--placeholder', b.placeholder)
  }, [config.brand])

  const value = useMemo(
    () => ({
      config,
      setConfig,
      // Replace one top-level section (e.g. updateSection('offerText', {...}))
      updateSection: (key, patch) =>
        setConfig((c) => ({ ...c, [key]: { ...c[key], ...patch } })),
      // Reset one section or the whole config to defaults
      resetSection: (key) =>
        setConfig((c) => ({ ...c, [key]: DEFAULT_CONFIG[key] })),
      resetAll: () => setConfig(DEFAULT_CONFIG),
    }),
    [config],
  )

  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
}

export function useConfig() {
  const ctx = useContext(ConfigContext)
  if (!ctx) throw new Error('useConfig must be used within ConfigProvider')
  return ctx
}
