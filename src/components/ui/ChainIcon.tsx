type ChainIconProps = {
  className?: string;
};

export function ChainIcon({ className = "" }: ChainIconProps) {
  return (
    <svg
      className={`size-6 shrink-0 text-muted-light ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M10.5 13.5 8 16a4 4 0 1 1-5.66-5.66l2.5-2.5M13.5 10.5 16 8a4 4 0 1 1-5.66-5.66L8 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="m14 10 4-4M10 14l-4 4M10 10l-1-1M15 15l-1-1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
