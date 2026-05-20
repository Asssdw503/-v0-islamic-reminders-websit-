"use client"

import { useState } from "react"
import { IconRefresh, IconCheck } from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import type { Dhikr } from "@/lib/adhkar-data"

interface DhikrCardProps {
  dhikr: Dhikr
  onComplete?: () => void
}

export function DhikrCard({ dhikr, onComplete }: DhikrCardProps) {
  const [currentCount, setCurrentCount] = useState(0)
  const isComplete = currentCount >= dhikr.count

  const increment = () => {
    if (currentCount < dhikr.count) {
      const newCount = currentCount + 1
      setCurrentCount(newCount)
      if (newCount === dhikr.count && onComplete) {
        onComplete()
      }
    }
  }

  const reset = () => {
    setCurrentCount(0)
  }

  return (
    <div className="flex flex-col lg:flex-row-reverse lg:gap-4">
      {/* Dhikr content */}
      <div
        className={cn(
          "rounded-t-2xl lg:rounded-2xl lg:rounded-r-none border border-b-0 lg:border-b lg:border-r-0 border-border bg-card p-5 transition-all duration-300 flex-1",
          isComplete && "border-primary/50 bg-primary/5"
        )}
      >
        {/* Completion indicator */}
        {isComplete && (
          <div className="mb-3 flex items-center gap-2 text-primary">
            <IconCheck size={20} />
            <span className="text-sm font-medium">تم</span>
          </div>
        )}

        {/* Dhikr text */}
        <p className="text-lg leading-loose text-card-foreground">{dhikr.text}</p>

        {/* Benefit */}
        {dhikr.benefit && (
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            {dhikr.benefit}
          </p>
        )}

        {/* Reset button */}
        {currentCount > 0 && (
          <button
            onClick={reset}
            className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <IconRefresh size={14} />
            <span>إعادة</span>
          </button>
        )}
      </div>

      {/* Counter button - full width on mobile, side on desktop */}
      <button
        onClick={increment}
        disabled={isComplete}
        className={cn(
          "flex items-center justify-center gap-3 border border-border text-lg font-bold transition-all duration-200 active:scale-[0.98]",
          "rounded-b-2xl py-5 lg:rounded-2xl lg:rounded-l-none lg:py-0 lg:w-32 lg:min-h-[120px]",
          isComplete
            ? "bg-primary text-primary-foreground border-primary"
            : "bg-accent text-accent-foreground hover:bg-accent/80"
        )}
      >
        <span className="text-2xl">{currentCount}</span>
        <span className="text-muted-foreground font-normal">/ {dhikr.count}</span>
      </button>
    </div>
  )
}
