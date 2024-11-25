import { marked } from "marked";
import { Agent, RichText, type AtpBaseClient } from "@atproto/api";
import { dev } from "$app/environment";
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { toast } from 'svelte-sonner';
import type { PostView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}


const escapeMap: Record<string, string> = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&#39;',
};

export const escapeHTML = (str?: string) =>
	str?.replace(/[&<>"']/g, (match) => escapeMap[match] || match) ?? '';


export function renderPostAsHtml(post?: PostView) {
	if (!post || !post.record) {
		return '';
	}
	const rt = new RichText(post.record as any);
	let html = '';
	for (const segment of rt.segments()) {
    if(!segment) continue;
		if (segment.isLink()) {
			html += `<a href="${escapeHTML(segment.link?.uri)}">${escapeHTML(
				segment.text
			)}</a>`;
		} else if (segment.isMention()) {
			html += `<a href="https://bsky.app/profile/${escapeHTML(
				segment.mention?.did
			)}">${escapeHTML(segment.text)}</a>`;
		} else if (segment.isTag()) {
			html += `<a href="https://bsky.app/hastag/${escapeHTML(
				segment.tag?.tag
			)}">#${escapeHTML(segment.tag?.tag)}</a>`;
		} else {
			html += escapeHTML(segment.text);
		}
	}
	return html;
}

export async function renderTextToMarkdownToHTML(text: string, agent: Agent | AtpBaseClient) {
  const rt = new RichText({ text });
  await rt.detectFacets(agent);
  let markdown = "";
  for (const segment of rt.segments()) {
    if (segment.isLink()) {
      markdown += `[${segment.text}](${segment.link?.uri})`
    } 
    else if (segment.isMention()) {
      let profile;
      if (agent instanceof Agent) {
        profile = await agent.getProfile({ actor: segment.mention?.did || "" });
      }
      else {
        profile = await agent.app.bsky.actor.getProfile({ actor: segment.mention?.did || "" });
      }
      markdown += `[${segment.text}](${dev ? "http://localhost:5173" : "https://myb.zeu.dev" }/p/${profile.data.handle})`
    } 
    else {
      markdown += segment.text
    }
  }

  const html = await marked.parse(markdown);
  return html;
}

export function toastComingSoon() {
  toast.info("Coming soon");
}

export function toastSuccess(text: string) {
  toast.success(text);
}

export function toastError(text: string) {
  toast.error(text);
}


export function numberToHumanReadable(number: number) {
  if(number < 1000) {
    return number;
  }
  if(number < 1000000) {
    return `${Math.floor(number / 1000)}k`;
  }
  return `${Math.floor(number / 1000000)}m`;
}

export function callSecondTime(fn: () => void) {
  let called = 0;
  return () => {
    if (called === 0) {
      called++;
    } else if (called === 1) {
      fn();
      called++;
    }
  }
}