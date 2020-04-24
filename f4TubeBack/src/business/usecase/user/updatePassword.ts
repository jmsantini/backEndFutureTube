import { AuthenticationGateway } from "../../gateways/authenticationGateway";
import { CryptographyGateway } from "../../gateways/cryptographyGateway";
import { InvalidParameterError } from "../../error/InvalidParams";
import { UserGateway } from "../../gateways/UserGateway";

export class UpdatePasswordUC {
    constructor(
        private userGateway: UserGateway,
        private authenticationGateway: AuthenticationGateway,
        private cryptographyGateway: CryptographyGateway
    ){}

    public async execute(input: UpdatePasswordUCInput): Promise<UpdatePasswordUCOutput>{
        const userInfo = await this.authenticationGateway.getUsersInfoFromToken(input.token)

        if(!userInfo){
            throw new Error("User not found!")
        }

        const user = await this.userGateway.getUserById(userInfo.id)

        if(!user){
            throw new Error("User not found!")
        }

        const oldPassword = await this.cryptographyGateway.compare(input.oldPassword, user.getPassword());

        if(!oldPassword){
            throw new InvalidParameterError("Invalid password!");
        };

        const newPassword = await this.cryptographyGateway.encrypt(input.newPassword)

        await this.userGateway.updatePassword(userInfo.id, newPassword)

        return {
            message: "Password updated successfully!"
        }
    }
}

export interface UpdatePasswordUCInput{
    token: string;
    oldPassword: string;
    newPassword: string;
}

export interface UpdatePasswordUCOutput{
    message: string;
}