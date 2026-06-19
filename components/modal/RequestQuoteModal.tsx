'use client'

import { useState, useEffect, useRef } from 'react'
import { X, ArrowRight, CheckCircle2, Zap, Wind, Network, Box } from 'lucide-react'

const CATEGORIES = [
    { id: 'Power', label: 'Power', icon: Zap },
    { id: 'Cooling', label: 'Cooling', icon: Wind },
    { id: 'Network', label: 'Network', icon: Network },
    { id: 'Physical', label: 'Physical', icon: Box },
]

const REGIONS = ['North America', 'Morocco', 'West Africa', 'Other']

const INITIAL = {
    name: '', email: '', company: '', category: '',
    region: '', brand: '', part: '', qty: '', notes: '',
}

export default function RequestQuoteModal({ open, onClose }) {
    const [form, setForm] = useState(INITIAL)
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)   // controls CSS transition
    const mounted = useRef(false)

    // Two-phase open: mount first, then trigger CSS transition
    useEffect(() => {
        if (open) {
            mounted.current = true
            // Let the DOM paint the hidden state, then animate in
            requestAnimationFrame(() => setVisible(true))
        } else {
            setVisible(false)
        }
    }, [open])

    useEffect(() => {
        if (!open) return
        const onKey = (e) => { if (e.key === 'Escape') onClose() }
        document.addEventListener('keydown', onKey)
        document.body.style.overflow = 'hidden'
        return () => {
            document.removeEventListener('keydown', onKey)
            document.body.style.overflow = ''
        }
    }, [open, onClose])

    // Reset form after close transition finishes
    const handleTransitionEnd = () => {
        if (!visible) {
            setForm(INITIAL)
            setErrors({})
            setSubmitted(false)
            setLoading(false)
        }
    }

    const set = (k, v) => {
        setForm(f => ({ ...f, [k]: v }))
        if (errors[k]) setErrors(e => ({ ...e, [k]: '' }))
    }

    const validate = () => {
        const e: Record<string, string> = {}
        if (!form.name.trim()) e.name = 'Required'
        if (!form.email.trim()) e.email = 'Required'
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email'
        if (!form.category) e.category = 'Select a category'
        if (!form.region) e.region = 'Select a region'
        if (!form.part.trim()) e.part = 'Required'
        if (!form.qty.trim()) e.qty = 'Required'
        return e
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errs = validate()
        if (Object.keys(errs).length) { setErrors(errs); return }
        setLoading(true)
        await new Promise(r => setTimeout(r, 1400))
        setLoading(false)
        setSubmitted(true)
    }

    if (!open && !visible) return null

    return (
        <>
            {/* ── Backdrop: opacity only, NO blur ── */}
            <div
                onClick={onClose}
                onTransitionEnd={handleTransitionEnd}
                style={{
                    position: 'fixed', inset: 0, zIndex: 900,
                    backgroundColor: 'rgba(0,0,0,0.72)',
                    opacity: visible ? 1 : 0,
                    transition: 'opacity 200ms ease',
                    willChange: 'opacity',
                }}
            />

            {/* ── Scroll container ── */}
            <div
                style={{
                    position: 'fixed', inset: 0, zIndex: 901,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '16px',
                    pointerEvents: visible ? 'auto' : 'none',
                }}
            >
                {/* ── Modal panel ── */}
                <div
                    onClick={e => e.stopPropagation()}
                    style={{
                        position: 'relative',
                        width: '100%', maxWidth: '672px', maxHeight: '90vh',
                        display: 'flex', flexDirection: 'column',
                        borderRadius: '16px', overflow: 'hidden',
                        border: '1px solid rgba(255,255,255,0.08)',
                        backgroundColor: '#0e0e0e',
                        // Cheap single-layer shadow — no 120px spread
                        boxShadow: '0 24px 60px rgba(0,0,0,0.7)',
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateY(0) scale(1)' : 'translateY(14px) scale(0.97)',
                        transition: 'opacity 260ms cubic-bezier(0.16,1,0.3,1), transform 260ms cubic-bezier(0.16,1,0.3,1)',
                        willChange: 'opacity, transform',
                    }}
                >
                    {/* Top shimmer */}
                    <div style={{
                        position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
                        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.12), transparent)',
                    }} />

                    {/* ── Header ── */}
                    <div style={{
                        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                        padding: '24px 24px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)',
                        flexShrink: 0,
                    }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                <div style={{
                                    width: '6px', height: '6px', borderRadius: '50%',
                                    backgroundColor: '#34d399', boxShadow: '0 0 6px rgba(52,211,153,0.6)',
                                }} />
                                <span style={{
                                    fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.2em',
                                    textTransform: 'uppercase', color: 'rgba(52,211,153,0.6)',
                                }}>Sourcing Request</span>
                            </div>
                            <h2 style={{
                                fontFamily: 'Syne, sans-serif', fontSize: '20px', fontWeight: 700,
                                color: '#fff', margin: 0, letterSpacing: '-0.02em',
                            }}>Request a Quote</h2>
                            <p style={{
                                fontFamily: 'DM Sans, sans-serif', fontSize: '12px',
                                color: 'rgba(255,255,255,0.32)', marginTop: '4px',
                            }}>We'll respond within 24 hours with pricing and lead times.</p>
                        </div>
                        <button
                            onClick={onClose}
                            style={{
                                width: '32px', height: '32px', borderRadius: '10px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                                color: 'rgba(255,255,255,0.38)', cursor: 'pointer', flexShrink: 0,
                                transition: 'background 150ms, color 150ms',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = '#fff' }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(255,255,255,0.38)' }}
                        >
                            <X size={14} />
                        </button>
                    </div>

                    {/* ── Body ── */}
                    <div style={{ overflowY: 'auto', flex: 1, padding: '24px' }}>
                        {submitted ? (
                            <SuccessView onClose={onClose} />
                        ) : (
                            <QuoteForm
                                form={form} errors={errors} loading={loading}
                                set={set} onSubmit={handleSubmit}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

/* ── Success state ── */
function SuccessView({ onClose }) {
    return (
        <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', padding: '48px 0', textAlign: 'center',
        }}>
            <div style={{
                width: '64px', height: '64px', borderRadius: '16px',
                background: 'rgba(52,211,153,0.07)', border: '1px solid rgba(52,211,153,0.18)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px',
            }}>
                <CheckCircle2 size={28} color="#34d399" />
            </div>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '20px', fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>
                Request Submitted
            </h3>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.36)', maxWidth: '280px', lineHeight: 1.6, marginBottom: '32px' }}>
                Our sourcing team will review your request and get back to you within 24 hours.
            </p>
            <button
                onClick={onClose}
                style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '12px 24px', borderRadius: '999px',
                    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.11)',
                    color: 'rgba(255,255,255,0.78)', fontSize: '13px', fontWeight: 600,
                    fontFamily: 'DM Sans, sans-serif', cursor: 'pointer',
                    transition: 'background 150ms, border-color 150ms',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
            >
                Close
            </button>
        </div>
    )
}

