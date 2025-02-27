import semver from "semver";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Version from "../models/appVersion.model.js";

//    check version
const checkVersion = async (req, res, next) => {
  try {
    const { frontendVersion } = req.body;

    const isValidVersion = semver.valid(frontendVersion);

    if (!isValidVersion) {
        return next(new ApiError(400,"Please provide a valid Version..."));
    }

    const backendVersion = await Version.findOne().sort({ createdAt: -1 });
    if (!backendVersion) {
      return res.json(
        new ApiResponse(
          200,
          { isUpdateAvailable: false },
          "No update required..."
        )
      );
    }

    const updateType = semver.diff(frontendVersion, backendVersion.version);

    let updateMessage = "Your App is up-to-date...";
    let updateAvailable = backendVersion.updateAvailable;
    let forceUpdate = backendVersion.forceUpdate;

    if (updateType) {
      updateAvailable = true;

      switch (updateType) {
        case "major":
          updateMessage = "update is required,Please update...";
          forceUpdate = true;
          updateAvailable = true;
          break;

        case "minor":
          updateMessage = "New Feature available..update is available...";
          updateAvailable = true;
          break;

        case "patch":
          updateMessage = "small bug fix,update is available...";
          updateAvailable = true;
          break;

        default:
          updateMessage = "You do not need to update...";
          updateAvailable = true;
          break;
      }
    }

    const responseData = {
      updateMessage,
      updateAvailable,
      forceUpdate,
      updateAvailable,
      Apiversion: backendVersion.version,
      frontendVersion,
    };

    return res.json(
      new ApiResponse(200, responseData, "response send successfully")
    );
  } catch (error) {
    next(
      new ApiError(500, "ServerError while checking version", [error.message])
    );
  }
};

//   add-version
const addVersion = async (req, res, next) => {
  try {
    const { version, updateAvailable, forceUpdate, description } = req.body;
    if (!version) {
      return next(new ApiError(400, "Version is required..."));
    }

    const newVersion = await Version.create({
      version,
      updateAvailable,
      forceUpdate,
      description,
    });
    return res.json(
      new ApiResponse(200, newVersion, "New version added successfully...")
    );
  } catch (error) {
    next(
      new ApiError(500, "Error while adding backend-Version", [error.message])
    );
  }
};

//   all-version
const allVersion = async (req, res, next) => {
  try {
    const v1 = await Version.find().sort({ createdAt: -1 });
    if (v1) {
      return res.json(
        new ApiResponse(200, v1, "version fetched successfully...")
      );
    }
  } catch (error) {
    next(new ApiError(500, "Error while fetching-Version", [error.message]));
  }
};

export { checkVersion, addVersion, allVersion };
