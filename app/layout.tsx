import type { Metadata } from "next"
import { Raleway, Instrument_Serif } from 'next/font/google'
import "./globals.css"
import { Navigation } from "@/components/navigation"

const raleway = Raleway({ subsets: ["latin"] })

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-instrument'
})

export const metadata: Metadata = {
  title: "Maya Endo - Electronic Press Kit",
  description: "Official Electronic Press Kit for Maya Endo",
  icons: {
    icon: [
      {
        url: "/favicon/maya-endo-logo.png",
        href: "/favicon/maya-endo-logo.png",
      },
    ],
    apple: [
      {
        url: "/favicon/maya-endo-logo.png",
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
            <Navigation />
            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}

