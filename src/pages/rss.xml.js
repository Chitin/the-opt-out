import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export function GET(context) {
  return rss({
    // `<title>` field in output xml
    title: SITE_TITLE,
    // `<description>` field in output xml
    description: SITE_DESCRIPTION,
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#site
    site: import.meta.env.SITE,
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: import.meta.glob('./blog/**/*.md'),
    // (optional) inject custom xml
    customData: `<language>en</language>`,
  });
}
