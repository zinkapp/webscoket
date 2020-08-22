import IO from "socket.io";
import { PoolGateway } from "./pool.gateaway";
import { PoolService } from "./pool.service";

export class PoolModule implements Zink.Module {
    constructor(private io: IO.Server) {}
    gateways = [PoolGateway];
    providers = [PoolService];
}
