/** Smooth-scrolls to a section by id. Returns false if the section isn't on the current page. */
export function scrollToId(id: string): boolean {
  if (id === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return true;
  }
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}
