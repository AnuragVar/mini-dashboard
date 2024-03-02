import Router from "express";

import {
  createDraft,
  getAllDrafts,
  schedulePost,
  submitDrafts,
} from "../controllers/drafts.controller.js";
import { verifyJWT } from "../utils/verifyJWT.js";

const router = Router();
router.route("/getAllDrafts").get(getAllDrafts);
router.route("/createDrafts").post(createDraft);
router.route("/submitDrafts/:title").post(submitDrafts);
router.route("/schedulePost").post(schedulePost);
export default router;
