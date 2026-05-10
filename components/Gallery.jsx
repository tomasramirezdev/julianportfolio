'use client'

import { useState, useEffect, useCallback } from 'react'
import { useScrollReveal } from './useScrollReveal'

const INITIAL_COUNT = 9

const photos = [
  // — visibles por defecto —
  { id: 1,  src: 'https://picsum.photos/seed/woman1/900/1200',    alt: 'Entre sombras',          category: 'Retrato',   number: '01', size: 'tall' },
  { id: 2,  src: 'https://picsum.photos/seed/sea10/1200/800',     alt: 'Horizonte sin límites',  category: 'Cruceros',  number: '02', size: 'wide' },
  { id: 3,  src: 'https://picsum.photos/seed/nature15/900/900',   alt: 'Verde profundo',         category: 'Editorial', number: '03', size: 'square' },
  { id: 4,  src: 'https://picsum.photos/seed/port2/1200/800',     alt: 'Llegando a puerto',      category: 'Cruceros',  number: '04', size: 'wide' },
  { id: 5,  src: 'https://picsum.photos/seed/man3/900/1200',      alt: 'Mirada al vacío',        category: 'Retrato',   number: '05', size: 'tall' },
  { id: 6,  src: 'https://picsum.photos/seed/party1/1200/800',    alt: 'Noche en cubierta',      category: 'Eventos',   number: '06', size: 'wide' },
  { id: 7,  src: 'https://picsum.photos/seed/ocean5/900/1200',    alt: 'Mar abierto',            category: 'Cruceros',  number: '07', size: 'tall' },
  { id: 8,  src: 'https://picsum.photos/seed/fashion2/900/900',   alt: 'Luz de tarde',           category: 'Editorial', number: '08', size: 'square' },
  { id: 9,  src: 'https://picsum.photos/seed/crowd1/1200/800',    alt: 'El grupo',               category: 'Eventos',   number: '09', size: 'wide' },
  // — extra Retrato —
  { id: 10, src: 'https://picsum.photos/seed/girl4/900/1200',     alt: 'Instante quieto',        category: 'Retrato',   number: '10', size: 'tall' },
  { id: 11, src: 'https://picsum.photos/seed/face7/900/1200',     alt: 'La luz lo dice todo',    category: 'Retrato',   number: '11', size: 'tall' },
  { id: 12, src: 'https://picsum.photos/seed/portrait9/900/900',  alt: 'Contra el viento',       category: 'Retrato',   number: '12', size: 'square' },
  // — extra Cruceros —
  { id: 13, src: 'https://picsum.photos/seed/dock1/1200/800',     alt: 'El muelle al amanecer',  category: 'Cruceros',  number: '13', size: 'wide' },
  { id: 14, src: 'https://picsum.photos/seed/island1/1200/800',   alt: 'Ilha Grande',            category: 'Cruceros',  number: '14', size: 'wide' },
  { id: 15, src: 'https://picsum.photos/seed/wave3/900/1200',     alt: 'La última ola',          category: 'Cruceros',  number: '15', size: 'tall' },
  // — extra Editorial —
  { id: 16, src: 'https://picsum.photos/seed/model5/900/1200',    alt: 'Sin título',             category: 'Editorial', number: '16', size: 'tall' },
  { id: 17, src: 'https://picsum.photos/seed/studio2/900/900',    alt: 'Estudio en blanco',      category: 'Editorial', number: '17', size: 'square' },
  { id: 18, src: 'https://picsum.photos/seed/light8/1200/800',    alt: 'Geometría de luz',       category: 'Editorial', number: '18', size: 'wide' },
  // — extra Eventos —
  { id: 19, src: 'https://picsum.photos/seed/dance1/900/900',     alt: 'En movimiento',          category: 'Eventos',   number: '19', size: 'square' },
  { id: 20, src: 'https://picsum.photos/seed/toast1/1200/800',    alt: 'El brindis',             category: 'Eventos',   number: '20', size: 'wide' },
  { id: 21, src: 'https://picsum.photos/seed/night2/900/1200',    alt: 'Noche larga',            category: 'Eventos',   number: '21', size: 'tall' },
]

const categories = ['Todos', 'Retrato', 'Editorial', 'Cruceros', 'Eventos']

/* ── Lightbox ── */
function Lightbox({ photo, onClose, onPrev, onNext }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose, onNext, onPrev])

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 1000, backgroundColor: 'rgba(0,0,0,0.93)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img
        src={photo.src}
        alt={photo.alt}
        onClick={e => e.stopPropagation()}
        style={{ maxHeight: '88vh', maxWidth: '88vw', objectFit: 'contain', display: 'block', userSelect: 'none' }}
      />
      <p style={{
        position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)',
        color: 'rgba(255,255,255,0.35)', fontSize: '0.55rem',
        letterSpacing: '0.25em', textTransform: 'uppercase',
        pointerEvents: 'none', whiteSpace: 'nowrap',
      }}>
        {photo.category} · {photo.number}
      </p>
      {[
        { label: '✕', pos: { top: '1.5rem', right: '1.5rem' }, action: onClose },
        { label: '←', pos: { left: '1.5rem', top: '50%', transform: 'translateY(-50%)' }, action: (e) => { e.stopPropagation(); onPrev() } },
        { label: '→', pos: { right: '1.5rem', top: '50%', transform: 'translateY(-50%)' }, action: (e) => { e.stopPropagation(); onNext() } },
      ].map(btn => (
        <button key={btn.label} onClick={btn.action} style={{
          position: 'absolute', ...btn.pos,
          background: 'none', border: '1px solid rgba(255,255,255,0.25)',
          color: '#fff', width: 42, height: 42, borderRadius: '50%',
          cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'border-color 0.2s',
        }}>{btn.label}</button>
      ))}
    </div>
  )
}

