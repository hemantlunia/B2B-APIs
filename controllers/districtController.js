import req from "express/lib/request.js";
import District from "../models/district.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import res from "express/lib/response.js";

// add district
const addDistrict = async (req, res, next) => {
  try {
    const { districtName, state, country } = req.body;
    if (!districtName) {
      return next(new ApiError(400, "DistrictName is Required..."));
    }
    const existingDistrict = await District.findOne({ districtName });
    if (existingDistrict) {
      return next(new ApiError(400, "District Already exists..."));
    }

    const newDistrict = new District({ districtName, state, country });
    await newDistrict.save();

    return res.json(
      new ApiResponse(201, newDistrict, "District Added successfully...")
    );
  } catch (error) {
    next(new ApiError(500, "Server Error", [error.message], error.stack));
  }
};

// addbeats in district
const addBeatName = async (req, res, next) => {
  try {
    const { districtId } = req.params;
    const { beatName, area } = req.body;

    if (!beatName) {
      return next(new ApiError(400, "BeatName is required..."));
    }
    const district = await District.findById(districtId);
    if (!district) {
      return next(new ApiError(400, "District Not Found..."));
    }

    district.beat.push({ beatName, area });
    await district.save();

    return res.json(
      new ApiResponse(201, district, "BeatName Added successfully...")
    );
  } catch (error) {
    next(new ApiError(500, "Server Error", [error.message], error.stack));
  }
};

// update BeatName
const updateBeatName = async (req, res, next) => {
  try {
    const { districtNameId, beatNameId } = req.params;
    const { beatName, area } = req.body;
    const district = await District.findById(districtNameId);
    if (!district) {
      next(new ApiError(400, "District Not found..."));
    }

    const beats = district.beat.id(beatNameId);
    if (!beats) {
      return next(new ApiError(400, "Beat Not Found..."));
    }
    if (beatName) beats.beatName = beatName;
    if (area !== undefined) beats.area = area;

    await district.save();

    return res.json(
      new ApiResponse(200, district, "Beats Updates successfully...")
    );
  } catch (error) {
    next(new ApiError(500, "Server Error", [error.message], error.stack));
  }
};

// Delete BeatName
const deleteBeatName = async (req, res, next) => {
  try {
    const { districtNameId, beatNameId } = req.params;  

    const district = await District.findById(districtNameId);
    if (!district) {
      return next(new ApiError(404, "District Not Found..."));
    }

    district.beat = district.beat.filter(
      (beat) => beat._id.toString() !== beatNameId
    );
    await district.save();
    return res.json(new ApiResponse(200, district, "Beat Deleted..."));
  } catch (error) {
    next(new ApiError(500, "Server Error", [error.message], error.stack));
  }
};

// Get all district with beats
const getAllDistricts = async (req, res, next) => {
  try {
    const districts = await District.find();
    return res.json(
      new ApiResponse(200, districts, "Districts fetched successfully...")
    );
  } catch (error) {
    next(new ApiError(500, "Server Error", [error.message], error.stack));
  }
};

// exports methods
export {
  addDistrict,
  addBeatName,
  updateBeatName,
  deleteBeatName,
  getAllDistricts,
};