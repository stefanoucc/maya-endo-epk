export default function Press() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-center font-serif text-4xl font-bold italic text-amber-400">Press</h1>
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-amber-900/50 bg-black/40 p-6 backdrop-blur-sm">
          <h3 className="text-xl font-semibold text-amber-300">Maya Endo estrena videoclip de "Habitación"</h3>
          <p className="mt-2 text-amber-200">La República - 2024</p>
          <p className="mt-4 text-amber-100">La cantante y compositora peruana Maya Endo estrenó el videoclip de su más reciente sencillo "Habitación"...</p>
          <a
            href="https://larepublica.pe/cultural/2024/03/15/maya-endo-estrena-videoclip-de-habitacion-1467180"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-amber-400 hover:text-amber-300"
          >
            Read More →
          </a>
        </div>
        <div className="rounded-lg border border-amber-900/50 bg-black/40 p-6 backdrop-blur-sm">
          <h3 className="text-xl font-semibold text-amber-300">Maya Endo revela un conmovedor EP en vivo</h3>
          <p className="mt-2 text-amber-200">Caretas - 2024</p>
          <p className="mt-4 text-amber-100">La artista peruana Maya Endo presenta su nuevo EP en vivo, una producción íntima al estilo Tiny Desk...</p>
          <a
            href="https://caretas.pe/entretenimiento/maya-endo-revela-un-conmovedor-ep-en-vivo-al-estilo-tiny-desk/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-amber-400 hover:text-amber-300"
          >
            Read More →
          </a>
        </div>
        <div className="rounded-lg border border-amber-900/50 bg-black/40 p-6 backdrop-blur-sm">
          <h3 className="text-xl font-semibold text-amber-300">Maya Endo vuelve con tema musical "2033"</h3>
          <p className="mt-2 text-amber-200">Infobae - 2023</p>
          <p className="mt-4 text-amber-100">Su nueva etapa de innovación sonora en R&B y Hip Hop marca un hito en su evolución musical...</p>
          <a
            href="https://www.infobae.com/peru/2023/01/13/maya-endo-vuelve-con-tema-musical-2033-su-nueva-etapa-de-innovacion-sonora-en-rb-y-hip-hop/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-amber-400 hover:text-amber-300"
          >
            Read More →
          </a>
        </div>
      </div>
    </div>
  )
}

