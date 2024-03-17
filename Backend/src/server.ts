import { getAccessToken, getAuthenticatedUser } from "./Routes/Auth";
import { createUser, getRole, setRole } from "./Routes/DBfunction";
import { isAdmin } from "./middleware";

const express = require('express');
const cors = require('cors');
const app = express();

app.use(isAdmin);
app.use(cors());
app.use(express.json());

app.get('/auth/getAccessToken', getAccessToken);
app.get('/auth/getUser', getAuthenticatedUser);
app.post('/db/createUser', createUser);
app.post('/db/getRole', getRole);
app.post('/db/setRole', setRole);

app.listen(8081, () => console.log('Server is running on http://localhost:8081/'));