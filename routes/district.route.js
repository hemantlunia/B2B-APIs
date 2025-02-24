import express from "express";
import { addBeatName, addDistrict, deleteBeatName, getAllDistricts, updateBeatName } from "../controllers/districtController.js";

const districtRouter  = express.Router();

districtRouter.post("/add-district",addDistrict);
districtRouter.post("/:districtId/add-beat",addBeatName);
districtRouter.put("/:districtNameId/update-beat/:beatNameId",updateBeatName);
districtRouter.delete("/:districtNameId/delete-beat/:beatNameId",deleteBeatName);
districtRouter.get("/get-all-district",getAllDistricts);

export default districtRouter;