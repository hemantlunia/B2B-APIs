import express from "express";
import { addVersion, allVersion, checkVersion } from "../controllers/appVersionController.js";
const versionRouter = express.Router();


// check-version
versionRouter.post("/check-version", checkVersion);

// **************************************************
// add middleware so only admin can change version (LATER)
versionRouter.post("/add-version", addVersion);


// all-version fetched
versionRouter.get("/all-version",allVersion);

export default versionRouter;
