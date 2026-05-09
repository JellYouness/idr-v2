import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-background px-6 text-center text-foreground">
      <h1 className="text-2xl font-bold">Page not found</h1>
      <Link
        href="/"
        className="text-sm font-medium text-muted underline-offset-4 hover:underline"
      >
        Back to portfolio
      </Link>
    </div>
  );
}
