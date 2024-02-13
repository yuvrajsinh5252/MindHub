import { getAccessToken, getAuthenticatedUser } from "./utils/Auth";
import { createUser } from "./utils/DBfunction";
import {isUserAuthenticated} from "./middleware";

const express = require('express');
const cors = require('cors');
const app = express();

app.use(isUserAuthenticated);
app.use(cors());
app.use(express.json());

app.get('/auth/getAccessToken', getAccessToken);
app.get('/auth/getUser', getAuthenticatedUser);
app.post('/createUser', createUser);

app.listen(8081, () => console.log('Server started!'));