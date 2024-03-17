export const isAdmin = async (req: any, res: any, next: any) => {
    try {
        const routesToExclude = ['/auth/getAccessToken', '/db/createUser'];
        //  not to use this middleware on certain routes
        if (routesToExclude.includes(req.originalUrl)) {
            next();
            return;
        }

        const user = await fetch('https://api.github.com/user', {
            method: 'GET',
            headers: {
                'Authorization': req.get('Authorization'),
            }
        }).then((response: any) => {
            return response.json();
        })

        if (user.message === "Bad credentials") {
            res.status(401).json("User not authenticated");
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
    }
}