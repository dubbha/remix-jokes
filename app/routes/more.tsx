import type { LinksFunction } from "@remix-run/node";
import { Outlet, Link } from "@remix-run/react";

import stylesUrl from "~/styles/more.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
];


export default function More () {
  return (
    <div className="more-layout">
      <h1>
        <Link to="/" className="more-logo-link">🤪</Link>
        {` More Examples`}
      </h1>
      <nav className="more-nav">
        <ul>
          <li><Link to="jokes.json" reloadDocument>JSON resource route</Link></li>
          <li><Link to="bff.json" reloadDocument>BFF - backend for frontend</Link></li>
          <li><Link to="public-env-var">Public Env Var</Link></li>
          <li><Link to="defer">Defer</Link></li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
