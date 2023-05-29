import type { LinksFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import stylesUrl from "~/styles/index.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
];

export default function IndexRoute() {
  return (
    <div className="container min-h-[inherit] flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center py-12">
        <h1 className="m-0 text-center font-bold leading-[0.5] [text-shadow:0_3px_0_rgb(0_0_0_/_.75)]">
          {"Remix "}
          <span className="block text-7xl uppercase sm:text-8xl print:text-8xl lg:text-9xl
            [text-shadow:0_0.2em_0.5em_rgb(0_0_0_/_.5),0_5px_0_rgb(0_0_0_/_.75)]"
          >
            Jokes!
          </span>
        </h1>
        <nav>
          <ul className="font-display flex gap-4 text-lg/none sm:text-xl/none sm:gap-6 print:text-xl/none print:gap-6 ">
            <li>
              <Link to="jokes" className="hover-wavy">Read Jokes</Link>
            </li>
            <li>
              <Link reloadDocument to="/jokes.rss" className="hover-wavy">
                RSS
              </Link>
            </li>
            <li>
              <Link to="/more" className="hover-wavy">
                More
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
