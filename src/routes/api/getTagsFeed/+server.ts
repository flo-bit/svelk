import { error, json, type RequestHandler } from "@sveltejs/kit";

// Given tags
// Return a JSON of FeedViewPost
export const GET: RequestHandler = async ({ url, locals }) => {
  const agent = locals.agent;
  if (!agent) {
    return error(401, "Unauthorized API call");
  }

  const queryParams = url.searchParams;
  const q = queryParams.get("q");
  const limit = Number(queryParams.get("limit")) || 10;

  if (!q) {
    return error(500, "q not given");
  }

  const { data } = await agent.app.bsky.feed.searchPosts({ q, limit });
  const transformedData = {
    feed: data.posts.map(post => ({ post }))
  };
  return json({ feed: transformedData.feed, nextCursor: data.cursor });
}
