export default function Work() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-center font-serif text-4xl font-bold italic text-amber-400">Work</h1>
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <div className="aspect-video">
          <iframe
            className="h-full w-full rounded-lg"
            src="https://www.youtube.com/embed/RLVEH4x2TE0"
            title="Desde la casa de Martin (Live Session)"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="aspect-video">
          <iframe
            className="h-full w-full rounded-lg"
            src="https://www.youtube.com/embed/nH8NxdS7YpI"
            title="Maya Endo X rulolo - HABITACIÓN (Official Music Video)"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
      <div className="mt-12">
        <h2 className="mb-4 text-center text-2xl font-semibold text-amber-300">Featured Tracks</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-amber-900/20 p-4">
            <h3 className="mb-2 text-lg font-semibold text-amber-200">Falsa (2021)</h3>
            <audio controls className="w-full">
              <source src="/audio/Falsa_Vocals.wav" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
          <div className="rounded-lg bg-amber-900/20 p-4">
            <h3 className="mb-2 text-lg font-semibold text-amber-200">Nueva York (2022)</h3>
            <audio controls className="w-full">
              <source src="/audio/NuevaYork_Vocals.wav" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      </div>
    </div>
  )
}

