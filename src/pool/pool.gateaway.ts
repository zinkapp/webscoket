import { Gateway, Event } from "../lib/decorators";
import Socket from "socket.io";
import { PoolService } from "./pool.service";
@Gateway("/pool")
export class PoolGateway implements Socket.Gateway {
    constructor(private poolService: PoolService) {}

    @Event("join.pool")
    async joinPool(socket: Socket.IRequest): Promise<Socket.IResponse> {
        return await this.poolService.joinPool({
            user: socket.user,
            type: socket.data.type,
        });
    }
}
