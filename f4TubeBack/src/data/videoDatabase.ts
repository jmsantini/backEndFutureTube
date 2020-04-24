import { Video } from "../business/entites/video";
import { BaseDB } from "./baseDatabase";
import { VideoGateway } from "../business/gateways/videoGateway";
import { Feed } from "../business/entites/feed";

export class VideoDB extends BaseDB implements VideoGateway{
    private videoTableName = "videos";
    private userTableName = "user";

    private mapVideoToDbVideo(input: any): Video | undefined{
        return(
            input &&
            new Video(
                input.id,
                input.title,
                input.link,
                input.description,
                input.creationDate,
                input.user_id,
            )
        );
    };
    
    private mapFeedToDbVideo(input: any): Feed | undefined{
        return(
            input &&
            new Feed(
                input.id,
                input.title,
                input.link,
                input.description,
                input.creationDate,
                input.user_id,
                input.name,
                input.userPhoto
            )
        );
    };

    private mapDateToDbDate(input: Date): string {
        const year = input.getFullYear();
        const month = input.getMonth() + 1;
        const date = input.getDate();
        const hour = input.getHours();
        const minute = input.getMinutes();
        const second = input.getSeconds();
        return `${year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second}`;
    };

    public async checkVideoByLink(link: string): Promise<Video | undefined>{
        const result = await this.connection.raw(`
            SELECT *
            FROM ${this.videoTableName}
            WHERE link = '${link}'
        `);

        if(!result[0][0]){
            return undefined;
        }

        return await this.mapVideoToDbVideo(result[0][0])
    }

    public async createVideo(video: Video): Promise<void>{
        await this.connection.raw(`
            INSERT INTO ${this.videoTableName} (id, title, link, description, creationDate, user_id)
            VALUES(
                '${video.getId()}',
                '${video.getTitle()}',
                '${video.getLink()}',
                '${video.getDescription()}',
                STR_TO_DATE('${this.mapDateToDbDate(video.getCreationDate())}', '%Y-%m-%d %H:%i:%s'),
                '${video.getUser_id()}'
            )
        `);
    };

    public async deleteVideo(id: string, user_id: string): Promise<void>{
        await this.connection.raw(`
            DELETE FROM ${this.videoTableName}
            WHERE id = '${id}' AND user_id = '${user_id}';
        `)
    }

    public async updateVideo(id: string, user_id: string, title: string, description: string): Promise<void>{
        await this.connection.raw(`
            UPDATE ${this.videoTableName}
            SET title = '${title}', description = '${description}'
            WHERE id = '${id}' AND user_id = '${user_id}'
        `)
    }
    

    public async getVideos(): Promise<Feed[] | undefined>{
        const videos = await this.connection.raw(`
            SELECT v.*, u.name
            FROM ${this.videoTableName} v
            JOIN ${this.userTableName} u
            ON v.user_id = u.id
        `);

        if(!videos[0][0]){
            return undefined;
        };

        return await videos[0].map((video: any) => {
            return new Feed(
                video.id,
                video.title,
                video.link,
                video.description,
                video.creationDate,
                video.user_id,
                video.name,
                video.userPhoto
            );
        });
    };

    public async getAllUserVideos(id: string): Promise<Feed[] | undefined>{
        const result = await this.connection.raw(`
            SELECT v.*, u.name
            FROM ${this.videoTableName} v
            JOIN ${this.userTableName} u
            ON u.id = v.user_id
            WHERE v.user_id = '${id}'
        `)

        if(!result[0][0]){
            return undefined
        }

        return await result[0].map((video: any) => {
            return new Feed(
                video.id,
                video.title,
                video.link,
                video.description,
                video.creationDate,
                video.user_id,
                video.name,
                video.userPhoto
            );
        });
    }

    public async getVideoById(id: string): Promise<Feed | undefined>{
        const result = await this.connection.raw(`
            SELECT v.*, u.name
            FROM ${this.videoTableName} v
            JOIN ${this.userTableName} u
            ON u.id = v.user_id
            WHERE v.id = '${id}'
        `)

        if(!result[0][0]){
            return undefined;
        };

        return await this.mapFeedToDbVideo(result[0][0])
    }
}