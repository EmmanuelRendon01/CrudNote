const URL_DATA = 'http://localhost:3000/'

export async function add(data, endpoint) {
    const res = await fetch(`${URL_DATA}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })

    return await res.json();
}

export async function get(endpoint) {

    const res = await fetch(`${URL_DATA}${endpoint}`);

    return await res.json();
}
