/**
 * Configuration built by `npm run build`
 */
const config = {
  collection: "https://digital.lib.utk.edu/assemble/collection/collections/rftacuratedart",
  title: "Rising from the Ashes: The Chimney Tops 2 Wildfires in Memory and Art",
  hero: [
    "https://digital.lib.utk.edu/assemble/manifest/rftaart/1"
  ],
  metadata: ["Subject", "Artist"],
};

/**
 * Configuration built by `npm run dev`
 */
const dev = {
  collection: "https://digital.lib.utk.edu/assemble/collection/collections/rftacuratedart",
  title: "Rising from the Ashes: The Chimney Tops 2 Wildfires in Memory and Art",
  hero: [
    "https://digital.lib.utk.edu/assemble/manifest/rftaart/1"
  ],
  metadata: ["Subject", "Artist"],
};

const devAlt = {
  collection: "https://iiif.bodleian.ox.ac.uk/iiif/collection/canonici",
  title: "Canonici",
  hero: [
    "https://iiif.bodleian.ox.ac.uk/iiif/manifest/d6f0ea37-6882-42a5-a923-9fb1e034ae29.json",
  ],
  metadata: ["Materials"],
  pages: {
    seeAlso: [
      "https://id.for.seeAlso.item.1.md",
      "https://id.for.seeAlso.item.2.md",
    ],
  },
};

exports.config = config;
exports.dev = dev;
