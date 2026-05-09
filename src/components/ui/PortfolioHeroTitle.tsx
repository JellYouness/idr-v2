const WORD = "Portfolio";
/** Index of the “o” between “f” and “l” — rendered as an elongated pill in the design. */
const ELONGATED_O_INDEX = 5;

export function PortfolioHeroTitle({ id }: { id?: string }) {
  return (
    <h2
      id={id}
      aria-label="Portfolio"
      className="portfolio-title-grain flex flex-wrap items-end justify-center gap-0 text-[clamp(3.5rem,14vw,10.5rem)] font-bold leading-[0.85] tracking-tight text-foreground"
    >
      {WORD.split("").map((char, index) => {
        if (char === "o" && index === ELONGATED_O_INDEX) {
          return (
            <span
              key="elongated-o"
              className="mx-[0.04em] mb-[0.06em] inline-block h-[0.68em] w-[min(0.52em,11vw)] shrink-0 rounded-full bg-foreground"
              aria-hidden
            />
          );
        }
        return (
          <span key={`${char}-${index}`} className="inline-block">
            {char}
          </span>
        );
      })}
    </h2>
  );
}
