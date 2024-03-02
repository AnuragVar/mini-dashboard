import Router from "express";

import { verifyJWT } from "../utils/verifyJWT.js";
import {
  addComment,
  allPosts,
  createPost,
  deletePost,
  getPost,
  getStats,
  likePost,
  updatePost,
} from "../controllers/posts.controller.js";

const router = Router();
router.route("/getStats").post(getStats);
router.route("/create-post").post(verifyJWT, createPost);
router.route("/update-post/:id").post(verifyJWT, updatePost);
router.route("/get-allposts/").get(allPosts);

router.route("/delete-post/:id").post(verifyJWT, deletePost);
router.route("/get-post/:id").post(getPost);
router.route("/like-post/:id").post(verifyJWT, likePost);
router.route("/add-comment/:id").post(verifyJWT, addComment);

export default router;
