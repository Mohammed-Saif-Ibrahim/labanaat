import { redirect } from "next/navigation";

// The richer, live-preview component reference now lives at /docs/components.
// Keeping this route as a redirect avoids two differently-detailed listings
// of the same 31 components.
export default function ComponentsRedirect() {
  redirect("/docs/components");
}