/* ── Gallery ── */
export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [showAll, setShowAll] = useState(false)
  const titleRef = useScrollReveal()

  const allFiltered = activeCategory === 'Todos' ? photos : photos.filter(p => p.category === activeCategory)
  // Mostrar solo las primeras INITIAL_COUNT si es "Todos" y no se pidió ver todo
  const filtered = (activeCategory === 'Todos' && !showAll) ? allFiltered.slice(0, INITIAL_COUNT) : allFiltered
  const hasMore = activeCategory === 'Todos' && !showAll && allFiltered.length > INITIAL_COUNT

  const closePhoto = useCallback(() => setLightboxIndex(null), [])
  const prevPhoto  = useCallback(() => setLightboxIndex(i => (i - 1 + filtered.length) % filtered.length), [filtered.length])
  const nextPhoto  = useCallback(() => setLightboxIndex(i => (i + 1) % filtered.length), [filtered.length])

  return (
    <section id="gallery" style={{ backgroundColor: '#F4F4EF', padding: 'clamp(4rem, 10vh, 8rem) clamp(1.5rem, 5vw, 5rem)' }}>
      <div style={{ maxWidth: 1500, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem', marginBottom: '3rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ width: 32, height: 1, backgroundColor: '#0A0A0A' }} />
              <span style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#888' }}>Trabajo</span>
            </div>
            <h2 ref={titleRef} className="fade-up" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: '#0A0A0A', lineHeight: 1, letterSpacing: '-0.03em' }}>
              Proyectos<br />seleccionados
            </h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', paddingBottom: '0.25rem' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => { setActiveCategory(cat); setShowAll(cat !== 'Todos') }} style={{
                fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                padding: '0.45rem 1.1rem', borderRadius: 999,
                border: `1px solid ${activeCategory === cat ? '#0A0A0A' : '#ccc'}`,
                backgroundColor: activeCategory === cat ? '#0A0A0A' : 'transparent',
                color: activeCategory === cat ? '#F4F4EF' : '#888',
                cursor: 'pointer', transition: 'all 0.25s ease',
                whiteSpace: 'nowrap', fontFamily: 'inherit', lineHeight: 1,
              }}>{cat}</button>
            ))}
          </div>
        </div>

        {/* Layout artístico — columnas masonry */}
        <div style={{ columns: '3 280px', columnGap: '1.2rem' }}>
          {filtered.map((photo, i) => {
            const aspectMap = { tall: '3/4', wide: '4/3', square: '1/1' }
            const aspect = aspectMap[photo.size] || '3/4'
            return (
              <div
                key={photo.id}
                onClick={() => setLightboxIndex(i)}
                style={{
                  breakInside: 'avoid',
                  marginBottom: '1.2rem',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'block',
                }}
                className="group"
              >
                <div style={{ position: 'relative', aspectRatio: aspect, overflow: 'hidden' }}>
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.7s ease' }}
                    className="group-hover:scale-105"
                  />
                  {/* Overlay hover */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)',
                    opacity: 0, transition: 'opacity 0.4s',
                  }} className="group-hover:opacity-100" />
                </div>

                {/* Título debajo, estilo editorial */}
                <div style={{ padding: '0.6rem 0.2rem 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
                  <div>
                    <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#0A0A0A', letterSpacing: '0.01em', lineHeight: 1.2 }}>
                      {photo.alt}
                    </p>
                    <p style={{ fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#aaa', marginTop: '0.25rem' }}>
                      {photo.category}
                    </p>
                  </div>
                  <span style={{ fontSize: '0.55rem', color: '#ccc', letterSpacing: '0.1em', flexShrink: 0, paddingTop: '0.1rem' }}>
                    {photo.number}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Ver todo — solo si hay más fotos ocultas */}
        {hasMore && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
            <button
              onClick={() => setShowAll(true)}
              style={{
                fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                padding: '1rem 2.5rem', border: '1px solid #0A0A0A', borderRadius: 999,
                backgroundColor: 'transparent', color: '#0A0A0A',
                cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#0A0A0A'; e.currentTarget.style.color = '#F4F4EF' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#0A0A0A' }}
            >
              Ver todo el trabajo
            </button>
          </div>
        )}
      </div>

      {lightboxIndex !== null && (
        <Lightbox photo={filtered[lightboxIndex]} onClose={closePhoto} onPrev={prevPhoto} onNext={nextPhoto} />
      )}
    </section>
  )
}
