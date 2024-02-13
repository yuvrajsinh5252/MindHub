export const isUserAuthenticated = async (req: any, res: any, next: any) => {
    try {
        console.log(req.originalUrl);

        const routesToExclude = ['/auth/getAccessToken', '/createUser'];

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