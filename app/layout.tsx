import type { Metadata } from 'next'
import './styles/global.scss'
import LenisWrapper from '@/app/components/LenisWrapper'
import localFont from 'next/font/local'

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
        <LenisWrapper>{children}</LenisWrapper>
      </body>
    </html>
  )
}
