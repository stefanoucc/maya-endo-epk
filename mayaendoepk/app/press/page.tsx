export default function Press() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-center font-serif text-4xl font-bold italic text-amber-400">Press</h1>
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-amber-900/50 bg-black/40 p-6 backdrop-blur-sm">
          <h3 className="text-xl font-semibold text-amber-300">The Buzz Around Maya Endo</h3>
          <p className="mt-2 text-amber-200">Indie Music Review - 2023</p>
          <p className="mt-4 text-amber-100">Maya Endo&apos;s latest album is a mesmerizing journey through sound, each track a carefully crafted honeycomb of melody and rhythm...</p>
          <a
            href="#"
            className="mt-4 inline-block text-amber-400 hover:text-amber-300"
          >
            Read More →
          </a>
        </div>
        <div className="rounded-lg border border-amber-900/50 bg-black/40 p-6 backdrop-blur-sm">
          <h3 className="text-xl font-semibold text-amber-300">A Sweet Symphony</h3>
          <p className="mt-2 text-amber-200">Underground Sounds - 2022</p>
          <p className="mt-4 text-amber-100">In her sold-out performance, Maya Endo proved once again why she&apos;s the queen bee of the indie music scene...</p>
          <a
            href="#"
            className="mt-4 inline-block text-amber-400 hover:text-amber-300"
          >
            Read More →
          </a>
        </div>
        <div className="rounded-lg border border-amber-900/50 bg-black/40 p-6 backdrop-blur-sm">
          <h3 className="text-xl font-semibold text-amber-300">Nature&apos;s Soundtrack</h3>
          <p className="mt-2 text-amber-200">Eco Arts Magazine - 2021</p>
          <p className="mt-4 text-amber-100">Maya Endo&apos;s innovative use of natural sounds, particularly those inspired by bees, sets a new standard in eco-conscious music...</p>
          <a
            href="#"
            className="mt-4 inline-block text-amber-400 hover:text-amber-300"
          >
            Read More →
          </a>
        </div>
      </div>
    </div>
  )
}

