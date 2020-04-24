import { VideoGateway } from "../../gateways/videoGateway";
import { v4 } from 'uuid';
import { AuthenticationGateway } from "../../gateways/authenticationGateway";
import { Video } from "../../entites/video";

export class CreateVideoUC {
    constructor(
        private videoGateway: VideoGateway,
        private authenticationGateway: AuthenticationGateway 
    ){}

    public async execute(input: CreateVideoUCInput): Promise<CreateVideoUCOutput>{
        const existingVideo = await this.videoGateway.checkVideoByLink(input.link);

        if(existingVideo){
            throw new Error("Already have a vídeo with this link")
        }
        
        const id = v4();

        const userInfo = this.authenticationGateway.getUsersInfoFromToken(input.token)

        if(!userInfo){
            throw new Error("User info is wrong")
        }

        const video = new Video(
            id,
            input.title,
            input.link,
            input.description,
            new Date(),
            userInfo.id
        )

        await this.videoGateway.createVideo(video)

        return{
            message: "Video created Successfully!"
        }
    }
}

export interface CreateVideoUCInput {
    title: string;
    link: string;
    description: string;
    token: string;
}

export interface CreateVideoUCOutput{
    message: string;
}
