import { error, type Actions } from "@sveltejs/kit";
import { HandleResolver } from "@atproto/identity";
import type { PageServerLoadEvent } from "./$types";
import { Agent } from "@atproto/api";
import { renderTextToMarkdownToHTML } from "$lib/utils";

export async function load({ locals, params }: PageServerLoadEvent) {
  const agent = locals.agent;
  if (!agent) { error(500, { message: "Agent not found" }); }
  const user = locals.user;

	if (agent instanceof Agent) {
		const follows = await agent.getFollows({ actor: user.did, limit: 100 });
		for(let follow of follows.data.follows) {
			follow.html = await renderTextToMarkdownToHTML(follow.description ?? '', agent);
		}
		return { follows: follows.data.follows }
	}
  return { follows: [] }
}

export const actions: Actions = {
  "followUser": async ({ params, locals }) => {
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
  "unfollowUser": async ({ locals, request }) => {
    const agent = locals.agent;
    if (!(agent instanceof Agent)) {
      error(401, "Need to log in to follow");
    }

    const formData = await request.formData();
    const followUri = formData.get("follow_uri") as string;

    if (!followUri) {
      error(500, "No follow URI to delete");
    }

    try {
      await agent.deleteFollow(followUri);
      return { status: "deletedFollow" };
    }
    catch {
      error(500, "Internal error");
    }
  }
}

