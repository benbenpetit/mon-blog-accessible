'use client'
import Lenis from '@studio-freight/lenis'
import Tempus from '@studio-freight/tempus'
import { usePathname, useSearchParams } from 'next/navigation'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react'

export const lenisCTX = createContext<Lenis | null>(null)

export const useLenis = () => useContext(lenisCTX)

export default function Lenify({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

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

  return <lenisCTX.Provider value={lenis}>{children}</lenisCTX.Provider>
}

export const RouteWatcher = () => {
  const lenis = useLenis()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true })
    document.fonts.ready.then(async () => {
      console.log('fonts ready')
      const gsap = (await import('gsap')).default
      const ScrollTrigger = (await import('gsap/ScrollTrigger')).default
      gsap.registerPlugin(ScrollTrigger)
      ScrollTrigger.refresh()
    })
  }, [pathname, searchParams])

  return null
}
