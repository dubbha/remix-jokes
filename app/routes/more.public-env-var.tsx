// https://remix.run/docs/en/main/guides/envvars
// https://remix.run/docs/en/main/guides/migrating-react-router-app#unsafe-browser-references

import { useState, useEffect } from "react";

export default function PublicEnvVar() {
  const [value, setValue] = useState('');
  useEffect(() => { // useEffect is not run on the server, avoiding hydration mismatch
    setValue(window?.ENV.PUBLIC_KEY);
  }, []);

  return (
    <>
      <h2>Public Env Var</h2>
      <div>
        Available to client:
        {' '}
        <span style={{ color: 'rgb(255, 204, 0)' }}>
          {value}
        </span>
      </div>
    </>
  );
}
