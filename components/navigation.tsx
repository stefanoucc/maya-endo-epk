"use client"

import Link from "next/link"
import Image from "next/image"

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-64 items-center justify-center">
          <Link href="/" className="flex items-center">
            <div className="relative h-64">
              <Image
                src="/NUEVO LOGO.png"
                alt="Maya Endo Logo"
                width={1000}
                height={1000}
                className="w-auto h-full"
              />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  )
}

