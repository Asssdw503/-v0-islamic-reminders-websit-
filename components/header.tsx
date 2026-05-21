"use client"

import Link from "next/link"
import { IconArrowRight } from "@tabler/icons-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <span className="text-lg font-bold">أ</span>
          </div>
          <span className="text-xl font-bold text-foreground">أذكاري</span>
        </Link>
      </div>
    </header>
  )
}

interface PageHeaderProps {
  title: string
  description?: string
  showBack?: boolean
}

export function PageHeader({ title, description, showBack }: PageHeaderProps) {
  return (
    <div className="mb-8">
      {showBack && (
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <IconArrowRight size={20} />
          <span>العودة للرئيسية</span>
        </Link>
      )}
      <h1 className="text-3xl font-bold text-foreground">{title}</h1>
      {description && (
        <p className="mt-2 text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
