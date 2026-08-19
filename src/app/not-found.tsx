import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="wrap flex min-h-[70dvh] flex-col justify-center py-24">
      <p className="font-serif text-6xl text-[var(--cta)]">404</p>
      <h1 className="mt-4 text-[2.2rem] font-semibold tracking-tight">This file is not on the desk.</h1>
      <p className="mt-3 max-w-[40ch] text-[var(--fg-muted)]">
        The page is missing. Search a matter, or go back to the chamber home.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="btn btn-primary no-underline">
          Home
        </Link>
        <Link href="/search/" className="btn btn-ghost no-underline">
          Search
        </Link>
      </div>
    </main>
  );
}
