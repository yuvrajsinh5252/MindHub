export async function fakeFetching() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { name: "John Doe", email: "temp34@gmail.com" };
}

export async function getUserData() {
    const data = await fetch("http://localhost:8081/getUserFromDB", {
        method: "GET",
        headers: {
            apllicaiton: "application/json",
        },
        body: JSON.stringify(117096680),
    }).then((res) => res.json());

    console.log(data);

    return data;
}