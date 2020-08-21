import { Service } from "typedi";
import { api } from "../lib/api";
import cache from "memory-cache";
import { ErrorAPI, Match, IResponse, GameRequest, Socket } from "socket.io";

@Service()
export class GameService {
    private matchPool: { [matchID: string]: Match } = {};
    /**
     * **Note:**  will add to creating match on API
     *
     * @param type
     * @param ids
     */
    async createMatch(
        type: number,
        ...ids: number[]
    ): Promise<Match | ErrorAPI> {
        try {
            const match: Match = (
                await api.put(`/matches`, { type, users: ids })
            ).data;
            cache.put("match.pool", [...cache.get("match.pool"), match]);
            Object.assign(match, {
                users: Object.assign({}, match.users, { ready: false }),
            });
            this.matchPool[match.id] = match;
            return match;
        } catch (e) {
            return e.response.data;
        }
    }
    async iamReadyForMatch(ctx: GameRequest): Promise<IResponse> {
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

    async matchArea(id: number, socket: Socket) {
        const match = this.matchPool[id];
        //The Rounds're going to be here
        return this.finishMatch(match, socket);
    }

    roundCreate(match: Match) {
        switch (match.type) {
            case "catch":

            case "duel":

            case "fast-typing":

            case "math":

            default:
                break;
        }
    }
    delMatch(id: number) {
        const matchPool: Match[] = cache.get("match.pool");
        cache.put(
            "match.pool",
            matchPool.filter((m) => m.id !== id),
        );
        delete this.matchPool[id];
        return true;
    }
    finishMatch(match: Match, socket: Socket) {
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
