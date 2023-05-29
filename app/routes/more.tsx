import { Outlet, Link } from "@remix-run/react";

export default function More () {
  return (
    <div className="m-8">
      <h1>
        <Link to="/" className="outline-none hover:no-underline">🤪</Link>
        {` More Examples`}
      </h1>
      <nav className="p-4">
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
