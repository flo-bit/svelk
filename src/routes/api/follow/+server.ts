/**
 * "followUser": async ({ params, locals }) => {
    const agent = locals.agent;
    if (!(agent instanceof Agent)) {
      error(401, "Need to log in to follow");
    }

    const handle = params.handle as string; 
	console.log("following", handle);
    const handleResolver = new HandleResolver({});
    const did = await handleResolver.resolve(handle);

    if (!did) { error(500, "Handle not resolved to DID"); }

    await agent.follow(did);
	console.log("followed", handle);
    return { status: "followed" };
  },
 */

import { AtpBaseClient } from "@atproto/api";
import { HandleResolver } from "@atproto/identity";
import { error, json, type RequestHandler } from "@sveltejs/kit";

// Given a cursor and limit (opt)
// Return a JSON of FeedViewPost
export const POST: RequestHandler = async ({ url, locals }) => {
  const agent = locals.agent;
  if (!agent || agent instanceof AtpBaseClient) {
    return error(401, "Unauthorized API call");
  }

  const queryParams = url.searchParams;
  const handle = queryParams.get("handle") as string;

  const handleResolver = new HandleResolver({});
  const did = await handleResolver.resolve(handle);

  if (!did) {
    return error(400, "Handle not resolved to DID");
  }

  await agent.follow(did);

  return json({ status: "followed" });
}
