"use client";

import { useCallback, useEffect, useState } from "react";

const NAV_ITEMS = [
  { id: "top", label: "Top" },
  { id: "about", label: "About" },
  { id: "resume", label: "Resume" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
] as const;

type NavSectionId = (typeof NAV_ITEMS)[number]["id"];

function pickActiveSection(): NavSectionId {
  const marker = window.innerHeight * 0.28;
  let active: NavSectionId = NAV_ITEMS[0].id;

  for (const item of NAV_ITEMS) {
    const el = document.getElementById(item.id);
    if (!el) continue;
    const { top } = el.getBoundingClientRect();
    if (top <= marker) active = item.id;
  }

  return active;
}

export function SectionSideNav() {
  const [activeId, setActiveId] = useState<NavSectionId>(NAV_ITEMS[0].id);

  const sync = useCallback(() => {
    setActiveId(pickActiveSection());
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync, { passive: true });
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  return (
    <nav
      aria-label="On this page"
      className="pointer-events-none fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 md:block md:pointer-events-auto lg:right-8"
    >
      <ul className="flex flex-col items-end gap-1 border-l border-foreground/15 pl-3">
        {NAV_ITEMS.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={[
                  "group pointer-events-auto flex items-center gap-2 py-1 text-xs tracking-wide transition-colors",
                  isActive
                    ? "font-semibold text-foreground"
                    : "font-medium text-muted hover:text-foreground",
                ].join(" ")}
                aria-current={isActive ? "location" : undefined}
              >
                <span
                  className={[
                    "h-1.5 shrink-0 rounded-full transition-[width,background-color]",
                    isActive
                      ? "w-4 bg-foreground"
                      : "w-1.5 bg-foreground/25 group-hover:bg-foreground/50",
                  ].join(" ")}
                  aria-hidden
                />
                <span>{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
