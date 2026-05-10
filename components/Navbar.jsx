'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const menuLinks = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Sobre mí', href: '#about' },
  { label: 'Trabajo', href: '#gallery' },
  { label: 'Contacto', href: '#contact' },
]

const NAV_PADDING = 'clamp(1.5rem, 5vw, 5rem)'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLink = (href) => {
    setMenuOpen(false)
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }, 400)
  }

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: `1.25rem ${NAV_PADDING}`,
          backgroundColor: scrolled ? 'rgba(244,244,239,0.55)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'blur(0px)',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'blur(0px)',
          borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.25)' : 'transparent'}`,
          boxShadow: scrolled ? '0 1px 32px rgba(0,0,0,0.06)' : 'none',
          transition: 'background-color 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleLink('#hero') }}
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
        >
          <img
            src="/images/logoJ.svg"
            alt="Julián Fotógrafo"
            style={{ height: 44, width: 'auto', display: 'block' }}
          />
        </a>

        {/* Botones derecha */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleLink('#contact') }}
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#0A0A0A',
              color: '#F4F4EF',
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              padding: '0.6rem 1.25rem',
              borderRadius: '999px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'background 0.3s',
            }}
          >
            Contacto
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            style={{
              width: 40,
              height: 40,
              border: '1px solid #0A0A0A',
              borderRadius: '999px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, width: 16 }}>
              <span style={{
                display: 'block', height: 1, backgroundColor: '#0A0A0A',
                transform: menuOpen ? 'rotate(45deg) translate(3px, 4px)' : 'none',
                transition: 'transform 0.3s',
              }} />
              <span style={{
                display: 'block', height: 1, backgroundColor: '#0A0A0A',
                opacity: menuOpen ? 0 : 1, transition: 'opacity 0.3s',
              }} />
              <span style={{
                display: 'block', height: 1, backgroundColor: '#0A0A0A',
                transform: menuOpen ? 'rotate(-45deg) translate(3px, -4px)' : 'none',
                transition: 'transform 0.3s',
              }} />
            </div>
          </button>
        </div>
      </nav>

      {/* Menú fullscreen */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 40,
              backgroundColor: '#F4F4EF',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: `2rem ${NAV_PADDING}`,
            }}
          >
            {menuLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 + i * 0.07 }}
                style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}
              >
                <button
                  onClick={() => handleLink(link.href)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '1.5rem 0',
                    fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
                    fontWeight: 900,
                    letterSpacing: '-0.02em',
                    color: '#0A0A0A',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    lineHeight: 1,
                  }}
                >
                  {link.label}
                </button>
              </motion.div>
            ))}
            <p style={{
              marginTop: '3rem',
              fontSize: '0.65rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#999',
            }}>
              Juli · Fotografía · Ilha Grande, Angra dos Reis
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
