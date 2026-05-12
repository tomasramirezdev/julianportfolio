'use client'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        backgroundColor: '#0A0A0A',
        borderTop: '1px solid #1E1E1E',
        padding: `2.5rem clamp(1.5rem, 5vw, 5rem)`,
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <p className="text-[10px] tracking-[0.2em] uppercase text-[#444]">
          © {year} Juli · Fotografía
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {[
            { label: 'Instagram',   href: 'https://www.instagram.com/moustachedmeatbag/' },
            { label: 'Adobe Stock', href: 'https://stock.adobe.com/es/contributor/211328140/julian?load_type=author&prev_url=detail' },
            { label: 'Email',       href: 'mailto:ramirezjuliane@gmail.com' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#444', textDecoration: 'none', transition: 'color 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#F4F4EF'}
              onMouseLeave={e => e.currentTarget.style.color = '#444'}
            >
              {link.label}
            </a>
          ))}
        </div>
        <p className="text-[10px] tracking-[0.1em] text-[#333]">
          Ilha Grande, Angra dos Reis
        </p>
      </div>
    </footer>
  )
}
