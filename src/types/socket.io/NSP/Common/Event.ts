import { SocketUser } from "../User/SocketUser";
import {Socket} from "socket.io"

export interface IResponse {
  err?: {
    code: number,
    message: string
  },
  event: string,
  message: any
}

export interface IRequest {
    user: SocketUser,
    socket: Socket,
    data:any
}