import type { Metadata } from 'next'
import { Work_Sans } from 'next/font/google'
import './styles/global.scss'

const workSans = Work_Sans({ subsets: ['latin'] })

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
      <body className={workSans.className}>{children}</body>
    </html>
  )
}
