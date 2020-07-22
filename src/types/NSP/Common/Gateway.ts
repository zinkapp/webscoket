import { Namespace, Server, Socket } from "socket.io";
import { SocketUser } from "../User/SocketUser";

export type Event = (EventName: string, fn: () => any) => any;

export abstract class Gateway {
  constructor(
    private readonly namespace: Namespace,
    private readonly io: Server,
  ) {}

  onConnection(user: SocketUser, event: Event, socket: Socket): void {}

  onDisconnect(user: SocketUser, socket: Socket): void {}

  didDisconnect(user: SocketUser, socket: Socket): void {}
}
