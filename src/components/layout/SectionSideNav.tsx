"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const NAV_ITEMS = [
  { id: "top", slug: "TOP", surface: "dark" as const },
  { id: "about", slug: "ABOUT", surface: "light" as const },
  { id: "resume", slug: "RESUME", surface: "dark" as const },
  { id: "work", slug: "WORK", surface: "light" as const },
  { id: "contact", slug: "CONTACT", surface: "dark" as const },
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

  const activeIndex = useMemo(() => {
    const i = NAV_ITEMS.findIndex((item) => item.id === activeId);
    return i < 0 ? 0 : i;
  }, [activeId]);

  const item = NAV_ITEMS[activeIndex];
  const part = `P/${String(activeIndex + 1).padStart(2, "0")}`;
  const isDark = item.surface === "dark";

  const linkTone = isDark
    ? "text-zinc-100"
    : "text-zinc-950";

  const pipeTone = isDark ? "text-zinc-500" : "text-zinc-500";
  const codeTone = isDark ? "text-zinc-400" : "text-zinc-700";

  return (
    <nav
      aria-label="Current section"
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed right-0 top-1/2 z-50 hidden -translate-y-1/2 md:block md:pointer-events-auto"
    >
      <div className="flex justify-end pr-3 lg:pr-6">
        <a
          key={activeId}
          href={`#${item.id}`}
          className={[
            "pointer-events-auto inline-flex origin-center rotate-90 items-baseline gap-0 whitespace-nowrap py-2 text-[11px] font-semibold leading-none tracking-[0.14em] transition-colors duration-300 sm:text-xs",
            linkTone,
          ].join(" ")}
          aria-current="location"
          aria-label={`Current section: ${item.slug} | ${part}`}
        >
          <span>{item.slug}</span>
          <span className={["mx-1 font-normal transition-colors duration-300", pipeTone].join(" ")} aria-hidden>
            |
          </span>
          <span className={["tabular-nums tracking-widest transition-colors duration-300", codeTone].join(" ")}>
            {part}
          </span>
        </a>
      </div>
    </nav>
  );
}
