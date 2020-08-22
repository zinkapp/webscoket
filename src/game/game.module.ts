import cache from "memory-cache";
import { GameService } from "./game.service";
import { GameGateway } from "./game.gateway";

export class PoolModule implements Zink.Module {
    constructor(private io: SocketIO.Server) {
        io.use((socket, next) => {
            const matchPool: Zink.Match.Area[] = cache.get("match.pool");
            const match: Zink.Match.Area = matchPool.find(({ users }) =>
                users.some(({ id }) => id == socket.user.id),
            );
            if (!match) next(new Error("Unauthorized Request"));
            socket.join(`match.${match.id}`);
            socket.to(`match.${match.id}`).emit("get.match");
            socket.match = match;
            next();
        });
    }
    gateways = [GameGateway];
    providers = [GameService];
}
