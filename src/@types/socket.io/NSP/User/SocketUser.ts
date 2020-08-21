export interface SocketUser {
    id: number;
    tag: string;
    gems: number;
    xp: number;
    coins: number;
    discriminator: number;
    username: string;
    email: string;
    createdAt: number;
    updateAt: number;
    [propName: string]: any;
}
