'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useScrollReveal } from './useScrollReveal'
import WavyBackground from './WavyBackground'

export default function About() {
  const sectionRef = useRef(null)

  const titleRef  = useScrollReveal()
  const textRef   = useScrollReveal({ threshold: 0.2 })
  const statsRef  = useScrollReveal({ threshold: 0.2 })

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#F4F4EF',
        padding: 'clamp(5rem, 10vh, 9rem) clamp(1.5rem, 5vw, 5rem)',
      }}
    >
      <WavyBackground />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1400, margin: '0 auto' }}>

        {/* Label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '4rem' }}>
          <div style={{ width: 32, height: 1, backgroundColor: '#0A0A0A' }} />
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#888' }}>
            Sobre mí
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'clamp(3rem, 6vw, 6rem)', alignItems: 'center' }}>

          {/* Texto */}
          <div>
            <h2
              ref={titleRef}
              className="fade-up"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', fontWeight: 900, color: '#0A0A0A', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '2rem' }}
            >
              El mar.<br />
              <span style={{ WebkitTextStroke: '1px #0A0A0A', color: 'transparent' }}>
                La luz. El momento.
              </span>
            </h2>

            <div ref={textRef} className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <p style={{ color: '#888', fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)', lineHeight: 1.75 }}>
                Soy Julian, fotógrafo especializado en cruceros y viajes. Recorro el mundo
                capturando lo que sucede entre destinos — la gente, los puertos, el horizonte
                y todo lo que el itinerario no te dice.
              </p>
              <p style={{ color: '#555', fontSize: 'clamp(0.8rem, 1.3vw, 0.95rem)', lineHeight: 1.75 }}>
                Trabajo a bordo y en tierra, en grupos grandes o sesiones íntimas. Retratos,
                eventos sociales, paisajes marítimos. Cada disparo es una historia que
                llevás a casa.
              </p>
            </div>

            {/* Stats */}
            <div
              ref={statsRef}
              className="fade-up"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1.5rem',
                marginTop: '3rem',
                paddingTop: '2.5rem',
                borderTop: '1px solid rgba(0,0,0,0.1)',
              }}
            >
              {[
                { number: '2018', label: 'Desde' },
                { number: '5+',   label: 'Países' },
                { number: '∞',    label: 'Historias' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 900, color: '#0A0A0A', lineHeight: 1 }}>
                    {stat.number}
                  </p>
                  <p style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#555', marginTop: '0.4rem' }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Imagen — base tocando el fondo de la sección */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', marginBottom: 'calc(-1 * clamp(5rem, 10vh, 9rem) - 1.5rem)' }}>
            <motion.img
              src="/images/about.png"
              alt="Julian fotografiando"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              draggable={false}
              style={{
                maxHeight: '85vh',
                width: 'auto',
                display: 'block',
                userSelect: 'none',
              }}
            />
          </div>

        </div>
      </div>
    </section>
  )
}
