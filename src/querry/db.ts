export async function fakeFetching() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { name: "John Doe", email: "temp34@gmail.com" };
}

export async function getUserData() {
    const response = await fetch("http://localhost:8081/getUserFromDB", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => {
        return response.json();
    })

    return response;
}