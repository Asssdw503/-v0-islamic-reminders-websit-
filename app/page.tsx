"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { DhikrCard } from "@/components/dhikr-card"
import { AdPlaceholder } from "@/components/adsense-ad"
import { adhkarData } from "@/lib/adhkar-data"
import { cn } from "@/lib/utils"

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState(adhkarData[0].id)
  
  const currentCategory = adhkarData.find(cat => cat.id === selectedCategory)

  return (
    <div className="min-h-screen pb-8">
      <Header />
      
      <main className="px-3 py-4">
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

        {/* Ad Space - Top */}
        <section className="mb-6">
          <AdPlaceholder />
        </section>

        {/* Adhkar List */}
        {currentCategory && (
          <section className="space-y-4">
            {currentCategory.adhkar.map((dhikr, index) => (
              <>
                <DhikrCard key={dhikr.id} dhikr={dhikr} />
                {/* Show ad after every 5 adhkar */}
                {(index + 1) % 5 === 0 && index !== currentCategory.adhkar.length - 1 && (
                  <AdPlaceholder key={`ad-${index}`} className="my-4" />
                )}
              </>
            ))}
          </section>
        )}

        {/* Ad Space - Bottom */}
        <section className="mt-6">
          <AdPlaceholder />
        </section>
      </main>
    </div>
  )
}
