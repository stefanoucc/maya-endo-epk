import type { Metadata } from "next"
import { Raleway, Instrument_Serif } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import "./globals.css"
import dynamic from "next/dynamic"
import localFont from 'next/font/local'

// Load Satoshi font
const satoshi = localFont({
  src: [
    {
      path: '../public/fonts/Satoshi-Regular.woff2',
      style: 'normal',
    }
  ],
  variable: '--font-satoshi',
})

// Use dynamic import for NavMenu with SSR disabled to avoid hydration errors
const NavMenu = dynamic(() => import("@/components/NavMenu"), {
  ssr: false
})

const raleway = Raleway({ subsets: ["latin"] })

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-instrument'
})

export const metadata: Metadata = {
  title: "MAYA ENDO",
  description: "Maya Endo Spoiler",
  icons: {
    icon: [
      {
        url: "/favicon/nuevo_logo.ico",
      },
    ],
    apple: [
      {
        url: "/favicon/nuevo_logo.ico",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${satoshi.variable}`}>
      <body className={`${raleway.className} bg-black text-amber-100`}>
        <div className="min-h-screen bg-[url('/honeycomb-bg.png')] bg-cover bg-fixed bg-center">
          <div className="min-h-screen bg-black/70">
            <NavMenu />
            <main>{children}</main>
            <Analytics />
          </div>
        </div>
      </body>
    </html>
  )
}

