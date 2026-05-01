"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import SocialLinks from "@/components/SocialLinks";
import styles from "./NavMenu.module.css";

type SubItem = { href: string; label: string };

type MenuEntry =
  | {
      type: "link";
      href: string;
      label: string;
      isNew?: boolean;
      highlight?: boolean;
    }
  | { type: "group"; label: string; href: string; subItems: SubItem[] };

const menuItems: MenuEntry[] = [
  {
    type: "link",
    href: "/taru-wo-shiru",
    label: "TARU WO SHIRU",
    isNew: true,
    highlight: true,
  },
  {
    type: "group",
    label: "TODO ESO QUE SOÑÉ",
    href: "/todo-eso-que-sone",
    subItems: [
      { href: "/quiz1", label: "Elige tu taza" },
      { href: "/quiz2", label: "Pequeño mundo" },
      { href: "/match-calculator", label: "Calculadora de compatibilidad" },
      { href: "/hastapronto", label: "Hasta Pronto" },
    ],
  },
];

function pathMatchesSubItem(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isTeqsGroupActive(pathname: string): boolean {
  const group = menuItems.find((m) => m.type === "group");
  if (!group || group.type !== "group") return false;
  if (pathname === group.href) return true;
  return group.subItems.some((s) => pathMatchesSubItem(pathname, s.href));
}

export default function NavMenu() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [teqsOpen, setTeqsOpen] = useState(() => isTeqsGroupActive(pathname));

  useEffect(() => {
    setTeqsOpen(isTeqsGroupActive(pathname));
  }, [pathname]);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isOpen && !target.closest("[data-nav-menu]")) {
        setIsOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (isOpen && e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    if (isOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("resize", checkIfMobile);
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, isMobile]);

  const isLinkActive = (href: string) => {
    if (href === "/taru-wo-shiru") {
      return (
        pathname === "/" ||
        pathname === "/taru-wo-shiru" ||
        pathname.startsWith("/taru-wo-shiru/")
      );
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          className={styles.menuOpenButton}
          onClick={() => setIsOpen(true)}
          aria-label="Abrir menú de navegación"
        >
          <Image
            src="/maya-endo-logo.png"
            alt=""
            width={28}
            height={28}
            className={styles.menuOpenButtonLogo}
          />
        </button>
      )}

      <div
        data-nav-menu
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : styles.drawerClosed}`}
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={() => setIsOpen(false)}
          aria-label="Cerrar menú"
        >
          <X className={`h-5 w-5 md:h-6 md:w-6 ${styles.closeIcon}`} aria-hidden />
        </button>

        <div className={styles.inner}>
          <nav className="flex-1">
            <ul className={styles.menuList}>
              {menuItems.map((entry) => {
                if (entry.type === "link") {
                  const active = isLinkActive(entry.href);
                  const linkClass = [
                    styles.menuItem,
                    entry.highlight && styles.menuItemHighlight,
                    active && !entry.highlight && styles.menuItemActive,
                  ]
                    .filter(Boolean)
                    .join(" ");

                  return (
                    <li key={entry.href}>
                      <Link
                        href={entry.href}
                        onClick={() => setIsOpen(false)}
                        className={linkClass}
                      >
                        <span>{entry.label}</span>
                        {entry.isNew && (
                          <span className={styles.newBadge}>NUEVO</span>
                        )}
                      </Link>
                    </li>
                  );
                }

                return (
                  <li key={entry.href} className={styles.groupWrap}>
                    <div className={styles.groupHeaderRow}>
                      <Link
                        href={entry.href}
                        onClick={() => setIsOpen(false)}
                        className={`${styles.groupTitleLink} ${pathname === entry.href ? styles.groupTitleLinkActive : ""}`}
                      >
                        {entry.label}
                      </Link>
                      <button
                        type="button"
                        className={styles.groupExpandBtn}
                        onClick={() => setTeqsOpen((o) => !o)}
                        aria-expanded={teqsOpen}
                        aria-controls="teqs-submenu"
                        aria-label={
                          teqsOpen
                            ? "Ocultar enlaces de TODO ESO QUE SOÑÉ"
                            : "Mostrar más enlaces"
                        }
                      >
                        <ChevronDown
                          className={`${styles.chevron} ${teqsOpen ? styles.chevronOpen : ""}`}
                          aria-hidden
                        />
                      </button>
                    </div>
                    {teqsOpen && (
                      <ul
                        id="teqs-submenu"
                        className={`${styles.subList} ${styles.menuSection}`}
                      >
                        {entry.subItems.map((sub) => {
                          const subActive = pathMatchesSubItem(
                            pathname,
                            sub.href
                          );
                          return (
                            <li key={sub.href}>
                              <Link
                                href={sub.href}
                                onClick={() => setIsOpen(false)}
                                className={`${styles.menuSubItem} ${subActive ? styles.menuSubItemActive : ""}`}
                              >
                                {sub.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className={styles.socialIcons}>
            <SocialLinks variant="nav" />
          </div>
        </div>
      </div>

      <div
        className={`${styles.menuOverlay} ${isOpen ? styles.menuOverlayVisible : styles.menuOverlayHidden}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />
    </>
  );
}
