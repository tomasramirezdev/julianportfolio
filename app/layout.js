import './globals.css'
import { LanguageProvider } from '@/lib/LanguageContext'

export const metadata = {
  title: 'Julián Ramírez — Fotografía',
  description: 'Portfolio fotográfico — cruceros, viajes, retratos y eventos',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
