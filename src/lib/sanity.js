import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "d73dgj5d", // ← kopier fra sanity.config.js
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-01-01",
});
