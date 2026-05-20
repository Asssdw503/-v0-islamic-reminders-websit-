"use client"

import { useEffect, useRef } from "react"

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

// Placeholder component for development/preview
export function AdPlaceholder({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-accent/50 border-2 border-dashed border-border rounded-xl p-6 text-center ${className}`}>
      <div className="text-muted-foreground">
        <p className="text-sm font-medium mb-1">مساحة إعلانية</p>
        <p className="text-xs">Google AdSense</p>
      </div>
    </div>
  )
}
