import { VideoGateway } from "../../gateways/videoGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";

export class DeleteVideoUC{
    constructor(
        private videoGateway: VideoGateway,
        private authenticationGateway: AuthenticationGateway
    ){}

    public async execute(input: DeleteVideoUCInput): Promise<DeleteVideoUCOutput>{
        const userInfo = await this.authenticationGateway.getUsersInfoFromToken(input.token)

        if(!userInfo){
            throw new Error("You need to be connected to do this!")
        }

        const video = await this.videoGateway.getVideoById(input.id);

        if(!video){
            throw new Error("Video not found")
        }

        if(userInfo.id !== video.getUser_id()){
            throw new Error("You cannot delete this Video")
        }

        await this.videoGateway.deleteVideo(input.id, userInfo.id)

        return {
            message: `Video ${input.id} Deleted Successfully!`
        }

    }
}

export interface DeleteVideoUCInput{
    token: string;
    id: string;
}

export interface DeleteVideoUCOutput{
    message: string;
}