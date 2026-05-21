"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { DhikrCard } from "@/components/dhikr-card"
import { AdPlaceholder, BannerAdPlaceholder } from "@/components/adsense-ad"
import { adhkarData } from "@/lib/adhkar-data"
import { cn } from "@/lib/utils"

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState(adhkarData[0].id)
  
  const currentCategory = adhkarData.find(cat => cat.id === selectedCategory)

  return (
    <div className="min-h-screen pb-8">
      <Header />
      
      <main className="px-3 py-4">
        {/* Banner Ad - Top */}
        <section className="mb-6">
          <BannerAdPlaceholder />
        </section>

        {/* Categories Grid */}
        <section className="mb-6">
          <div className="flex flex-wrap gap-2">
            {adhkarData.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "rounded-lg px-4 py-2.5 text-sm font-semibold transition-all active:scale-95",
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent text-accent-foreground hover:bg-accent/80"
                )}
              >
                {category.title}
              </button>
            ))}
          </div>
        </section>

        {/* Adhkar List */}
        {currentCategory && (
          <section className="space-y-4">
            {currentCategory.adhkar.map((dhikr) => (
              <DhikrCard key={dhikr.id} dhikr={dhikr} />
            ))}
          </section>
        )}

        {/* Ad Space - Bottom only, subtle and non-intrusive */}
        <section className="mt-8 pt-6 border-t border-border/50">
          <p className="text-xs text-muted-foreground/60 text-center mb-3">دعم الموقع</p>
          <AdPlaceholder />
        </section>
      </main>
    </div>
  )
}
