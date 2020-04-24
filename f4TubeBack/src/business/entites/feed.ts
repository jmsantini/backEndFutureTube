import { Video } from "./video";

export class Feed extends Video{
    constructor(
        id: string,
        title: string,
        link: string,
        description: string,
        creationDate: Date,
        user_id: string,
        private name: string,
        private userPhoto: string
    ){
        super(id, title, link, description, creationDate, user_id)
    }

    public getName(): string{
        return this.name;
    };

    public setName(name: string): void{
        this.name = name;
    };

    public getUserPhoto(): string{
        return this.userPhoto;
    }

    public setUserPhoto(userPhoto: string): void{
        this.userPhoto = userPhoto;
    }
}