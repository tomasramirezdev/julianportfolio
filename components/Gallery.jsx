'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useScrollReveal } from './useScrollReveal'
import { useLang } from '@/lib/LanguageContext'

const INITIAL_COUNT = 9

const photos = [
  { id: 1,  src: '/images/Retrato1.jpg',  alt: 'La mirada que no miente',  altEn: 'The gaze that never lies',       category: 'Retrato',  number: '01', size: 'tall'   },
  { id: 2,  src: '/images/Retrato2.jpg',  alt: 'Sombra propia',            altEn: 'Own shadow',                     category: 'Retrato',  number: '02', size: 'tall'   },
  { id: 3,  src: '/images/Pareja1.jpg',   alt: 'El instante entre dos',    altEn: 'The moment between two',         category: 'Parejas',  number: '03', size: 'tall'   },
  { id: 4,  src: '/images/Pareja2.jpg',   alt: 'No hay edad para querer',  altEn: 'No age for love',                category: 'Parejas',  number: '04', size: 'tall'   },
  { id: 5,  src: '/images/Pareja3.jpg',   alt: 'El amor no avisa',         altEn: 'Love gives no warning',          category: 'Parejas',  number: '05', size: 'tall'   },
  { id: 6,  src: '/images/Pareja4.jpg',   alt: 'Tiempo detenido',          altEn: 'Frozen in time',                 category: 'Parejas',  number: '06', size: 'tall'   },
  { id: 7,  src: '/images/Evento.jpg',    alt: 'Cuando la noche empieza',  altEn: 'When the night begins',          category: 'Eventos',  number: '07', size: 'wide'   },
  { id: 8,  src: '/images/Evento2.jpg',   alt: 'El brindis eterno',        altEn: 'The eternal toast',              category: 'Eventos',  number: '08', size: 'wide'   },
  { id: 9,  src: '/images/Evento3.jpg',   alt: 'Desde pequeño',            altEn: 'Since childhood',                category: 'Eventos',  number: '09', size: 'wide'   },
  { id: 10, src: '/images/Evento4.jpg',   alt: 'Euforia colectiva',        altEn: 'Collective euphoria',            category: 'Eventos',  number: '10', size: 'wide'   },
  { id: 11, src: '/images/Evento5.jpg',   alt: 'El último baile',          altEn: 'The last dance',                 category: 'Eventos',  number: '11', size: 'wide'   },
  { id: 12, src: '/images/Grupo1.jpg',    alt: 'Los que siempre están',    altEn: 'The ones who are always there',  category: 'Grupos',   number: '12', size: 'wide'   },
  { id: 13, src: '/images/Grupo2.jpg',    alt: 'Una sola historia',        altEn: 'One single story',               category: 'Grupos',   number: '13', size: 'wide'   },
  { id: 14, src: '/images/Grupo3.jpg',    alt: 'Juntos en el horizonte',   altEn: 'Together on the horizon',        category: 'Grupos',   number: '14', size: 'wide'   },
  { id: 15, src: '/images/Marca1.jpg',    alt: 'La identidad en un frame', altEn: 'Identity in a frame',            category: 'Marca',    number: '15', size: 'square' },
  { id: 16, src: '/images/Marca2.jpg',    alt: 'Presencia',                altEn: 'Presence',                       category: 'Marca',    number: '16', size: 'square' },
]


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
      <div onClick={e => e.stopPropagation()} style={{ position: 'relative', maxHeight: '88vh', maxWidth: '88vw', width: '80vw', height: '88vh' }}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="88vw"
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
      <p style={{
        position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)',
        color: 'rgba(255,255,255,0.35)', fontSize: '0.55rem',
        letterSpacing: '0.25em', textTransform: 'uppercase',
        pointerEvents: 'none', whiteSpace: 'nowrap',
      }}>
        {photo.category} · {photo.number}
        {/* category shown in lightbox stays as internal key */}
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
  const { tr, lang } = useLang()
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [showAll, setShowAll] = useState(false)
  const titleRef = useScrollReveal()

  const categoriesTranslated = ['Todos', 'Retrato', 'Parejas', 'Eventos', 'Grupos', 'Marca']
  const categoryLabel = (cat) => cat === 'Todos' ? tr.gallery.all : (tr.gallery.categories[cat] || cat)

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
              <span style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#888' }}>{tr.gallery.label}</span>
            </div>
            <h2 ref={titleRef} className="fade-up" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: '#0A0A0A', lineHeight: 1, letterSpacing: '-0.03em' }}>
              {tr.gallery.title1}<br />{tr.gallery.title2}
            </h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', paddingBottom: '0.25rem' }}>
            {categoriesTranslated.map(cat => (
              <button key={cat} onClick={() => { setActiveCategory(cat); setShowAll(cat !== 'Todos') }} style={{
                fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                padding: '0.45rem 1.1rem', borderRadius: 999,
                border: `1px solid ${activeCategory === cat ? '#0A0A0A' : '#ccc'}`,
                backgroundColor: activeCategory === cat ? '#0A0A0A' : 'transparent',
                color: activeCategory === cat ? '#F4F4EF' : '#888',
                cursor: 'pointer', transition: 'all 0.25s ease',
                whiteSpace: 'nowrap', fontFamily: 'inherit', lineHeight: 1,
              }}>{categoryLabel(cat)}</button>
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
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover', transition: 'transform 0.7s ease' }}
                    className="group-hover:scale-105"
                    priority={i < 3}
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
                      {lang === 'es' ? photo.alt : photo.altEn}
                    </p>
                    <p style={{ fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#aaa', marginTop: '0.25rem' }}>
                      {categoryLabel(photo.category)}
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
              {tr.gallery.seeAll}
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
