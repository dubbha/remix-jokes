import type { LoaderArgs } from "@remix-run/node";

import { db } from "~/utils/db.server";

export const loader = async ({ request }: LoaderArgs) => {
  const jokes = await db.joke.findMany({
    include: { jokester: { select: { username: true } } },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  const host =
    request.headers.get("X-Forwarded-Host") ??
    request.headers.get("host");

  if (!host) {
    throw new Error("Could not determine domain URL.");
  }

  const protocol = host.includes("localhost") ? "http" : "https";
  const domain = `${protocol}://${host}`;
  const jokesUrl = `${domain}/jokes`;

  const jsonString = JSON.stringify({
    jokes: jokes.map(joke => ({
      title: joke.name,
      description: `A funny joke called ${joke.name}`,
      author: joke.jokester.username,
      pubDate: joke.createdAt.toUTCString(),
      link: `${jokesUrl}/${joke.id}`,
    }))
  });

  return new Response(jsonString, {
    headers: {
      "Cache-Control": `public, max-age=${60 * 10}, s-maxage=${60 * 60 * 24}`,
      "Content-Type": "application/json",
      "Content-Length": String(
        Buffer.byteLength(jsonString)
      )
    },
  });
};
