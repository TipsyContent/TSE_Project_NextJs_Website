// Switch to Next.js fetch revalidation model.
// All caching is handled by the framework; no in-process timers/state.
export const TTL_SECONDS = 300; // 5 minutes

export async function fetchData() {
  const BASE_URL = "https://vlr.orlandomm.net/api/v1/teams/";
  const TEAM_ID = "16071";
  const url = BASE_URL + TEAM_ID;

  const response = await fetch(url, { next: { revalidate: TTL_SECONDS } });
  if (!response.ok) {
    throw new Error(`Failed to fetch data (${response.status} ${response.statusText})`);
  }
  return response.json();
}
