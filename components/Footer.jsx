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
        <div className="flex items-center gap-8">
          {['Instagram', 'Behance', 'LinkedIn'].map((link) => (
            <a
              key={link}
              href="#"
              className="text-[10px] tracking-[0.15em] uppercase text-[#444] hover:text-[#F4F4EF] transition-colors duration-300"
            >
              {link}
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
