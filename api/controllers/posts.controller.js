import { Posts } from "../models/posts.models.js";
import { User } from "../models/user.models.js";
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

//get all posts
export const getStats = async (req, res) => {
  try {
    const post = await Posts.find();
    if (!post) throw new ApiError(404, "No Stats found!!");

    res
      .status(200)
      .json(new ApiResponse(200, post, "Data fetched successfully!!"));
  } catch (error) {
    throw new ApiError(500, "Something went wrong!!");
  }
};
export const allPosts = async (req, res) => {
  try {
    const posts = await Posts.find().populate("userId");
    if (!posts || posts.length === 0) {
      throw new ApiError(404, "No posts exist!!");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, posts, "Posts fetched successfully"));
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    } else {
      throw new ApiError(500, "Internal Server Error");
    }
  }
};

export const addComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const { commentText } = req.body; // Assuming the comment text is sent in the request body

    // Find the post by ID and update it to add the comment
    const updatedPost = await Posts.findByIdAndUpdate(
      postId,
      {
        $push: { comments: { text: commentText } }, // Assuming you have a 'comments' array in your Post model
      },
      { new: true } // To get the updated post after the update operation
    );

    if (!updatedPost) {
      throw new ApiError(404, "Post not found");
    }

    res.status(200).json(updatedPost); // Send the updated post as a response
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Internal Server Error");
  }
};
// creating a post

export const createPost = async (req, res) => {
  const { title, description } = req.body;

  if ([title, description, likes].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const postImagePath = req.file.path;
  const image = "";
  if (postImagePath) image = await uploadOnCloudinary(postImagePath);

  const newPost = new Posts({
    title,
    description,
    likes,
    userId: req.user,
    image,
  });

  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    throw new ApiError(500, "Internal Server Error");
  }
};

// get a post

export const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await Posts.findById(id).populate("userId");
    res.status(200).json(post);
  } catch (error) {
    throw new ApiError(500, "Internal Server Error");
  }
};

// update post
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await Posts.findById(postId);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post updated!");
    } else {
      throw new ApiError(500, "Authentication Failed");
    }
  } catch (error) {}
};

// delete a post
export const deletePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const post = await Posts.findById(id);
    if (post.userId === userId) {
      await post.deleteOne();
      res.status(200).json(new ApiResponse(200, "Post Deleted Successfully!!"));
    } else {
      throw new ApiError(403, "Action Forbidden");
    }
  } catch (error) {
    throw new ApiError(500, "Something went wrong");
  }
};

// like/dislike a post
export const likePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await Posts.findById(id);
    if (post.likes.includes(userId)) {
      await post.updateOne({ $pull: { likes: userId } });

      res.status(200).json(new ApiResponse(200, "Post disliked"));
    } else {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json(new ApiResponse(200, "Post liked"));
    }
  } catch (error) {
    throw new ApiError(500, "Something went wrong!!");
  }
};

// Get timeline posts

export const getTimelinePosts = async (req, res) => {
  const userId = req.params.id;
  try {
    const currentUserPosts = await Posts.find({ userId: userId });

    const followingPosts = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json(
      currentUserPosts
        .concat(...followingPosts[0].followingPosts)
        .sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
    );
  } catch (error) {
    throw new ApiError(500, "Something went wrong");
  }
};
