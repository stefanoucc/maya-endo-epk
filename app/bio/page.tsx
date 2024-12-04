import Image from "next/image"

export default function Bio() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-center font-serif text-4xl font-bold italic text-amber-400">Biography</h1>
        <div className="mt-8 space-y-6 text-amber-100">
          <div className="relative float-right ml-6 mb-6">
            <Image
              src="/honeycomb-frame.png.jpeg"
              alt="Maya Endo"
              width={300}
              height={300}
              className="rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
          <p>
            In the intricate dance of sound and silence, Maya Endo emerges as a singular voice, her artistry as complex and mesmerizing as the hum of a beehive. Born under the whisper of rustling leaves and the gentle buzz of nature&apos;s smallest workers, Maya&apos;s journey into the world of music began as organically as the flow of honey.
          </p>
          <p>
            Her compositions, much like the structure of a honeycomb, are both delicate and strong, each note carefully placed to create a harmonious whole. Maya&apos;s unique approach intertwines classical training with avant-garde experimentation, resulting in performances that leave audiences spellbound, as if caught in the sweet, sticky embrace of musical amber.
          </p>
          <p>
            Throughout her career, Maya has pollinated the global music scene with her distinctive sound, collaborating with an eclectic mix of artists and appearing in venues that range from underground hives of creativity to the grandest concert halls. Her work continues to evolve, each new piece a fresh cell in the ever-expanding honeycomb of her artistic vision.
          </p>
        </div>
      </div>
    </div>
  )
}

