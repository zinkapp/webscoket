import NSP from "socket.io";
import { PoolGateway } from "./pool.gateaway";
import { PoolService } from "./pool.service";

export class PoolModule implements NSP.Module {
    constructor(private io: NSP.Server) {}
    gateways = [PoolGateway];
    providers = [PoolService];
}
