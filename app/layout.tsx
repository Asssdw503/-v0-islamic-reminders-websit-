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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" className="bg-background">
      <head>
        {/* Google AdSense Script - استبدل ca-pub-XXXXXXXXXXXXXXXX بمعرف حسابك */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </head>
      <body className={`${notoKufi.className} antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
