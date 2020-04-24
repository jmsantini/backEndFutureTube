import { VideoGateway } from "../../gateways/videoGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";
import { Feed } from "../../entites/feed";

export class GetAllUserVideosUC {
    constructor(
        private videoGateway: VideoGateway,
        private authenticationGateway: AuthenticationGateway
    ){}

    public async execute(input: GetAllUserVideosUCInput): Promise<GetAllUserVideosUCOuput>{
        const userInfo = await this.authenticationGateway.getUsersInfoFromToken(input.token)
        
        let videos: Feed[] | undefined;

        if(!userInfo){
            throw new Error("User not found!")
        }

        if(input.id){
            videos = await this.videoGateway.getAllUserVideos(input.id)
            
        } else if (!input.id){
            videos = await this.videoGateway.getAllUserVideos(userInfo.id)
        }

        if(!videos) {
            throw new Error("Video not Found")
        }

        return{
            videos: videos.map(video => {
                return {
                    id: video.getId(),
                    title: video.getTitle(),
                    link: video.getLink(),
                    description: video.getDescription(),
                    creationDate: video.getCreationDate(),
                    user_id: video.getUser_id(),
                    name: video.getName(),
                }
            })
        }
        
    }
}

export interface GetAllUserVideosUCInput {
    token: string;
    id: string;
}

export interface GetAllUserVideosUCOuput {
    videos: GetAllUserVideosUCOutputVideo[]
}

export interface GetAllUserVideosUCOutputVideo {
    id: string;
    title: string;
    link: string;
    description: string;
    creationDate: Date;
    user_id: string;
    name: string;
}