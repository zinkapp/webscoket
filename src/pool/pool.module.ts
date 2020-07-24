import NSP from "socket.io";
import { Server } from "socket.io";
import { PoolGateway } from "./pool.gateaway";
import {} from "./pool.service";

export class PoolModule implements NSP.Module {
    constructor(private io: Server) {}
    gateways = [PoolGateway];
    providers: [];
}
