import Image from "next/image"
import dynamic from "next/dynamic"

const HangmanGame = dynamic(() => import("@/components/HangmanGame"), {
  ssr: false
})

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col items-center">
        <div className="w-full fade-in-1">
          <div className="container mx-auto px-4">
            <div className="flex h-48 items-center justify-center">
              <div className="relative h-48">
                <Image
                  src="/NUEVO LOGO.png"
                  alt="Maya Endo Logo"
                  width={800}
                  height={800}
                  className="w-auto h-full"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 fade-in-2">
          <Image
            src="/MAYAENDO.COM.gif"
            alt="Maya Endo Animation"
            width={800}
            height={600}
            className="w-auto h-auto"
            priority
          />
        </div>
        
        <div className="mt-8 fade-in-3">
          <HangmanGame />
        </div>
      </div>
    </div>
  )
}

