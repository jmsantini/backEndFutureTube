import { Request, Response } from "express";
import { CreateVideoUC } from "../../../business/usecase/video/createVideo";
import { VideoDB } from "../../../data/videoDatabase";
import { JwtAuthorizer } from "../../lambda/services/jwtAuthorizer";

export const CreateVideoEndpoint = async (req: Request, res: Response) =>{
    try{
        const createVideoUC = new CreateVideoUC(new VideoDB(), new JwtAuthorizer());
        const result = await createVideoUC.execute({
            title: req.body.title,
            link: req.body.link,
            description: req.body.description,
            token: req.headers.Authorization as string
        })

        res.status(200).send(result)
    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    }
}