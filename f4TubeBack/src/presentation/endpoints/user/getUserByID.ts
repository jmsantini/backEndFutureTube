import { Request, Response } from "express";
import { GetUserByIDUC } from "../../../business/usecase/user/getUserByID";
import { UserDB } from "../../../data/userDatabase";
import { JwtAuthorizer } from "../../lambda/services/jwtAuthorizer";

export const getUserByIDEndpoint = async (req: Request, res: Response) => {
    try {
        const getUserByIDUC = new GetUserByIDUC(new UserDB(), new JwtAuthorizer())
        const auth = req.headers.authorization || req.headers.Authorization

        if (!auth) {
            throw new Error("JWT not found")
        }

        const token = auth as string;

        const result = await getUserByIDUC.execute({
            token
        })
        res.status(200).send(result)
    } catch (err) {
        res.status(400).send({
            err: err.message
        })
    }
}