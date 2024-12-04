import Image from "next/image"

export default function Gallery() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-center font-serif text-4xl font-bold italic text-amber-400">Gallery</h1>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="group relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={`/placeholder.svg?height=400&width=400`}
              alt={`Gallery image ${i}`}
              width={400}
              height={400}
              className="h-full w-full object-cover transition-transform group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="absolute bottom-0 left-0 p-4 opacity-0 transition-opacity group-hover:opacity-100">
              <h3 className="text-lg font-semibold text-amber-300">Image Title {i}</h3>
              <p className="text-sm text-amber-100">Brief description of the image</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

