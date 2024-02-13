'use client'
import Lenis from '@studio-freight/lenis'
import Tempus from '@studio-freight/tempus'
import { usePathname, useSearchParams } from 'next/navigation'
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react'

export const lenisCTX = createContext<Lenis | null>(null)

export const useLenis = () => useContext(lenisCTX)

export default function Lenify({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useLayoutEffect(() => {
    const lenis = new Lenis()

    setLenis(lenis)

    const resize = setInterval(() => {
      lenis.resize()
    }, 150)
    function onFrame(time: number) {
      lenis.raf(time)
    }
    const unsubscribe = Tempus.add(onFrame)

    return () => {
      unsubscribe()
      clearInterval(resize)
      setLenis(null)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true })
  }, [pathname, searchParams])

  return <lenisCTX.Provider value={lenis}>{children}</lenisCTX.Provider>
}
