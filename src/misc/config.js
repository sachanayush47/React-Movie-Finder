const API_BASE_URL = "https://api.tvmaze.com/"

export default async function getAPI(queryString) {

    const respnse = await fetch(`${API_BASE_URL}${queryString}`).then(res => res.json())
    return respnse;
}