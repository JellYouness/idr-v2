import Image from "next/image";
import type { ReactNode } from "react";

type ExternalLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  showIcon?: boolean;
};

export function ExternalLink({
  href,
  children,
  className = "",
  showIcon = true,
}: ExternalLinkProps) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 text-accent underline-offset-4 transition hover:underline ${className}`}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      {showIcon ? (
        <Image
          src="/icons/hyperlink-icon.svg"
          alt=""
          width={14}
          height={14}
          className="opacity-80"
          aria-hidden
        />
      ) : null}
    </a>
  );
}
