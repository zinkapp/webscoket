import { Service } from "typedi";
import { api } from "../lib/api";
import * as cache from "memory-cache";
import { GatewayErrorException } from "../lib/exceptions";
import { v4 as uuidv4 } from "uuid";

@Service()
export class GameService {
    private matchPool: { [matchID: string]: Zink.Match.Area } = {};

    async createMatch(
        type: Zink.Match.MatchType,
        ...ids: string[]
    ): Promise<Zink.Match.Area> {
        try {
            const id = uuidv4();
            const match: Zink.Match.Area = (
                await api.put("/matches", { id, type, users: ids })
            ).data;
            const pool = cache.get("match.pool") || [];
            cache.del("match.pool");
            cache.put("match.pool", [...pool, match]);
            Object.assign(match, {
                users: match.users.map((u) =>
                    Object.assign(u, { ready: true }),
                ),
            });
            this.matchPool[match.id] = match;
            return match;
        } catch (e) {
            console.log(e);
            throw new GatewayErrorException(400, e.response.data);
        }
    }
    async iamReadyForMatch(ctx: Zink.Match.Request): Promise<Zink.Response> {
        const match = this.matchPool[ctx.match.id];
        match.users.map((u) =>
            u.id === ctx.user.id
                ? Object.assign(u, { socketID: ctx.socket.id, ready: true })
                : u,
        );
        if (match.users.every((u) => u.ready))
            return await this.matchArea(
                match.id,
                ctx.socket.to(`match.${match.id}`),
            );
        return {
            room: `match.${match.id}`,
            event: "waiting.match",
            message: {
                ready: match.users.filter((u) => u.ready),
                notReady: match.users.filter((u) => !u.ready),
            },
        };
    }

    async matchArea(
        id: string,
        socket: SocketIO.Socket,
    ): Promise<Zink.Response> {
        const match = this.matchPool[id];
        //The Rounds're going to be here
        return this.finishMatch(match, socket);
    }

    roundCreate(/*match: Zink.Match.Area*/): void {
        // switch (match.type) {
        //     case "catch":
        //     case "duel":
        //     case "fast-typing":
        //     case "math":
        //     default:
        //         break;
        // }
    }
    delMatch(id: string): boolean {
        const matchPool: Zink.Match.Area[] = cache.get("match.pool");
        cache.put(
            "match.pool",
            matchPool.filter((m) => m.id !== id),
        );
        delete this.matchPool[id];
        return true;
    }
    finishMatch(
        match: Zink.Match.Area,
        socket: SocketIO.Socket,
    ): Zink.Response {
        this.delMatch(match.id);
        match.users.forEach((u) =>
            socket.in(u.socketID).leave(`match.${match.id}`, () => {
                socket.in(u.socketID).emit("end.match", {
                    status: false,
                    message: "The Game Ended",
                });
            }),
        );
        return {
            room: `match.${match.id}`,
            event: "end.match",
            message: { status: false, message: "The Game ended" },
        };
    }
}
