"use client"

import { useEffect, useRef } from "react"
import { ExternalLink } from "lucide-react"

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

interface AdsenseAdProps {
  adSlot: string
  adFormat?: "auto" | "fluid" | "rectangle" | "horizontal" | "vertical"
  fullWidthResponsive?: boolean
  className?: string
}

export function AdsenseAd({ 
  adSlot, 
  adFormat = "auto", 
  fullWidthResponsive = true,
  className = ""
}: AdsenseAdProps) {
  const adRef = useRef<HTMLModElement>(null)
  const isAdLoaded = useRef(false)

  useEffect(() => {
    if (isAdLoaded.current) return
    
    try {
      if (typeof window !== "undefined" && adRef.current) {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
        isAdLoaded.current = true
      }
    } catch (error) {
      console.error("AdSense error:", error)
    }
  }, [])

  return (
    <div className={`ad-container overflow-hidden ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive}
      />
    </div>
  )
}

// Banner ad placeholder - Islamic style like the reference image
export function BannerAdPlaceholder({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-gradient-to-l from-emerald-700 to-teal-800 p-4 ${className}`}>
      <div className="flex items-center justify-between gap-4">
        {/* Ad Content */}
        <div className="flex-1 text-right">
          <p className="text-white/90 text-sm font-semibold mb-1">سهمك اليوم... أثره ممتد</p>
          <p className="text-white/70 text-xs">مساحة إعلانية للمشاريع الخيرية والتطبيقات الإسلامية</p>
        </div>
        
        {/* CTA Button */}
        <button className="flex items-center gap-2 bg-white/95 hover:bg-white text-emerald-800 px-4 py-2 rounded-lg text-sm font-semibold transition-colors shrink-0">
          <span>زيارة الموقع</span>
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
      
      {/* Decorative pattern */}
      <div className="absolute top-0 left-0 w-24 h-24 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-white">
          <pattern id="islamic-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="2" />
          </pattern>
          <rect width="100" height="100" fill="url(#islamic-pattern)" />
        </svg>
      </div>
      
      {/* Ad label */}
      <span className="absolute bottom-1 left-2 text-[10px] text-white/40">إعلان</span>
    </div>
  )
}

// Placeholder component for development/preview - subtle design
export function AdPlaceholder({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-muted/30 rounded-lg p-4 text-center ${className}`}>
      <p className="text-xs text-muted-foreground/50">إعلان</p>
    </div>
  )
}
