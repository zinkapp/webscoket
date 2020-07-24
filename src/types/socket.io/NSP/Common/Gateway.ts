import { Namespace, Server, Socket } from "socket.io";
import { SocketUser } from "../User/SocketUser";

export abstract class Gateway {
    constructor([propName]: any) {}

    onConnection?(user: SocketUser, event: string, socket: Socket): void {}

    onDisconnect?(user: SocketUser, socket: Socket): void {}

    didDisconnect?(user: SocketUser, socket: Socket): void {}

    [propName: string]: any | Promise<any>;
}
