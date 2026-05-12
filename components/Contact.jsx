'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import WavyBackground from './WavyBackground'
import { useLang } from '@/lib/LanguageContext'
import { useScrollReveal } from './useScrollReveal'

export default function Contact() {
  const { tr } = useLang()
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '', tipo: '' })
  const [sent, setSent] = useState(false)

  const titleRef = useScrollReveal()
  const formRef = useScrollReveal({ threshold: 0.1 })

  const tipos = tr.contact.tipos

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  const labelStyle = {
    display: 'block',
    fontSize: '0.6rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#888',
    marginBottom: '0.5rem',
  }

  const inputStyle = {
    display: 'block',
    width: '100%',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '1px solid #ccc',
    padding: '0.65rem 0',
    fontSize: '0.9rem',
    color: '#0A0A0A',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'border-color 0.3s',
  }

  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#F4F4EF',
        padding: 'clamp(4rem, 10vh, 8rem) clamp(1.5rem, 5vw, 5rem)',
      }}
    >
      <WavyBackground />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1400, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3.5rem' }}>
          <div style={{ width: 32, height: 1, backgroundColor: '#0A0A0A' }} />
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#888' }}>{tr.contact.label}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(3rem, 6vw, 6rem)' }}>

          {/* Lado izquierdo */}
          <div>
            <h2
              ref={titleRef}
              className="fade-up"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, color: '#0A0A0A', lineHeight: 1, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}
            >
              {tr.contact.title1}<br />
              <span style={{ WebkitTextStroke: '2px #0A0A0A', color: 'transparent' }}>
                {tr.contact.title2}
              </span>
            </h2>

            <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              {tr.contact.subtitle}
            </p>

            {/* Datos de contacto */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                { label: tr.contact.email,      value: 'ramirezjuliane@gmail.com', href: 'mailto:ramirezjuliane@gmail.com' },
                { label: tr.contact.instagram,  value: '@moustachedmeatbag',       href: 'https://www.instagram.com/moustachedmeatbag/' },
                { label: tr.contact.whatsapp,   value: '+55 24 99965-1299',        href: 'https://wa.me/5524999651299' },
                { label: tr.contact.adobeStock, value: tr.contact.adobeStockLabel, href: 'https://stock.adobe.com/es/contributor/211328140/julian?load_type=author&prev_url=detail' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.08)', padding: '1rem 0' }}>
                  <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#aaa' }}>{item.label}</span>
                  <a href={item.href} style={{ fontSize: '0.85rem', fontWeight: 500, color: '#0A0A0A', textDecoration: 'none', transition: 'opacity 0.3s' }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.4'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >{item.value}</a>
                </div>
              ))}
            </div>
          </div>

          {/* Lado derecho — formulario */}
          <div ref={formRef} className="fade-up">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-full flex flex-col items-center justify-center text-center py-20"
              >
                <div className="w-16 h-16 border-2 border-[#0A0A0A] rounded-full flex items-center justify-center mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="text-xl font-bold text-[#0A0A0A] mb-2">{tr.contact.sent}</p>
                <p className="text-sm text-[#888]">{tr.contact.sentSub}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                {/* Nombre */}
                <div>
                  <label style={labelStyle}>{tr.contact.nameLabel}</label>
                  <input
                    type="text"
                    placeholder={tr.contact.namePlaceholder}
                    required
                    style={inputStyle}
                    value={form.nombre}
                    onChange={e => setForm({ ...form, nombre: e.target.value })}
                  />
                </div>

                {/* Email */}
                <div>
                  <label style={labelStyle}>{tr.contact.emailLabel}</label>
                  <input
                    type="email"
                    placeholder={tr.contact.emailPlaceholder}
                    required
                    style={inputStyle}
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                  />
                </div>

                {/* Tipo de proyecto */}
                <div>
                  <label style={labelStyle}>{tr.contact.projectType}</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.75rem' }}>
                    {tipos.map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setForm({ ...form, tipo: t })}
                        style={{
                          fontSize: '0.65rem',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          padding: '0.5rem 1.1rem',
                          borderRadius: 999,
                          border: `1px solid ${form.tipo === t ? '#0A0A0A' : '#d0d0d0'}`,
                          backgroundColor: form.tipo === t ? '#0A0A0A' : 'transparent',
                          color: form.tipo === t ? '#F4F4EF' : '#666',
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                          transition: 'all 0.2s ease',
                          lineHeight: 1,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mensaje */}
                <div>
                  <label style={labelStyle}>{tr.contact.messageLabel}</label>
                  <textarea
                    placeholder={tr.contact.messagePlaceholder}
                    required
                    rows={5}
                    style={{ ...inputStyle, resize: 'none', paddingTop: '0.75rem' }}
                    value={form.mensaje}
                    onChange={e => setForm({ ...form, mensaje: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#0A0A0A',
                    color: '#F4F4EF',
                    fontSize: '0.65rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    padding: '0.9rem 2.5rem',
                    borderRadius: 999,
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    transition: 'background 0.3s',
                    alignSelf: 'flex-start',
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#333'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#0A0A0A'}
                >
                  {tr.contact.send}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
