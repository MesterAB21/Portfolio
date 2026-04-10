"use client";
import { useEffect } from 'react'
import { initSmoothScroll } from '@/lib/smooth-scroll'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // 1. Force scroll to top on refresh to prevent GSAP offset issues
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)

    const lenis = initSmoothScroll()

    // 2. Refresh ScrollTrigger once everything is likely rendered
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 500)

    return () => {
      lenis.destroy()
      clearTimeout(timer)
    }
  }, [])

  return <>{children}</>
}
