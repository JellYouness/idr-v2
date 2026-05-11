import Image from "next/image";
import { Container } from "@/components/layout/Container";

/** Thin rail + small mark between hero and about. */
export function LandingIntroDivider() {
  return (
    <div
      className="section-tone-dark bg-background py-4 sm:py-5"
      role="presentation"
      aria-hidden="true"
    >
      <Container>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="h-px min-w-0 flex-1 bg-foreground/12" />
          <Image
            src="/images/logo.png"
            alt=""
            width={64}
            height={80}
            className="h-6 w-auto shrink-0 object-contain brightness-0 invert opacity-90 sm:h-7"
          />
          <div className="h-px min-w-0 flex-1 bg-foreground/12" />
        </div>
      </Container>
    </div>
  );
}
