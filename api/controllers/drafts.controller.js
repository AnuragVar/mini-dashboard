import { Draft } from "../models/drafts.models.js";
import { ApiError } from "../utils/ApiError.js";
import schedule, { scheduleJob } from "node-schedule";
export const createDraft = async (req, res) => {
  console.log(req.body);
  try {
    const newDraft = await Draft.create(req.body);
    res.status(200).json(newDraft);
  } catch (error) {
    console.log("error", error);
  }
};

export const getAllDrafts = async (req, res) => {
  const Drafts = await Draft.find();

  try {
    res.status(200).json(Drafts);
  } catch (error) {
    throw new ApiError(500, "Internal Server Error");
  }
};
export const submitDrafts = async (req, res) => {
  console.log(1);
  console.log(req.params.title);
  const { title } = req.params;
  const deletedDraft = await Draft.findOneAndDelete({ title: title });

  if (!deletedDraft) {
    // If the post with the given title is not found
    return res.status(404).json({ message: "Post not found" });
  }

  try {
    res.status(200).json("Post is deleted successfully!!");
  } catch (error) {
    throw new ApiError(500, "Internal Server Error");
  }
};
const isValidDateTime = (date, time) => {
  // Combine the date and time strings into a single string
  const dateTimeString = `${date} ${time}`;

  // Parse the combined string into a Date object
  const inputDateTime = new Date(dateTimeString);

  // Check if the parsed date is a valid date
  if (isNaN(inputDateTime.getTime())) {
    return false; // Invalid date
  }

  // Get the current date and time
  const currentDate = new Date();

  // Check if the input date and time are not less than the current date and time
  if (inputDateTime < currentDate) {
    return false; // Date and time are less than the current date and time
  }

  return true;
};
export const schedulePost = async (req, res) => {
  try {
    const { date, time, title, description } = req.body;
    console.log(req.body);
    if (!date || !time) {
      throw new ApiError(400, "Both date and time are required.");
    }

    if (!isValidDateTime(date, time)) {
      throw new ApiError(400, "Invalid or past date and time.");
    }
    const dateArray = date.split("/");
    const timeArray = time.split(":");
    console.log(dateArray, timeArray);
    const ndate = new Date(
      dateArray[0],
      dateArray[1] - 1,
      dateArray[2],
      ...timeArray
    );
    console.log(ndate);
    try {
      console.log(title, description);
      const newDraft = await Draft.create({ title, description });
      console.log(newDraft);
    } catch (error) {
      console.log("error", error);
    }
    console.log(schedule);
    console.log("schejobs",scheduleJob);

    schedule.scheduleJob(ndate, async function () {
      console.log(Date.now());
      try {
        const deletedDraft = await Draft.findOneAndDelete({
          title,
        });

        if (!deletedDraft) {
          // If the post with the given title is not found
          throw new ApiError(500, "Post not found");
        }

        res.status(200).json("Post is deleted successfully!!");
      } catch (error) {
        next(error);
      }
    });
  } catch (error) {
    console.log("error", error);
  }
};
