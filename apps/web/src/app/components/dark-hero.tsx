'use client'

import React, { useEffect, useRef } from 'react'
import Hls from 'hls.js'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { Navbar } from './navbar'

export function DarkHero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoSrc = 'https://stream.mux.com/T6oQJQ02cQ6N01TR6iHwZkKFkbepS34dkkIc9iukgy400g.m3u8'
  const posterSrc =
    'https://images.unsplash.com/photo-1647356191320-d7a1f80ca777?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRhcmslMjB0ZWNobm9sb2d5JTIwbmV1cmFsJTIwbmV0d29ya3xlbnwxfHx8fDE3Njg5NzIyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080'

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(videoSrc)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((e) => console.log('Auto-play prevented:', e))
      })
      return () => {
        hls.destroy()
      }
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoSrc
      video.addEventListener('loadedmetadata', () => {
        video.play().catch((e) => console.log('Auto-play prevented:', e))
      })
    }
  }, [])

  return (
    <div className="relative w-full min-h-screen bg-[#000000] text-white overflow-hidden flex flex-col justify-center items-center">
      {/* Navbar Component */}
      <Navbar />

      {/* Background Video Layer */}
      <video
        ref={videoRef}
        poster={posterSrc}
        muted
        loop
        playsInline
        autoPlay
        className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none -z-20"
      />

      {/* Video Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] pointer-events-none -z-10" />

      {/* Decorative Gradients */}
      <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none -z-10" />
      <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none -z-10" />

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center text-center mt-20 space-y-12">
        {/* Pre-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-['Instrument_Serif',serif] text-3xl sm:text-5xl lg:text-[48px] leading-[1.1] text-white"
        >
          Design at the speed of thought
        </motion.p>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-['Instrument_Sans',sans-serif] font-semibold text-6xl sm:text-8xl lg:text-[136px] leading-[0.9] tracking-tighter bg-gradient-to-b from-white via-white to-[#b4c0ff] bg-clip-text text-transparent"
        >
          Build Faster
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="font-['Instrument_Sans',sans-serif] text-lg sm:text-[20px] leading-[1.65] text-white max-w-xl mx-auto"
        >
          Create fully functional, SEO-optimized websites in seconds with our advanced AI engine.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-6 items-center justify-center pt-2"
        >
          {/* Primary Button */}
          <button
            type="button"
            className="flex items-center pl-6 pr-2 py-2 rounded-full bg-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 group"
          >
            <span className="font-['Instrument_Sans',sans-serif] font-medium text-lg text-[#0a0400]">
              Start Building Free
            </span>
            <div className="w-10 h-10 rounded-full bg-[#3054ff] group-hover:bg-[#2040e0] flex items-center justify-center transition-colors ml-4">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
          </button>

          {/* Secondary Button */}
          <button
            type="button"
            className="flex items-center px-4 py-2 rounded-lg text-white/70 hover:text-white backdrop-blur-sm hover:bg-white/5 transition-all group font-['Instrument_Sans',sans-serif] text-base"
          >
            <span>See Examples</span>
            <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default DarkHero
