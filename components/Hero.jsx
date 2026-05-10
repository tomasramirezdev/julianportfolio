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

  // Auto-reveal cada 4s, alternando dirección
  useEffect(() => {
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

  return (
    <section
      id="hero"
      style={{ position: 'relative', width: '100%', height: '100vh', minHeight: 640, backgroundColor: '#F4F4EF', overflow: 'hidden' }}
    >
      <WavyBackground />

      {/* sin cursor custom */}

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
          style={{
            position: 'relative',
            width: 'clamp(300px, 46vw, 680px)',
            height: '92vh',
            cursor: 'default',
            pointerEvents: 'all',
            flexShrink: 0,
          }}
        >
          {/* Julian — imagen base (PNG transparente) */}
          <img
            src="/images/julian.png"
            alt="Julian"
            style={{
              position: 'absolute', bottom: 0, left: '50%',
              transform: 'translateX(-50%)',
              height: '100%', width: 'auto', maxWidth: 'none',
              display: 'block', userSelect: 'none', zIndex: 1,
            }}
            draggable={false}
          />

          {/* Canvas WebGL — lente con liquid blob shader */}
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
        style={{ position: 'absolute', bottom: PAD, left: PAD, zIndex: 20, border: '1px solid rgba(10,10,10,0.12)', padding: '1rem 1.2rem', backgroundColor: 'rgba(244,244,239,0.6)', backdropFilter: 'blur(10px)', minWidth: 130 }}
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
        {[{ n: '2018', l: 'Desde' }, { n: '5+', l: 'Países' }].map(s => (
          <div key={s.l} style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 900, color: '#0A0A0A', lineHeight: 1 }}>{s.n}</p>
            <p style={{ fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888', marginTop: '0.2rem' }}>{s.l}</p>
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
