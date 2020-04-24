import { VideoGateway } from "../../gateways/videoGateway";

export class GetVideoDetailUC {
    constructor(
        private videoGateway: VideoGateway,
    ){}

    public async execute(input: GetVideoDetailUCInput): Promise<GetVideoDetailUCOutput>{
        const video = await this.videoGateway.getVideoById(input.id);

        if(!video){
            throw new Error("Video Not found!");
        }

        return{
            id: video.getId(),
            title: video.getTitle(),
            link: video.getLink(),
            description: video.getDescription(),
            creationDate: video.getCreationDate(),
            user_id: video.getUser_id(),
            name: video.getName(),
            userPhoto: video.getUserPhoto()
        }
    }
}

export interface GetVideoDetailUCInput{
    id: string;
}

export interface GetVideoDetailUCOutput{
    id: string;
    title: string;
    link: string;
    description: string;
    creationDate: Date;
    user_id: string
    name: string;
    userPhoto: string;
}