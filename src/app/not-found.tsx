import Link from "next/link";

/** Shown to everyone, including visitors of the public website: no internal wording. */
export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-[#f6f4ef] px-6 text-center text-[#14110f]">
      <p className="text-sm font-semibold tracking-[0.2em] text-[#14110f]/50">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Deze pagina bestaat niet</h1>
      <p className="mt-3 max-w-sm text-[15px] text-[#14110f]/65">De pagina die u zoekt is verplaatst of bestaat niet meer.</p>
      <Link href="/" className="mt-8 rounded-full bg-[#14110f] px-6 py-3 text-sm font-semibold text-[#f6f4ef]">
        Naar de homepage
      </Link>
    </main>
  );
}
