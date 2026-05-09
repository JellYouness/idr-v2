import { Container } from "@/components/layout/Container";
import type { SiteMeta } from "@/lib/types";

type SiteFooterProps = {
  site: SiteMeta;
};

export function SiteFooter({ site }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-foreground/10 bg-background py-10">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold tracking-tight text-foreground">
              {site.name}
            </p>
            <p className="mt-1 text-sm text-muted">{site.roleLine}</p>
            <p className="mt-4 text-xs text-muted-light">
              © {year} {site.name}. All rights reserved.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm"
          >
            <a className="text-muted underline-offset-4 hover:underline" href="#top">
              Top
            </a>
            <a className="text-muted underline-offset-4 hover:underline" href="#about">
              About
            </a>
            <a className="text-muted underline-offset-4 hover:underline" href="#resume">
              Resume
            </a>
            <a className="text-muted underline-offset-4 hover:underline" href="#work">
              Work
            </a>
            <a className="text-muted underline-offset-4 hover:underline" href="#contact">
              Contact
            </a>
            <a
              className="text-muted underline-offset-4 hover:underline"
              href={`mailto:${site.email}`}
            >
              Email
            </a>
          </nav>
        </div>
      </Container>
    </footer>
  );
}

