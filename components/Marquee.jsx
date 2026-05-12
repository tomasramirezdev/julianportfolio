'use client'

import { useLang } from '@/lib/LanguageContext'

const wordsEs = ['Retrato', '·', 'Parejas', '·', 'Eventos', '·', 'Grupos', '·', 'Marca personal', '·', 'Fotografía de viaje', '·', 'Cruceros', '·', 'Bodas', '·']
const wordsEn = ['Portrait', '·', 'Couples', '·', 'Events', '·', 'Groups', '·', 'Personal brand', '·', 'Travel photography', '·', 'Cruises', '·', 'Weddings', '·']

export default function Marquee() {
  const { lang } = useLang()
  const words = lang === 'es' ? wordsEs : wordsEn
  const items = [...words, ...words, ...words]

  return (
    <div style={{ overflow: 'hidden', backgroundColor: '#0A0A0A', borderTop: '1px solid #1E1E1E', borderBottom: '1px solid #1E1E1E', padding: '1.4rem 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', width: 'max-content', animation: 'marquee-scroll 28s linear infinite' }}>
        {items.map((word, i) => (
          <span key={i} style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', whiteSpace: 'nowrap', color: word === '·' ? '#444' : '#F4F4EF', flexShrink: 0 }}>
            {word}
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }`}</style>
    </div>
  )
}