/* ── Main form ── */
function QuoteForm({ form, errors, loading, set, onSubmit }) {
    return (
        <form onSubmit={onSubmit} noValidate>
            {/* Contact */}
            <SectionLabel>Contact Information</SectionLabel>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
                <Field label="Full Name" error={errors.name} required>
                    <Input value={form.name} onChange={v => set('name', v)} placeholder="Jane Smith" error={!!errors.name} />
                </Field>
                <Field label="Email Address" error={errors.email} required>
                    <Input type="email" value={form.email} onChange={v => set('email', v)} placeholder="jane@company.com" error={!!errors.email} />
                </Field>
                <Field label="Company" style={{ gridColumn: '1 / -1' }}>
                    <Input value={form.company} onChange={v => set('company', v)} placeholder="Acme Data Centers" />
                </Field>
            </div>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '0 0 20px' }} />

            {/* Product */}
            <SectionLabel>Product Details</SectionLabel>

            {/* Category pills */}
            <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.38)', marginBottom: '8px', fontFamily: 'DM Sans, sans-serif' }}>
                    Category <span style={{ color: 'rgba(52,211,153,0.6)' }}>*</span>
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {CATEGORIES.map(c => {
                        const Icon = c.icon
                        const active = form.category === c.id
                        return (
                            <button
                                key={c.id} type="button" onClick={() => set('category', c.id)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '6px',
                                    padding: '8px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: 500,
                                    fontFamily: 'DM Sans, sans-serif', cursor: 'pointer',
                                    background: active ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.02)',
                                    border: `1px solid ${active ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.07)'}`,
                                    color: active ? '#fff' : 'rgba(255,255,255,0.36)',
                                    transition: 'background 140ms, border-color 140ms, color 140ms',
                                }}
                            >
                                <Icon size={12} style={{ opacity: active ? 0.7 : 0.3 }} />
                                {c.label}
                            </button>
                        )
                    })}
                </div>
                {errors.category && <p style={{ fontSize: '10px', color: 'rgba(248,113,113,0.8)', marginTop: '6px', fontFamily: 'monospace' }}>{errors.category}</p>}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                <Field label="Brand / Manufacturer">
                    <Input value={form.brand} onChange={v => set('brand', v)} placeholder="e.g. Eaton, Schneider…" />
                </Field>
                <Field label="Part / Model Number" error={errors.part} required>
                    <Input value={form.part} onChange={v => set('part', v)} placeholder="e.g. 9PX3000IRT2U" error={!!errors.part} />
                </Field>
                <Field label="Quantity" error={errors.qty} required>
                    <Input value={form.qty} onChange={v => set('qty', v)} placeholder="e.g. 4 units" error={!!errors.qty} />
                </Field>
                <Field label="Delivery Region" error={errors.region} required>
                    <select
                        value={form.region}
                        onChange={e => set('region', e.target.value)}
                        style={{
                            width: '100%', padding: '10px 14px', borderRadius: '10px', fontSize: '13px',
                            outline: 'none', appearance: 'none', fontFamily: 'DM Sans, sans-serif',
                            background: 'rgba(255,255,255,0.04)',
                            border: `1px solid ${errors.region ? 'rgba(248,113,113,0.5)' : 'rgba(255,255,255,0.09)'}`,
                            color: form.region ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.28)',
                        }}
                    >
                        <option value="" disabled style={{ background: '#1a1a1a' }}>Select region…</option>
                        {REGIONS.map(r => <option key={r} value={r} style={{ background: '#1a1a1a', color: '#fff' }}>{r}</option>)}
                    </select>
                    {errors.region && <p style={{ fontSize: '10px', color: 'rgba(248,113,113,0.8)', marginTop: '6px', fontFamily: 'monospace' }}>{errors.region}</p>}
                </Field>
            </div>

            {/* Notes */}
            <div style={{ marginTop: '12px' }}>
                <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.38)', marginBottom: '6px', fontFamily: 'DM Sans, sans-serif' }}>
                    Additional Notes
                </label>
                <textarea
                    value={form.notes} onChange={e => set('notes', e.target.value)} rows={3}
                    placeholder="Timeline, special requirements, installation support…"
                    style={{
                        width: '100%', padding: '10px 14px', borderRadius: '10px', fontSize: '13px',
                        color: 'rgba(255,255,255,0.75)', outline: 'none', resize: 'none',
                        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)',
                        fontFamily: 'DM Sans, sans-serif', boxSizing: 'border-box',
                        transition: 'border-color 150ms',
                    }}
                    onFocus={e => { e.target.style.borderColor = 'rgba(255,255,255,0.2)' }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.09)' }}
                />
            </div>

            {/* Footer */}
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                flexWrap: 'wrap', gap: '16px', marginTop: '20px',
            }}>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.22)', maxWidth: '260px', lineHeight: 1.6, fontFamily: 'DM Sans, sans-serif', margin: 0 }}>
                    We'll verify availability and respond with pricing within 24 hours.
                </p>
                <button
                    type="submit" disabled={loading}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0,
                        padding: '12px 24px', borderRadius: '999px',
                        border: '1px solid rgba(255,255,255,0.15)',
                        background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.88)',
                        fontSize: '13px', fontWeight: 600, fontFamily: 'DM Sans, sans-serif',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        opacity: loading ? 0.55 : 1,
                        transition: 'background 150ms, border-color 150ms, opacity 150ms',
                    }}
                    onMouseEnter={e => { if (!loading) e.currentTarget.style.background = 'rgba(255,255,255,0.12)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }}
                >
                    {loading ? (
                        <>
                            <Spinner /> Sending…
                        </>
                    ) : (
                        <>Submit Request <ArrowRight size={13} /></>
                    )}
                </button>
            </div>
        </form>
    )
}

