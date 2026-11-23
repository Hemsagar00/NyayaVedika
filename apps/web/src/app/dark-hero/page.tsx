import React from 'react'
import { DarkHero } from '../components/dark-hero'

export const metadata = {
  title: 'Dark Mode Hero Section | AI Website Builder',
  description: 'Design at the speed of thought. Build Faster with our advanced AI engine.'
}

export default function DarkHeroPage() {
  return (
    <main className="w-full min-h-screen bg-black">
      <DarkHero />
    </main>
  )
}
