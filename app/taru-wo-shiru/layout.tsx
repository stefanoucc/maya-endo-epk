import type { Metadata } from "next";

const description =
  "TARU WO SHIRU (足るを知る) — EP acústico de Maya Endo. Tres canciones: Bajo el árbol, Memoria selectiva, Sobremesa ft. João Noriega. Anuncio 7 mayo 2026; lanzamiento 14 mayo 2026.";

export const metadata: Metadata = {
  title: "TARU WO SHIRU · Maya Endo",
  description,
  openGraph: {
    title: "TARU WO SHIRU · Maya Endo",
    description,
    type: "website",
    locale: "es_PE",
    images: [
      {
        url: "/NUEVO LOGO.png",
        width: 1200,
        height: 630,
        alt: "Maya Endo — TARU WO SHIRU",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TARU WO SHIRU · Maya Endo",
    description,
    images: ["/NUEVO LOGO.png"],
  },
};

export default function TaruWoShiruLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
