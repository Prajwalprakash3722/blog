import { remark } from "remark";
import gfm from "remark-gfm";
import html from "remark-html";
import { defaultSchema } from "hast-util-sanitize";
import imageManifest from "./image-manifest.json";

type MarkdownNode = {
  type: string;
  url?: string;
  depth?: number;
  data?: { hProperties?: Record<string, string | number> };
  children?: MarkdownNode[];
};

function staticImages() {
  return function transform(node: MarkdownNode) {
    if (node.type === "image" && node.url) {
      const image = (
        imageManifest as Record<
          string,
          {
            width: number;
            height: number;
            variants: { src: string; width: number }[];
          }
        >
      )[node.url];
      if (!image) throw new Error(`Import image before building: ${node.url}`);
      node.data = {
        hProperties: {
          width: image.width,
          height: image.height,
          loading: "lazy",
          decoding: "async",
          srcSet: image.variants
            .map((variant) => `${variant.src} ${variant.width}w`)
            .join(", "),
          sizes: "(max-width: 768px) 100vw, 800px",
        },
      };
    }
    if (node.type === "heading" && node.depth === 1) node.depth = 2;
    node.children?.forEach(transform);
  };
}

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(gfm)
    .use(staticImages)
    .use(html, {
      sanitize: {
        ...defaultSchema,
        attributes: {
          ...defaultSchema.attributes,
          img: [
            ...(defaultSchema.attributes?.img || []),
            "width",
            "height",
            "loading",
            "decoding",
            "srcSet",
            "sizes",
          ],
        },
      },
    })
    .process(markdown);
  return result.toString();
}
