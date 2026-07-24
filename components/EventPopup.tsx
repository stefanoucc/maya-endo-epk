"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import styles from "./EventPopup.module.css";

const EVENT_URL =
  "https://saund.live/mayaendo/todo-eso-que-cante?utm_source=ig&utm_medium=social&utm_content=link_in_bio";
const STORAGE_KEY = "eventPopup_05agosto_dismissed";

export default function EventPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    sessionStorage.setItem(STORAGE_KEY, "1");
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={close} role="presentation">
      <div
        className={styles.card}
        role="dialog"
        aria-modal="true"
        aria-label="TODO ESO QUE CANTÉ — 5 de agosto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.close}
          onClick={close}
          aria-label="Cerrar"
        >
          <X size={18} strokeWidth={2.5} aria-hidden />
        </button>

        <a
          className={styles.imageLink}
          href={EVENT_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className={styles.image}
            src="/popup_05agosto.jpeg"
            alt="TODO ESO QUE CANTÉ — Maya Endo en vivo, 5 de agosto 9PM en La Noche de Barranco"
            width={819}
            height={1024}
            priority
          />
        </a>

        <p className={styles.caption}>
          Usa el código <span className={styles.code}>MAYAMAYA20</span> para 20%
          de descuento
        </p>
      </div>
    </div>
  );
}
