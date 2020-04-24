import { User } from "../entites/user";

export interface UserGateway {
    signUp(user: User): Promise<void>;
    login(email: string): Promise<User | undefined>;
    getAllUsers(): Promise<User[] | undefined>;
    getUserById(id: string): Promise<User | undefined>;
    updatePassword(id: string, password: string): Promise<void>;
}