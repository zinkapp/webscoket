import { Gateway, Event } from "../lib/decorators";
import { PoolService } from "./pool.service";
@Gateway("/pool")
export class PoolGateway implements Zink.Gateway {
    constructor(private poolService: PoolService) {}

    @Event("join.pool")
    async joinPool(socket: Zink.Request): Promise<Zink.Response> {
        return await this.poolService.joinPool({
            user: socket.user,
            type: socket.data.type,
        });
    }
}
