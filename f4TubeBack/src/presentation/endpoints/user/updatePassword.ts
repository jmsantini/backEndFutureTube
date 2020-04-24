import { Request, Response } from "express";
import { UpdatePasswordUC } from "../../../business/usecase/user/updatePassword";
import { UserDB } from "../../../data/userDatabase";
import { JwtAuthorizer } from "../../lambda/services/jwtAuthorizer";
import { BcryptService } from "../../lambda/services/bcryptServices";

export const UpdatePasswordEndpoint = async (req: Request, res: Response) => {
    try {

        const oldPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword;
        const token =  req.headers.Authorization as string;

        if(oldPassword === newPassword){
            throw new Error("You cannot use the last same password!")
        }

        const updatePasswordUC = new UpdatePasswordUC(new UserDB(), new JwtAuthorizer(), new BcryptService());
        const result = await updatePasswordUC.execute({
            token,
            oldPassword,
            newPassword
        })

        res.status(200).send(result)
    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    }
}