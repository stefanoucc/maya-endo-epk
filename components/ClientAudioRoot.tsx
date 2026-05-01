"use client";

import { AudioProvider } from "@/components/AudioManager";

export default function ClientAudioRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AudioProvider>{children}</AudioProvider>;
}
