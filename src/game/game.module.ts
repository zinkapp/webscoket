import cache from "memory-cache";
import { GameService } from "./game.service";
import { GameGateway } from "./game.gateway";
import { Module } from "../lib/decorators";

@Module({
    gateways: [GameGateway],
    providers: [GameService],
})
export class GameModule implements Zink.Module {
    constructor(io: SocketIO.Server) {
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
}
