import { filterCommitsData } from "./utils";


export async function loader() {
  const apiUrl = "https://api.github.com/repos/dubbha/remix-jokes/commits";

  const res = await fetch(apiUrl, {
    headers: {
      "Authorization": `Bearer ${process.env.GITHUB_API_TOKEN}`,
    }
  });

  const data = await res.json();

  const filteredData = filterCommitsData(data);

  return filteredData;
}
