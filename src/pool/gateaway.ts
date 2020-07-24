import { Gateway, Event } from "../lib/decorators";
import Socket from "socket.io";

@Gateway("/pool")
export class PoolGateway implements Socket.Gateway {
  @Event("zink.ping")
  ping(socket: Socket.IRequest): Socket.IResponse {
    return {
      event: "zink.pong",
      message: true,
    };
  }
}
