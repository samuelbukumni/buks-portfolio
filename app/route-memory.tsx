"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

type Position = { y: number; href: string };

// Only explicit, same-tab links between remembered routes are enhanced.
// Hash links and browser back/forward remain owned by Next.js / the browser.
export default function RouteMemory() {
  const pathname = usePathname();
  const router = useRouter();
  const positions = useRef(new Map<string, Position>());
  const pending = useRef<Position | null>(null);

  useLayoutEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const link = (event.target as Element).closest<HTMLAnchorElement>(
        "a[href]",
      );
      if (!link || link.target || link.hasAttribute("download")) return;
      const target = new URL(link.href);
      if (
        target.origin !== location.origin ||
        target.pathname === location.pathname
      )
        return;
      if (!["/", "/about", "/playground"].includes(target.pathname)) return;
      positions.current.set(location.pathname, {
        y: window.scrollY,
        href: location.pathname + location.search + location.hash,
      });
      const remembered = positions.current.get(target.pathname);
      pending.current = null;
      if (!target.hash && !target.search && remembered) {
        event.preventDefault();
        pending.current = remembered;
        router.push(remembered.href, { scroll: false });
      }
    };
    const cancelPending = () => {
      pending.current = null;
    };
    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", cancelPending);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", cancelPending);
    };
  }, [router]);

  useLayoutEffect(() => {
    const target = pending.current;
    if (!target || new URL(target.href, location.origin).pathname !== pathname)
      return;
    let cancelled = false;
    let frame = 0;
    const stop = () => {
      cancelled = true;
      if (pending.current === target) pending.current = null;
      resize.disconnect();
      mutation.disconnect();
      cancelAnimationFrame(frame);
    };
    const restore = () => {
      if (cancelled || pending.current !== target) return;
      const main = document.getElementById("main");
      if (
        !main ||
        main.dataset.scrollReady === "false" ||
        document.fonts.status !== "loaded"
      )
        return;
      if (document.documentElement.scrollHeight - window.innerHeight < target.y)
        return;
      window.scrollTo({ top: target.y, behavior: "instant" });
      stop();
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(restore);
    };
    const resize = new ResizeObserver(schedule);
    const mutation = new MutationObserver(schedule);
    resize.observe(document.body);
    mutation.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-scroll-ready"],
    });
    void document.fonts.ready.then(schedule);
    window.addEventListener("wheel", stop, { passive: true, once: true });
    window.addEventListener("touchstart", stop, { passive: true, once: true });
    window.addEventListener("keydown", stop, { once: true });
    restore();
    return () => {
      stop();
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
    };
  }, [pathname]);
  return null;
}
