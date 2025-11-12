let lastFetched: any;
let cachedData: any;
// timer reference for auto-update scheduling
let refreshTimer: ReturnType<typeof setTimeout> | null = null;

// forceRefresh flag so scheduled updates bypass cache guard
export async function fetchData (forceRefresh = false) { 
    const BASE_URL = "https://vlr.orlandomm.net/api/v1/teams/"
    const TEAM_ID = "16629"
    try {
        // skip cache guard only when auto-refresh requests data.
        if (!forceRefresh && cachedData && Date.now() - lastFetched < 3600000) { 
            console.log("Tried To Fetch before 5 min CD");
            return cachedData;
        }

       
        const response = await fetch(BASE_URL + TEAM_ID)
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response.json();
        
        cachedData = data;
        lastFetched = Date.now();
        if (refreshTimer) { // clear scheduled refresh to avoid overlapping timers
            clearTimeout(refreshTimer);
        }
        refreshTimer = setTimeout(() => { // schedule next auto-refresh when cache TTL expires
            fetchData(true).catch((error) => console.error("Auto refresh failed", error)); // force refresh and surface failures for debugging
        }, 3600000); // reuse existing 5 minute window for automatic updates
        console.log("data been cached");
        return data
    } catch (e) {
        console.log("You goffed up");
    }   


}
