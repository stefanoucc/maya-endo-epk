import Image from "next/image"
import dynamic from "next/dynamic"

const HangmanGame = dynamic(() => import("@/components/HangmanGame"), {
  ssr: false
})

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col items-center">
        <div className="mt-4">
          <Image
            src="/MAYAENDO.COM.gif"
            alt="Maya Endo Animation"
            width={800}
            height={600}
            className="w-auto h-auto"
          />
        </div>
        
        <div className="mt-8">
          <HangmanGame />
        </div>
      </div>
    </div>
  )
}

