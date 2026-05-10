'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import WavyBackground from './WavyBackground'

// WebGL importado solo en cliente
const LensReveal = dynamic(() => import('./LensReveal'), { ssr: false })

const PAD = 'clamp(1.5rem, 4vw, 4rem)'

export default function Hero() {
  const containerRef  = useRef(null)
  const lensRevealRef = useRef(null)
  const cursorRef     = useRef(null)
  const passRef       = useRef(0)
  const [isHovering, setIsHovering] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Auto-reveal cada 4s solo en desktop (no en touch)
  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches
    if (isTouchDevice) return
    const id = setInterval(() => {
      if (!isHovering) {
        lensRevealRef.current?.autoReveal(passRef.current)
        passRef.current += 1
      }
    }, 4200)
    return () => clearInterval(id)
  }, [isHovering])

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const nx = (e.clientX - rect.left) / rect.width
    const ny = (e.clientY - rect.top)  / rect.height
    lensRevealRef.current?.setMouse(nx, ny)

    // Cursor custom
    if (cursorRef.current) {
      cursorRef.current.style.left = `${e.clientX}px`
      cursorRef.current.style.top  = `${e.clientY}px`
    }
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
    lensRevealRef.current?.enter()
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    lensRevealRef.current?.leave()
  }

  if (isMobile) return (
    <section id="hero" style={{ position: 'relative', width: '100%', backgroundColor: '#F4F4EF', overflow: 'hidden' }}>
      <WavyBackground />

      {/* Nombre */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ position: 'relative', zIndex: 10, padding: '7rem 1.5rem 1.5rem' }}
      >
        <p style={{ fontSize: 'clamp(3.5rem, 18vw, 6rem)', fontWeight: 900, letterSpacing: '-0.04em', color: '#0A0A0A', lineHeight: 0.9, textTransform: 'uppercase', margin: 0 }}>
          JULIÁN
        </p>
        <p style={{ fontSize: '0.7rem', fontWeight: 300, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#777', marginTop: '0.6rem' }}>
          Fotógrafo
        </p>
      </motion.div>

      {/* Foto centrada */}
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        style={{ position: 'relative', zIndex: 10 }}
      >
        <img
          src="/images/julian.png"
          alt="Julián"
          style={{ width: '100%', height: 'auto', display: 'block', userSelect: 'none', objectFit: 'contain' }}
          draggable={false}
        />
        <LensReveal ref={lensRevealRef} containerRef={containerRef} />
      </motion.div>

      {/* Info row — bottom */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: '1.5rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}
      >
        <div>
          <p style={{ fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#aaa', marginBottom: '0.3rem' }}>Now in</p>
          <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0A0A0A' }}>Ilha Grande · RJ</p>
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {[{ n: '2018', l: 'Desde' }, { n: '+15', l: 'Países' }].map(s => (
            <div key={s.l} style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0A0A0A', lineHeight: 1 }}>{s.n}</p>
              <p style={{ fontSize: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#aaa' }}>{s.l}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )

  return (
    <section
      id="hero"
      style={{ position: 'relative', width: '100%', height: '100vh', minHeight: 640, backgroundColor: '#F4F4EF', overflow: 'hidden' }}
    >
      <WavyBackground />

      {/* Foto centrada + WebGL reveal */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', zIndex: 10, pointerEvents: 'none' }}>
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ position: 'relative', width: 'clamp(300px, 46vw, 680px)', height: '92vh', cursor: 'default', pointerEvents: 'all', flexShrink: 0 }}
        >
          <img
            src="/images/julian.png"
            alt="Julian"
            style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', height: '100%', width: 'auto', maxWidth: 'none', display: 'block', userSelect: 'none', zIndex: 1 }}
            draggable={false}
          />
          <LensReveal ref={lensRevealRef} containerRef={containerRef} />
        </motion.div>
      </div>

      {/* Nombre — top left */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{ position: 'absolute', top: `calc(${PAD} + 4.5rem)`, left: PAD, zIndex: 20 }}
      >
        <p style={{ fontSize: 'clamp(3.5rem, 8vw, 9rem)', fontWeight: 900, letterSpacing: '-0.04em', color: '#0A0A0A', lineHeight: 0.9, textTransform: 'uppercase', margin: 0 }}>
          JULIÁN
        </p>
        <p style={{ fontSize: 'clamp(0.6rem, 1.2vw, 0.85rem)', fontWeight: 300, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#777', marginTop: '0.6rem' }}>
          Fotógrafo
        </p>
      </motion.div>

      {/* Card — bottom left */}
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        style={{ position: 'absolute', bottom: PAD, left: PAD, zIndex: 20, border: '1px solid rgba(10,10,10,0.18)', padding: '1rem 1.2rem', backgroundColor: 'rgba(244,244,239,0.88)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', minWidth: 130 }}
      >
        <p style={{ fontSize: '0.5rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#888', marginBottom: '0.5rem' }}>Now in</p>
        <div style={{ width: 40, height: 1, backgroundColor: '#ccc', marginBottom: '0.6rem' }} />
        <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#0A0A0A', letterSpacing: '0.04em' }}>ILHA GRANDE</p>
        <p style={{ fontSize: '0.6rem', color: '#777', marginTop: '0.25rem' }}>RJ · Brasil</p>
        <div style={{ width: 40, height: 1, backgroundColor: '#ccc', margin: '0.6rem 0' }} />
        <p style={{ fontSize: '0.5rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#999', lineHeight: 1.6 }}>Capturando momentos</p>
      </motion.div>

      {/* Stats — bottom right */}
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        style={{ position: 'absolute', bottom: PAD, right: PAD, zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1.2rem' }}
      >
        {[{ n: '2018', l: 'Desde' }, { n: '+15', l: 'Países' }].map(s => (
          <div key={s.l} style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 900, color: '#0A0A0A', lineHeight: 1, textShadow: '0 1px 8px rgba(244,244,239,0.8)' }}>{s.n}</p>
            <p style={{ fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#0A0A0A', marginTop: '0.2rem', opacity: 0.55 }}>{s.l}</p>
          </div>
        ))}
      </motion.div>

      {/* Scroll */}
      <div style={{ position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
        <p style={{ fontSize: '0.5rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#aaa' }}>Scroll</p>
        <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, #aaa, transparent)' }} />
      </div>
    </section>
  )
}
