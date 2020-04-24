import { BaseDB } from "./baseDatabase";
import { User } from "../business/entites/user";
import { UserGateway } from "../business/gateways/UserGateway";

export class UserDB extends BaseDB implements UserGateway{
    private userTableName = "user"

    private mapUserToDbUser(input?: any): User | undefined{
        return(
            input &&
            new User(
                input.id,
                input.name,
                input.birthdate,
                input.email,
                input.password,
                input.photo
            )
        )
    }

    public async getUserById(id: string): Promise<User | undefined>{
        const result = await this.connection.raw(`
            SELECT *
            FROM ${this.userTableName}
            WHERE id = '${id}'
        `)

        if(!result[0][0]){
            return undefined;
        }

        return await this.mapUserToDbUser(result[0][0])
    }

    public async signUp(user: User): Promise<void> {
        await this.connection.raw(`
            INSERT INTO ${this.userTableName}(id, name, birthdate, email, password, photo)
            VALUES(
                '${user.getId()}',
                '${user.getName()}',
                '${user.getBirthdate()}',
                '${user.getEmail()}',
                '${user.getPassword()}',
                '${user.getPhoto()}'
            )
        `)
    }

    public async updatePassword(id: string, password: string): Promise<void>{
        await this.connection.raw(`
            UPDATE ${this.userTableName}
            SET password = '${password}'
            WHERE id = '${id}'
        `)
    }

    public async login(email: string): Promise<User | undefined>{
        const user = await this.connection.raw(`
            SELECT *
            FROM ${this.userTableName}
            WHERE email='${email}'
        `)

        if(!user[0][0]){
            return undefined;
        }

        return await this.mapUserToDbUser(user[0][0]);
    }

    public async getAllUsers(): Promise <User[] | undefined>{
        const users = await this.connection.raw(`
            SELECT * 
            FROM ${this.userTableName}
        `)

        if(!users[0][0]){
            return undefined;
        };

        return await users[0].map((user: any)=>{
            return new User(
                user.id,
                user.name,
                user.birthdate,
                user.email,
                user.password,
                user.photo
            )
        })
    }  
}