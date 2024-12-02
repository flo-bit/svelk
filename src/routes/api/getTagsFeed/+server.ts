import { error, json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, locals }) => {
  const agent = locals.agent;
  if (!agent) {
    return error(401, "Unauthorized API call");

  }
  const body = await request.json()
  console.log({q: body.q, tag: body.tag})
  const { data } = await agent.app.bsky.feed.searchPosts({q: body.q, tag: body.tag});
  const transformedData = {
    feed: data.posts.map(post => ({ post }))
  };
  return json({ feed: transformedData.feed, nextCursor: data.cursor });
}
