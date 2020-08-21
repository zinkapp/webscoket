import { Namespace, Server, Socket } from "socket.io";
import { SocketUser } from "../User/SocketUser";

export abstract class Gateway {
    constructor([propName]: any) {}

    onConnection?(socket: Socket): void {}

    onDisconnect?(socket: Socket): void {}

    didDisconnect?(socket: Socket): void {}

    [propName: string]: any | Promise<any>;
}
