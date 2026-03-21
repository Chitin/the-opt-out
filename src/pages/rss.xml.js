import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export const prerender = true;

export async function GET(context) {
	const posts = await getCollection("blog");
	return rss({
		// `<title>` field in output xml
		title: SITE_TITLE,
		// `<description>` field in output xml
		description: SITE_DESCRIPTION,
		// Pull in your project "site" from the endpoint context
		// https://docs.astro.build/en/reference/api-reference/#site
		site: context.site,
		// Array of `<item>`s in output xml
		// See "Generating items" section for examples using content collections and glob imports
		items: posts
			.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
			.map((post) => ({
				...post.data,
				link: `/blog/${post.id}/`,
			})),
		// (optional) inject custom xml
		customData: `<language>en-us</language>`,
	});
}