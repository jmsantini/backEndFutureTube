import { Request, Response } from "express";
import { UpdateVideoUC } from "../../../business/usecase/video/updateVideo";
import { VideoDB } from "../../../data/videoDatabase";
import { JwtAuthorizer } from "../../lambda/services/jwtAuthorizer";

export const UpdateVideoEndpoint = async (req: Request, res: Response) => {
    try {   
        const updateVideoUC = new UpdateVideoUC(new VideoDB(), new JwtAuthorizer());
        const result = await updateVideoUC.execute({
            token: req.headers.Authorization as string,
            id: req.params.id,
            title: req.body ? req.body.title : "",
            description: req.body ? req.body.description : ""
        })

        res.status(200).send(result)
    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    }
}