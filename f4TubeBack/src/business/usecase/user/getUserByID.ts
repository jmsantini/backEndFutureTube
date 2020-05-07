import { UserGateway } from "../../gateways/UserGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";

export class GetUserByIDUC {
    constructor(
        private userGateway: UserGateway,
        private authenticationGateway: AuthenticationGateway
    ) { }

    public async execute(input: GetUserByIDUCInput): Promise<GetUserByIDUCOutput> {
        const userInfo = await this.authenticationGateway.getUsersInfoFromToken(input.token)
        if (!userInfo) {
            throw new Error("User not found!")
        }

        const userData = await this.userGateway.getUserById(userInfo.id)
        if (!userData) {
            throw new Error("User data not found!")
        }

        return {
            User: {
                id: userData.getId(),
                name: userData.getName(),
                birthdate: userData.getBirthdate(),
                email: userData.getEmail(),
                password: userData.getPassword(),
                photo: userData.getPhoto()
            }
        }
    }
}

export interface GetUserByIDUCInput {
    token: string;
}

export interface GetUserByIDUCOutput {
    User: GetUserByIDUCOutputUser;
}

export interface GetUserByIDUCOutputUser {
    id: string;
    name: string;
    birthdate: Date;
    email: string;
    password: string;
    photo: string;
}