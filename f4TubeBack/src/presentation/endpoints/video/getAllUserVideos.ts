import { Request, Response } from "express";
import { GetAllUserVideosUC } from "../../../business/usecase/video/getAllUserVideos";
import { VideoDB } from "../../../data/videoDatabase";
import { JwtAuthorizer } from "../../lambda/services/jwtAuthorizer";

export const GetAllUserVideosEndpoint = async (req: Request, res: Response) => {
    try{

        const getAllUserVideosUC = new GetAllUserVideosUC(new VideoDB, new JwtAuthorizer())
        const result = await getAllUserVideosUC.execute({
            token: req.headers.Authorization as string,
            id: req.query ? req.query.id : ""
        })

        res.status(200).send(result)
    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    }
}