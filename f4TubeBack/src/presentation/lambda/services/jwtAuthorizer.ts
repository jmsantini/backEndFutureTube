import * as jwt from "jsonwebtoken";
import { AuthenticationGateway, UsersInfoForToken } from "../../../business/gateways/authenticationGateway";

export class JwtAuthorizer implements AuthenticationGateway {
    private JWT_SECRET: string = process.env.JWT_SECRET || "";

    public generateToken(input: UsersInfoForToken, expiresIn: string): string {
        const token = jwt.sign(
            {
            id: input.id,
            },
            this.JWT_SECRET,
            {
            expiresIn
            }
        );
    
        return token;
    }
    
    public getUsersInfoFromToken(token: string): UsersInfoForToken {

        const result = jwt.verify(token, this.JWT_SECRET) as UsersInfoForToken; // userId, type
        return {
            id: result.id,
            userDevice: result.userDevice
        };
    }
}