/* ── Tiny CSS spinner (no Framer, no RAF loop) ── */
function Spinner() {
    return (
        <span style={{
            display: 'inline-block', width: '13px', height: '13px',
            borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.25)',
            borderTopColor: 'rgba(255,255,255,0.8)',
            animation: 'rqm-spin 0.7s linear infinite',
        }}>
            <style>{`@keyframes rqm-spin { to { transform: rotate(360deg); } }`}</style>
        </span>
    )
}

function SectionLabel({ children }) {
    return (
        <p style={{
            fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.2)',
            textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: '12px',
        }}>{children}</p>
    )
}

function Field({ label, error, required, children, style = {} }: { label: string, error?: string, required?: boolean, children: React.ReactNode, style?: React.CSSProperties }) {
    return (
        <div style={style}>
            <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.38)', marginBottom: '6px', fontFamily: 'DM Sans, sans-serif' }}>
                {label} {required && <span style={{ color: 'rgba(52,211,153,0.6)' }}>*</span>}
            </label>
            {children}
            {error && <p style={{ fontSize: '10px', color: 'rgba(248,113,113,0.8)', marginTop: '6px', fontFamily: 'monospace' }}>{error}</p>}
        </div>
    )
}

function Input({ value, onChange, placeholder, type = 'text', error = false }: { value: string, onChange: (v: string) => void, placeholder?: string, type?: string, error?: boolean }) {
    return (
        <input
            type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
            style={{
                width: '100%', padding: '10px 14px', borderRadius: '10px', fontSize: '13px',
                color: 'rgba(255,255,255,0.75)', outline: 'none', boxSizing: 'border-box',
                background: 'rgba(255,255,255,0.04)', fontFamily: 'DM Sans, sans-serif',
                border: `1px solid ${error ? 'rgba(248,113,113,0.5)' : 'rgba(255,255,255,0.09)'}`,
                transition: 'border-color 150ms',
            }}
            onFocus={e => { e.target.style.borderColor = error ? 'rgba(248,113,113,0.7)' : 'rgba(255,255,255,0.2)' }}
            onBlur={e => { e.target.style.borderColor = error ? 'rgba(248,113,113,0.5)' : 'rgba(255,255,255,0.09)' }}
        />
    )
}