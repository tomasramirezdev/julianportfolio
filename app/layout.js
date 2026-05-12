import './globals.css'
import { LanguageProvider } from '@/lib/LanguageContext'

export const metadata = {
  title: 'Julián Ramírez — Fotógrafo de Cruceros y Viajes',
  description: 'Fotógrafo especializado en cruceros, viajes y eventos sociales. Retratos, parejas y grupos en Ilha Grande, Brasil y +15 países. Contacto: ramirezjuliane@gmail.com',
  keywords: [
    'fotógrafo cruceros', 'fotografía de viaje', 'fotógrafo Brasil',
    'fotógrafo Ilha Grande', 'fotografía eventos', 'retratos profesionales',
    'fotografía parejas', 'cruise photographer', 'travel photographer Brazil',
    'Julián Ramírez fotógrafo'
  ],
  authors: [{ name: 'Julián Ramírez' }],
  creator: 'Julián Ramírez',
  metadataBase: new URL('https://julianramirezfoto.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://julianramirezfoto.com',
    siteName: 'Julián Ramírez Fotografía',
    title: 'Julián Ramírez — Fotógrafo de Cruceros y Viajes',
    description: 'Fotógrafo especializado en cruceros, viajes y eventos sociales en +15 países.',
    images: [
      {
        url: '/images/julian.png',
        width: 1200,
        height: 630,
        alt: 'Julián Ramírez — Fotógrafo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Julián Ramírez — Fotógrafo de Cruceros y Viajes',
    description: 'Fotógrafo especializado en cruceros, viajes y eventos sociales en +15 países.',
    images: ['/images/julian.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="h-full">
      <head>
        <link rel="icon" href="/images/logoJ.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-full">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
