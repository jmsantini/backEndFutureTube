import { Request, Response } from "express";
import { SignUpUC } from "../../../business/usecase/user/signUp";
import { UserDB } from "../../../data/userDatabase";
import { JwtAuthorizer } from "../../lambda/services/jwtAuthorizer";
import { BcryptService } from "../../lambda/services/bcryptServices";
import { RefreshTokenDB } from "../../../data/refreshTokenDataBase";

export const SignUpEndpoint = async (req: Request, res: Response) => {
    try {
        const signUpUC = new SignUpUC(new UserDB(), new JwtAuthorizer(), new BcryptService(), new RefreshTokenDB());

        const newUser = await signUpUC.execute({
            name: req.body.name,
            birthdate: req.body.birthdate,
            email: req.body.email,
            password: req.body.password,
            photo: req.body.photo,
            device: req.body.device
        });

        res.status(200).send(newUser);
    } catch(err){
        res.status(400).send({
            message: err.message
        });
    }
}