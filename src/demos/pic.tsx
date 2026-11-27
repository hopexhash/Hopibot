import type { CSSProperties } from "react";
import type { DemoImage } from "./images";

/**
 * A photo of a demo website: two pre-made sizes, the browser picks one. The average colour
 * of the photo is shown while it loads, and width/height reserve its place so nothing jumps.
 * `eager` is for the one photo at the top of a page; everything else loads when it comes near.
 */
export function Pic({ img, alt, sizes = "100vw", eager = false, className, style }: { img: DemoImage; alt: string; sizes?: string; eager?: boolean; className?: string; style?: CSSProperties }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${img.src}-l.webp`}
      srcSet={`${img.src}-s.webp ${img.sw}w, ${img.src}-l.webp ${img.w}w`}
      sizes={sizes}
      width={img.w}
      height={img.h}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      decoding="async"
      className={className}
      style={{ backgroundColor: img.c, ...style }}
    />
  );
}
