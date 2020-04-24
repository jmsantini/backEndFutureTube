export class Video{
    constructor(
        private id: string,
        private title: string,
        private link: string,
        private description: string,
        private creationDate: Date,
        private user_id: string,
    ){}
    
    public getId(): string{
        return this.id
    }

    public setId(id: string): void{
        this.id = id
    }

    public getTitle(): string{
        return this.title
    }

    public setTitle(title: string): void{
        this.title = title
    }

    public getLink(): string{
        return this.link
    }

    public setLink(link: string): void{
        this.link = link
    }

    public getDescription(): string{
        return this.description
    }

    public setDescription(description: string): void{
        this.description = description
    }

    public getCreationDate(): Date{
        return this.creationDate
    }

    public setCreationDate(creationDate: Date): void{
        this.creationDate = creationDate
    }

    public getUser_id(): string{
        return this.user_id
    }

    public setUser_id(user_id: string): void{
        this.user_id = user_id
    }

}