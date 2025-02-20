import type { Metadata } from "next"
import { Raleway, Instrument_Serif } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import "./globals.css"

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
    <html lang="en" className={`${instrumentSerif.variable}`}>
      <body className={`${raleway.className} bg-black text-amber-100`}>
        <div className="min-h-screen bg-[url('/honeycomb-bg.png')] bg-cover bg-fixed bg-center">
          <div className="min-h-screen bg-black/70">
            <main>{children}</main>
            <Analytics />
          </div>
        </div>
      </body>
    </html>
  )
}

