import NSP from "socket.io";
import cache from "memory-cache";
import { GameService } from "./game.service";
import { GameGateway } from "./game.gateway";

export class PoolModule implements NSP.Module {
    constructor(private io: NSP.Server) {
        io.use((socket, next) => {
            const matchPool: NSP.Match[] = cache.get("match.pool");
            const match: NSP.Match = matchPool.find(({ users }) =>
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
