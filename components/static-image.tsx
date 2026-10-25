/* eslint-disable @next/next/no-img-element */
import type { ImgHTMLAttributes } from "react";
import imageManifest from "../lib/image-manifest.json";

type Image = {
  width: number;
  height: number;
  variants: { src: string; width: number }[];
};

type Props = ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string };

export default function StaticImage({
  src,
  alt,
  loading = "lazy",
  sizes = "(max-width: 768px) 100vw, 1200px",
  ...props
}: Props) {
  const image = (imageManifest as Record<string, Image>)[src];
  return (
    <img
      {...props}
      src={src}
      alt={alt}
      width={image?.width}
      height={image?.height}
      srcSet={image?.variants
        .map((variant) => `${variant.src} ${variant.width}w`)
        .join(", ")}
      sizes={image ? sizes : undefined}
      loading={loading}
      decoding="async"
    />
  );
}
