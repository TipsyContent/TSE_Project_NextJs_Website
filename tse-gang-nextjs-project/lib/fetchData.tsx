
export async function fetchData () {
    const BASE_URL = "https://vlr.orlandomm.net/api/v1/teams/"
    const TEAM_ID = "16629"
    try {
        
    const response = await fetch(BASE_URL + TEAM_ID)
    console.log(response);
    if (!response.ok) {
        throw new Error(response.statusText);
      }
      
    const data = await response.json();
    console.log(data);
    return data

    } catch (e) {
        console.log("You goffed up");
    }   
}