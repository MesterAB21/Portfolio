"use client";
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(SplitText, ScrollTrigger)

export function useHeadingReveal(delay = 0) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const split = SplitText.create(ref.current, {
      type: 'words',
      mask: 'words',
    })

    gsap.from(split.words, {
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
      xPercent: -80,
      opacity: 0,
      duration: 1.0,
      ease: 'power4.out',
      stagger: 0.1,
      delay,
    })

    return () => split.revert()
  }, [delay])

  return ref
}
