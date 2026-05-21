import { useEffect } from 'react'

export default function useScopedReveal() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll('[data-scoped-reveal]'))
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.documentElement.classList.add('scoped-reveal-enabled')

    const showVisible = () => {
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight
      items.forEach((item) => {
        const rect = item.getBoundingClientRect()
        if (rect.top < viewportHeight && rect.bottom > 0) {
          item.classList.add('is-visible')
        }
      })
    }

    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.16 },
    )

    items.forEach((item) => observer.observe(item))

    let secondFrameId
    const frameId = requestAnimationFrame(() => {
      secondFrameId = requestAnimationFrame(showVisible)
    })
    const fallbackId = window.setTimeout(showVisible, 1400)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frameId)
      if (secondFrameId) cancelAnimationFrame(secondFrameId)
      window.clearTimeout(fallbackId)
      document.documentElement.classList.remove('scoped-reveal-enabled')
    }
  }, [])
}
