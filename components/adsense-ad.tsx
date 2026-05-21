"use client"

import { useEffect, useRef } from "react"
import { ExternalLink } from "lucide-react"

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

// ============================================
// إعدادات Google AdSense
// ============================================
// استبدل هذه القيم بمعلومات حسابك في AdSense
const ADSENSE_PUBLISHER_ID = "" // مثال: "ca-pub-1234567890123456"
const ADSENSE_BANNER_SLOT = "" // معرف وحدة الإعلان البانر
const ADSENSE_BOTTOM_SLOT = "" // معرف وحدة الإعلان السفلي

// تحقق إذا كان AdSense مُفعّل
const isAdsenseEnabled = ADSENSE_PUBLISHER_ID !== "" && ADSENSE_PUBLISHER_ID !== "ca-pub-XXXXXXXXXXXXXXXX"

interface AdsenseAdProps {
  adSlot: string
  adFormat?: "auto" | "fluid" | "rectangle" | "horizontal" | "vertical"
  fullWidthResponsive?: boolean
  className?: string
}

// مكون إعلان AdSense الحقيقي
export function AdsenseAd({ 
  adSlot, 
  adFormat = "auto", 
  fullWidthResponsive = true,
  className = ""
}: AdsenseAdProps) {
  const adRef = useRef<HTMLModElement>(null)
  const isAdLoaded = useRef(false)

  useEffect(() => {
    if (isAdLoaded.current || !isAdsenseEnabled) return
    
    try {
      if (typeof window !== "undefined" && adRef.current) {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
        isAdLoaded.current = true
      }
    } catch (error) {
      console.error("AdSense error:", error)
    }
  }, [])

  if (!isAdsenseEnabled) {
    return null
  }

  return (
    <div className={`ad-container overflow-hidden ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_PUBLISHER_ID}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive}
      />
    </div>
  )
}

// ============================================
// مكون البانر الإعلاني (أعلى الصفحة)
// ============================================
// يعرض إعلان AdSense حقيقي إذا كان مُفعّل، أو placeholder إذا لم يكن
export function BannerAd({ className = "" }: { className?: string }) {
  // إذا كان AdSense مُفعّل، اعرض الإعلان الحقيقي
  if (isAdsenseEnabled && ADSENSE_BANNER_SLOT) {
    return (
      <div className={`relative ${className}`}>
        <AdsenseAd 
          adSlot={ADSENSE_BANNER_SLOT} 
          adFormat="horizontal"
          className="rounded-xl overflow-hidden"
        />
        <span className="absolute bottom-1 left-2 text-[10px] text-muted-foreground/40">إعلان</span>
      </div>
    )
  }

  // إذا لم يكن مُفعّل، اعرض placeholder
  return (
    <div className={`relative overflow-hidden rounded-xl bg-gradient-to-l from-emerald-700 to-teal-800 p-4 ${className}`}>
      <div className="flex items-center justify-between gap-4">
        {/* محتوى الإعلان */}
        <div className="flex-1 text-right">
          <p className="text-white/90 text-sm font-semibold mb-1">سهمك اليوم... أثره ممتد</p>
          <p className="text-white/70 text-xs">مساحة إعلانية للمشاريع الخيرية والتطبيقات الإسلامية</p>
        </div>
        
        {/* زر الإجراء */}
        <button className="flex items-center gap-2 bg-white/95 hover:bg-white text-emerald-800 px-4 py-2 rounded-lg text-sm font-semibold transition-colors shrink-0">
          <span>زيارة الموقع</span>
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
      
      {/* علامة إعلان */}
      <span className="absolute bottom-1 left-2 text-[10px] text-white/40">إعلان</span>
    </div>
  )
}

// ============================================
// مكون الإعلان السفلي
// ============================================
export function BottomAd({ className = "" }: { className?: string }) {
  // إذا كان AdSense مُفعّل، اعرض الإعلان الحقيقي
  if (isAdsenseEnabled && ADSENSE_BOTTOM_SLOT) {
    return (
      <div className={`relative ${className}`}>
        <AdsenseAd 
          adSlot={ADSENSE_BOTTOM_SLOT} 
          adFormat="auto"
          className="rounded-lg overflow-hidden"
        />
        <span className="absolute bottom-1 left-2 text-[10px] text-muted-foreground/40">إعلان</span>
      </div>
    )
  }

  // إذا لم يكن مُفعّل، اعرض placeholder بسيط
  return (
    <div className={`bg-muted/30 rounded-lg p-4 text-center ${className}`}>
      <p className="text-xs text-muted-foreground/50">إعلان</p>
    </div>
  )
}

// للتوافق مع الكود القديم
export const BannerAdPlaceholder = BannerAd
export const AdPlaceholder = BottomAd
