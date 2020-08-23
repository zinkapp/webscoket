import { Service } from "typedi";
import cache from "memory-cache";
import { GameService } from "../game/game.service";
import { Inject } from "../lib/decorators";

@Service()
export class PoolService {
    constructor(@Inject(()=>GameService) private GameService: GameService) {}
    public async joinPool({
        user,
        type,
    }: {
        user: Zink.User;
        type: number;
    }): Promise<Zink.Response> {
        const pool: { id: number; type: number }[] = cache.get("pool");
        const dUser = pool.find((u) => u.id === user.id);
        if (dUser)
            return {
                err: {
                    code: 400,
                    message: "Already join the pool",
                },
            };
        const matchUser = pool.find((u) => u.type === type);
        if (matchUser) {
            const match = await this.GameService.createMatch(
                type,
                matchUser.id,
                user.id,
            );
            cache.del("pool");
            cache.put(
                "pool",
                pool.filter(({ id }) => id != matchUser.id || id != user.id),
            );
            return {
                event: "zing.join",
                message: { code: 1 << 1, match },
            };
        } else pool.push({ id: user.id, type });
        return {
            event: "zing.join",
            message: { code: 1 << 0 },
        };
    }
}
