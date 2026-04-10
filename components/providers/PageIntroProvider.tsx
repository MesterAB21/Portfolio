"use client";
import { useEffect } from 'react'
import { gsap } from 'gsap'

export default function PageIntroProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    gsap.to('#page-intro', {
      opacity: 0,
      duration: 0.9,
      delay: 0.15,
      ease: 'power2.out',
      onComplete: () => {
        const el = document.getElementById('page-intro')
        if (el) el.remove()
      },
    })
  }, [])

  return <>{children}</>
}
