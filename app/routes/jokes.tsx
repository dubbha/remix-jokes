import type { LoaderArgs } from "@remix-run/node";
import {
  Form,
  Link,
  Outlet,
  useLoaderData,
} from "@remix-run/react";

import { db } from "~/utils/db.server";
import { getUser } from "~/utils/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  const jokeListItems = await db.joke.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true },
    take: 5,
  });
  const user = await getUser(request);

  return { jokeListItems, user };
};

export default function JokesRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col min-h-[inherit]">
      <header className="py-4 border-b border-b-border">
        <div className="container flex justify-between items-center">
          <h1 className="text-5xl">
            <Link
              to="/"
              title="Remix Jokes"
              aria-label="Remix Jokes"
              className="text-foreground hover:text-foreground hover:no-underline"
            >
              <span className="sm:hidden print:hidden">🤪</span>
              <span className="hidden sm:block print:block">J🤪KES</span>
            </Link>
          </h1>
          {data.user ? (
            <div className="flex gap-4 items-center whitespace-nowrap">
              <span>{`Hi ${data.user.username}`}</span>
              <Form action="/logout" method="post">
                <button type="submit" className="button">
                  Logout
                </button>
              </Form>
            </div>
          ) : (
            <Link to="/login" className="hover-wavy">Login</Link>
          )}
        </div>
      </header>
      <main className="py-8 sm:py-12 grow shrink basis-full">
        <div className="container flex gap-4 flex-col sm:flex-row">
          <div className="max-w-[12rem]">
            <Link to=".">Get a random joke</Link>
            <p className="my-4">Here are a few more jokes to check out:</p>
            <ul className="p-3 list-disc list-inside">
              {data.jokeListItems.map(({ id, name }) => (
                <li key={id}>
                  <Link to={id} prefetch="intent">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="new" className="button">
              Add your own
            </Link>
          </div>
          <div className="flex-grow">
            <Outlet />
          </div>
        </div>
      </main>
      <footer className="pt-8 pb-4 border-t border-t-border">
        <div className="container">
          <Link reloadDocument to="/jokes.rss">
            RSS
          </Link>
          {' 🤪 '}
          <Link to="/more">
            More
          </Link>
        </div>
      </footer>
    </div>
  );
}
