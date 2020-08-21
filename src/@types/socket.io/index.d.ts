import * as TNSP from "./NSP";
import { SocketUser } from "./NSP/User/SocketUser";

declare global {
    namespace SocketIO {
        export interface Socket {
            user?: SocketUser;
            token?: string;
            match?: TNSP.MatchEntity;
        }
        export type ISocketUser = TNSP.SocketUser;
        export interface IResponse extends TNSP.IResponse {}
        export interface IRequest extends TNSP.IRequest {}
        export interface PoolRequest extends TNSP.IRequest {}
        export interface GameRequest extends TNSP.IRequest {
            match: TNSP.MatchEntity;
        }
        export abstract class Gateway extends TNSP.Gateway {}
        export abstract class Module extends TNSP.Module {}
        export abstract class Service extends TNSP.Service {}
        export interface Match extends TNSP.MatchEntity {}
        export abstract class ErrorAPI {
            statusCode: number;
            message: string;
            error: string;
        }
    }
}
