'use client'

import { useTheme } from 'next-themes'
import { useEffect } from 'react'

export function ThemeFavicon() {
  const { theme } = useTheme()

  useEffect(() => {
    const updateFavicon = () => {
      const link = document.querySelector('link[rel="icon"]') as HTMLLinkElement
      if (!link) {
        const newLink = document.createElement('link')
        newLink.rel = 'icon'
        newLink.href = theme === 'dark' ? '/assets/dark_fav_icon.png' : '/assets/white_fav_icon.png'
        document.head.appendChild(newLink)
      } else {
        link.href = theme === 'dark' ? '/assets/dark_fav_icon.png' : '/assets/white_fav_icon.png'
      }
    }

    updateFavicon()
  }, [theme])

  return null
}