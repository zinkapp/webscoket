import * as TNSP from "./NSP"
import {SocketUser} from "./NSP/User/SocketUser"
import io from "socket.io"

declare global {
    namespace SocketIO {
        export interface Socket {
            user?: SocketUser
        }
        export type ISocketUser = TNSP.SocketUser;
        export interface IResponse extends TNSP.IResponse {}
        export interface IRequest extends TNSP.IRequest {}
        export abstract class Gateway extends TNSP.Gateway {}
        export abstract class Module extends TNSP.Module {}
        export abstract class Service extends TNSP.Service {}
    }
}