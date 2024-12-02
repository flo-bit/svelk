import { error, json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, locals }) => {
  const agent = locals.agent;
  if (!agent) {
    return error(401, "Unauthorized API call");

  }
  const body = await request.json()
  const { data } = await agent.app.bsky.feed.searchPosts(body);
  const transformedData = {
    feed: data.posts.map(post => ({ post }))
  };
  return json({ feed: transformedData.feed, nextCursor: data.cursor });
}
