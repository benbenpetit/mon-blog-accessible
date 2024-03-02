import type { Metadata } from 'next'
import '@/styles/global.scss'
import LenisWrapper, { RouteWatcher } from '@/components/LenisWrapper'
import localFont from 'next/font/local'
import { Suspense } from 'react'

const neueMontreal = localFont({
  src: [
    {
      path: '../public/fonts/NeueMontreal-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/NeueMontreal-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Mon blog accessible',
  description: `Tout mon parcours d'apprentissage sur l'accessibilité web`,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={neueMontreal.className}>
        <LenisWrapper>
          <Suspense>
            <RouteWatcher />
          </Suspense>
          {children}
        </LenisWrapper>
      </body>
    </html>
  )
}
