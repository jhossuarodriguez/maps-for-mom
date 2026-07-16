import { collection, config, fields } from "@keystatic/core";

// Astro resuelve el src de cada imagen relativo al index.mdoc y no decodifica %20,
// así que las imágenes deben quedar junto al .mdoc y con nombres sin espacios ni acentos.
const transformFilename = (filename: string) => {
  const extIndex = filename.lastIndexOf(".");
  const base = extIndex === -1 ? filename : filename.slice(0, extIndex);
  const ext = extIndex === -1 ? "" : filename.slice(extIndex).toLowerCase();
  const clean = base
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return (clean || "imagen") + ext;
};

export default config({
  storage: {
    kind: "local",
  },
  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      path: "src/content/posts/*/index",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        content: fields.markdoc({
          label: "Content",
          options: {
            image: {
              // Keystatic guarda en `${directory}/${slug}/` y referencia `${publicPath}${slug}/archivo`:
              // ambas rutas apuntan a la carpeta del post, que es donde Astro las busca.
              directory: "src/content/posts",
              publicPath: "../",
              transformFilename,
            },
          },
        }),
      },
    }),
  },
});
