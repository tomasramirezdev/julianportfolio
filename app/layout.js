import './globals.css'

export const metadata = {
  title: 'Juli — Fotografía',
  description: 'Portfolio fotográfico — capturando momentos que perduran',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  )
}
