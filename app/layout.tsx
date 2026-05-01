import type { Metadata } from "next"
import {
  DotGothic16,
  Pixelify_Sans,
  Press_Start_2P,
  Raleway,
  Silkscreen,
  VT323,
} from "next/font/google"
import { Analytics } from '@vercel/analytics/react'
import ClientAudioRoot from "@/components/ClientAudioRoot";
import "./globals.css"
import dynamic from "next/dynamic"
import localFont from 'next/font/local'

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
})

const dotGothic16 = DotGothic16({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-dotgothic",
})

const silkscreen = Silkscreen({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-silkscreen",
})

const pixelifySans = Pixelify_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-pixelify",
})

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
})

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

const instrumentSerif = localFont({
  src: [
    {
      path: '../public/fonts/InstrumentSerif-Regular.ttf',
      style: 'normal',
    }
  ],
  variable: '--font-instrument',
})

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://mayaendo.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "MAYA ENDO",
  description: "www.mayaendo.com",
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
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${satoshi.variable} ${pressStart2P.variable} ${dotGothic16.variable} ${silkscreen.variable} ${pixelifySans.variable} ${vt323.variable}`}
    >
      <body
        className={`${raleway.className} bg-[var(--mac-shell-base)] text-amber-100 antialiased`}
      >
        <div className="appShell">
          <div className="appShellInner">
            <ClientAudioRoot>
              <NavMenu />
              <main>{children}</main>
              <Analytics />
            </ClientAudioRoot>
          </div>
        </div>
      </body>
    </html>
  )
}

