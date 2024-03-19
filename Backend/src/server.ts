import { getAccessToken, getAuthenticatedUser } from "./Routes/Auth";
import { createUser, getRole, getUrl, setRole, setUrl } from "./Routes/DBfunction";
import { isAdmin } from "./middleware";

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(isAdmin);

app.get('/auth/getAccessToken', getAccessToken);
app.get('/auth/getUser', getAuthenticatedUser);
app.post('/db/createUser', createUser);
app.post('/db/getRole', getRole);
app.post('/db/setRole', setRole);
app.post('/db/creator/getUrl', getUrl);
app.post('/db/creator/setUrl', setUrl);

app.listen(8081, () => console.log('Server is running on http://localhost:8081/'));