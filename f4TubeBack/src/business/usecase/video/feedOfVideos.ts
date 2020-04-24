import { VideoGateway } from "../../gateways/videoGateway";

export class FeedOfVideosUC {
    constructor(
        private videoGateway: VideoGateway
    ){}

    private POST_PER_PAGE = 10;

    public async execute(): Promise<FeedOfVideosUCOutput>{


        const videos = await this.videoGateway.getVideos()

        if(!videos){
            throw new Error("Feed of videos are Empty")
        }

        return{
            feed: videos.map(video =>{
                return {
                    id: video.getId(),
                    title: video.getTitle(),
                    link: video.getLink(),
                    description: video.getDescription(),
                    creationDate: video.getCreationDate(),
                    user_id: video.getUser_id(),
                    name: video.getName(),
                    userPhoto: video.getUserPhoto()
                }
            })
        }
    }
}


export interface FeedOfVideosUCOutput {
    feed: FeedOfVideosUCOutputVideo[]
}

export interface FeedOfVideosUCOutputVideo{
    id: string;
    title: string;
    link: string;
    description: string;
    creationDate: Date;
    user_id: string;
    name: string;
    userPhoto: string;
}

export enum FeedOrderType {
    ASC = "ASC",
    DESC = "DESC"
}