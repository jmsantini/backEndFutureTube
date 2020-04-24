import { Request, Response } from "express";
import { GetAllUserUC } from "../../../business/usecase/user/getAllUsers";
import { UserDB } from "../../../data/userDatabase";
import { JwtAuthorizer } from "../../lambda/services/jwtAuthorizer";

export const GetAllUsersEndpoint = async (req: Request, res: Response) => {
    try{
        const getAllUsersUC = new GetAllUserUC(new UserDB(), new JwtAuthorizer())
        const result = await getAllUsersUC.execute({
            token: req.headers.Authorization as string
        })

        res.status(200).send(result)
    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    }
}