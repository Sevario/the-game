const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchPlayerSingle(id, name) {
    let url;
    console.log('API URL:', API_URL);
    if (!id && !name) {
        console.log("No id or name provided");
        return;
    }
    if (id) {
        url = `${API_URL}/api/players?name=${id}`;
    }
    else if (name) {
        url = `${API_URL}/api/players?name=${name}`;
    }
    
    console.log("Fetching:", url);
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch the player. Status: ${res.status}`);
    }
    console.log("the res:", res);
    // return res.json();
    return res.json();
}