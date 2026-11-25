import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-medium text-accent">404</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-2 text-sm text-muted">The page you are looking for does not exist or was removed.</p>
      <Link href="/" className="mt-6 text-sm font-medium text-accent hover:underline">
        Back to the dashboard
      </Link>
    </main>
  );
}
