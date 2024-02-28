require('dotenv').config();
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

export const getAuthenticatedUser = async (req: any, res: any) => {
    try {
        const user = await fetch('https://api.github.com/user', {
            method: 'GET',
            headers: {
                'Authorization': req.get('Authorization'),
            }
        }).then((response: any) => {
            return response.json();
        })

        res.json(user);
    } catch (error) {
        console.log(error);
    }
}

export const getAccessToken = async (req: any, res: any) => {
    const params = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + req.query.code;
    try {
        const token = await fetch('https://github.com/login/oauth/access_token' + params, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            }
        }).then((response: any) => {
            return response.json();
        })

        res.json(token);
    } catch (error) {
        console.log(error);
    }
}