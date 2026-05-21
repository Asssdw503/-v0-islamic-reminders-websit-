import type { Metadata } from 'next'
import { Noto_Kufi_Arabic } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import './globals.css'

const notoKufi = Noto_Kufi_Arabic({ 
  subsets: ["arabic"],
  variable: '--font-noto-kufi',
})

export const metadata: Metadata = {
  title: 'أذكاري - أذكار المسلم',
  description: 'تطبيق أذكار المسلم - أذكار الصباح والمساء والطعام وما بعد الصلاة والتسابيح',
}

// ============================================
// إعدادات Google AdSense
// ============================================
// استبدل هذا المعرف بمعرف ناشرك من AdSense
const ADSENSE_PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || ""
const isAdsenseEnabled = ADSENSE_PUBLISHER_ID !== ""

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" className="bg-background">
      <head>
        {/* Google AdSense Script - يتم تحميله فقط إذا كان معرف الناشر موجوداً */}
        {isAdsenseEnabled && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`}
            crossOrigin="anonymous"
            strategy="lazyOnload"
          />
        )}
      </head>
      <body className={`${notoKufi.className} antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
