// Imported by every server module that can touch secrets. Unlike the `server-only`
// package it also works in the standalone worker process (plain Node, no react-server
// condition), while still failing loudly if bundled into browser code.
if (typeof window !== "undefined") {
  throw new Error("Server module imported in the browser. Secrets must never reach client bundles.");
}
export {};
