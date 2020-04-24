import { Request, Response } from "express";
import { DeleteVideoUC } from "../../../business/usecase/video/deleteVideo";
import { VideoDB } from "../../../data/videoDatabase";
import { JwtAuthorizer } from "../../lambda/services/jwtAuthorizer";

export const DeleteVideoEndpoint = async (req: Request, res: Response) => {
    try {
        const deleteVideoUC = new DeleteVideoUC(new VideoDB(), new JwtAuthorizer());
        const result = await deleteVideoUC.execute({
            token: req.headers.Authorization as string,
            id: req.params.id
        })

        res.status(200).send(result)
    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    }
}