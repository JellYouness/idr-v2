type BrandLogoProps = {
  className?: string;
  "aria-label"?: string;
};

/** Stylized mark: ring with macron (matches design reference). */
export function BrandLogo({
  className = "",
  "aria-label": ariaLabel = "Brand",
}: BrandLogoProps) {
  return (
    <svg
      className={className}
      width="40"
      height="48"
      viewBox="0 0 40 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={ariaLabel}
      role="img"
    >
      <path
        d="M20 12c-6.6 0-12 5.1-12 11.5S13.4 35 20 35s12-5.1 12-11.5S26.6 12 20 12z"
        stroke="currentColor"
        strokeWidth="3.2"
        fill="none"
      />
      <line
        x1="8"
        y1="7"
        x2="32"
        y2="7"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
