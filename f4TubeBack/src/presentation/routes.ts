import express, { Request, Response } from "express";
import { SignUpEndpoint } from "./endpoints/user/signUp";
import { LoginEndpoint } from "./endpoints/user/login";
import { CreateVideoEndpoint } from "./endpoints/video/createVideo";
import { FeedOfVideosEndpoint } from "./endpoints/video/feedOfVideos";
import { GetAllUsersEndpoint } from "./endpoints/user/getAllUsers";
import { DeleteVideoEndpoint } from "./endpoints/video/deleteVideo";
import { UpdateVideoEndpoint } from "./endpoints/video/updateVideo";
import { GetVideoDetailEndpoint } from "./endpoints/video/getVideoDetail";
import { GetAllUserVideosEndpoint } from "./endpoints/video/getAllUserVideos";
import { UpdatePasswordEndpoint } from "./endpoints/user/updatePassword";
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json()); // Linha mágica (middleware)

// user
app.post("/signup", SignUpEndpoint);
app.post("/login", LoginEndpoint);
app.get("/users", GetAllUsersEndpoint);
app.post("/changePassword", UpdatePasswordEndpoint);

// video
app.post("/createVideo", CreateVideoEndpoint);
app.get("/feed", FeedOfVideosEndpoint)
app.delete("/deleteVideo/:id", DeleteVideoEndpoint);
app.post("/updateVideo/:id", UpdateVideoEndpoint);
app.get("/getVideoDetail/:id", GetVideoDetailEndpoint);
app.get("/getAllUserVideos", GetAllUserVideosEndpoint);

export default app;
