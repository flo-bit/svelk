import type { Agent } from "@atproto/api";
import type { FeedViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import { error, json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ locals }) => {
  if (!locals.user) {
    return error(401, { message: "Unauthorized" });
  }

  const agent = locals.agent as Agent;
  const bookmarks = Array.from(locals.bookmarks);

  if (bookmarks.length === 0) {
    return json({ posts: [] });
  }

  const response = await agent.getPosts({ uris: bookmarks });
  const posts = response.data.posts.map((p) => {
    return { post: p } as FeedViewPost;
  });

  return json({ posts });
}
