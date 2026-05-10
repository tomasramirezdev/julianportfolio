'use client'

const words = [
  'Retrato', '·',
  'Editorial', '·',
  'Marca personal', '·',
  'Paisaje', '·',
  'Arquitectura', '·',
  'Eventos sociales', '·',
  'Grupos', '·',
  'Cruceros', '·',
  'Fotografía de viaje', '·',
  'Bodas', '·',
]

export default function Marquee() {
  // Triplicar para que el loop sea imperceptible
  const items = [...words, ...words, ...words]

  return (
    <div
      style={{
        overflow: 'hidden',
        backgroundColor: '#0A0A0A',
        borderTop: '1px solid #1E1E1E',
        borderBottom: '1px solid #1E1E1E',
        padding: '1.4rem 0',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          width: 'max-content',
          /* translateX al -33.33% = exactamente 1 set → loop perfecto */
          animation: 'marquee-scroll 28s linear infinite',
        }}
      >
        {items.map((word, i) => (
          <span
            key={i}
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              color: word === '·' ? '#444' : '#F4F4EF',
              flexShrink: 0,
            }}
          >
            {word}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  )
}
