"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

export function Navigation() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path ? "text-amber-400" : "text-amber-200 hover:text-amber-300"
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-amber-900/20 bg-black/60 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/maya-endo-logo.png"
              alt="Maya Endo Logo"
              width={48}
              height={48}
              className="h-12 w-auto"
            />
          </Link>
          <div className="flex space-x-8">
            <Link href="/bio" className={`${isActive("/bio")} transition-colors`}>
              Bio
            </Link>
            <Link href="/work" className={`${isActive("/work")} transition-colors`}>
              Work
            </Link>
            <Link href="/press" className={`${isActive("/press")} transition-colors`}>
              Press
            </Link>
            <Link href="/gallery" className={`${isActive("/gallery")} transition-colors`}>
              Gallery
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

