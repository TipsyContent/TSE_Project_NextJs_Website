let lastFetched: any;
let cachedData: any;

export async function fetchData () {
    const BASE_URL = "https://vlr.orlandomm.net/api/v1/teams/"
    const TEAM_ID = "16629"
    try {
        if (cachedData && Date.now() - lastFetched < 300000) {
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
        console.log("data been cached");
        return data
    } catch (e) {
        console.log("You goffed up");
    }   
}