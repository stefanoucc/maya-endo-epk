import Image from "next/image"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center space-y-8">
        <h1 className="text-center font-serif text-5xl font-bold italic text-amber-400">Maya Endo</h1>
        <div className="max-w-2xl text-center text-lg text-amber-200">
          Unveiling the hidden melodies of the hive, Maya Endo weaves a tapestry of sound and emotion that resonates with the very essence of nature&apos;s rhythm.
        </div>
        <div className="relative">
          <Image
            src="/maya-endo-logo.png"
            alt="Maya Endo Logo"
            width={400}
            height={400}
            className="w-auto max-w-full"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>
      </div>
    </div>
  )
}

