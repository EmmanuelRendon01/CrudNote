export async function add(data) {
    const res = await fetch('http://localhost:3000/users', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })

    return await res.json();
}

export async function get() {

    const res = await fetch(`http://localhost:3000/users`);

    return await res.json();
}
