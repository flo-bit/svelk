import { AtpBaseClient } from "@atproto/api";
import { error, json, type RequestHandler } from "@sveltejs/kit";

// Given a cursor and limit (opt)
// Return a JSON of FeedViewPost
export const GET: RequestHandler = async ({ url, locals }) => {
  const agent = locals.agent;
  if (!agent || agent instanceof AtpBaseClient) {
    return error(401, "Unauthorized API call");
  }

  const queryParams = url.searchParams;
  const did = queryParams.get("did") as string;

  const { data } = await agent.app.bsky.graph.getSuggestedFollowsByActor({ actor: did });

  return json({ suggestions: data.suggestions });
}
