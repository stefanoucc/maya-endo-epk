import type { Metadata } from "next"
import { Raleway } from 'next/font/google'
import "./globals.css"
import { Navigation } from "@/components/navigation"

const raleway = Raleway({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Maya Endo - Electronic Press Kit",
  description: "Official Electronic Press Kit for Maya Endo",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
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

