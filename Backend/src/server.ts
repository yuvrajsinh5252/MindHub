import { getAccessToken, getAuthenticatedUser } from "./Routes/Auth";
import { uploadVideo } from "./Routes/creator";
import { createUser, getRole, setRole } from "./Routes/user";
import { isAdmin } from "./middleware";

import * as multer from "multer";
import * as express from "express";
import * as cors from "cors";

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

app.get("/auth/getAccessToken", isAdmin, getAccessToken);
app.get("/auth/getUser", isAdmin, getAuthenticatedUser);
app.post("/db/createUser", isAdmin, createUser);
app.post("/db/getRole", isAdmin, getRole);
app.post("/db/setRole", isAdmin, setRole);
app.post("/db/uploadVideo", upload.any(), uploadVideo);

app.listen(8081, () =>
  console.log("Server is running on http://localhost:8081/")
);
