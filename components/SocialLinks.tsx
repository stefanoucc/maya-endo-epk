"use client";

import Image from "next/image";

const SOCIAL = [
  {
    href: "https://www.youtube.com/@mayaendo",
    src: "/YOUTUBE.png",
    label: "YouTube",
  },
  {
    href: "https://open.spotify.com/intl-es/artist/05swzPCeWZMjApcUBYLyyi",
    src: "/SPOTI.png",
    label: "Spotify",
  },
  {
    href: "https://instagram.com/_mayaendo",
    src: "/INSTA.png",
    label: "Instagram",
  },
  {
    href: "https://tiktok.com/@_mayaendo",
    src: "/TIKTOK.png",
    label: "TikTok",
  },
  {
    href: "https://music.apple.com/pe/artist/maya-endo/1587969753",
    src: "/APPLE MUSIC.png",
    label: "Apple Music",
  },
] as const;

type SocialLinksProps = {
  variant?: "inline" | "nav";
  className?: string;
};

export default function SocialLinks({
  variant = "inline",
  className = "",
}: SocialLinksProps) {
  const iconClass =
    variant === "nav"
      ? "object-contain w-6 h-6 md:w-7 md:h-7"
      : "object-contain";

  const row1 = SOCIAL.slice(0, 3);
  const row2 = SOCIAL.slice(3);

  if (variant === "nav") {
    return (
      <div className={`flex flex-col gap-6 ${className}`}>
        <div className="flex justify-center gap-8">
          {row1.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-110 p-2"
              aria-label={item.label}
            >
              <Image
                src={item.src}
                alt=""
                width={28}
                height={28}
                className={iconClass}
              />
            </a>
          ))}
        </div>
        <div className="flex justify-center gap-8">
          {row2.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-110 p-2"
              aria-label={item.label}
            >
              <Image
                src={item.src}
                alt=""
                width={28}
                height={28}
                className={iconClass}
              />
            </a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap gap-6 items-center justify-center ${className}`}>
      {SOCIAL.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform hover:scale-110"
          aria-label={item.label}
        >
          <Image
            src={item.src}
            alt=""
            width={32}
            height={32}
            className={iconClass}
          />
        </a>
      ))}
    </div>
  );
}
