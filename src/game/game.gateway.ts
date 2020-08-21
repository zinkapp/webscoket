import { Event, Gateway } from "../lib/decorators";
import { GameService } from "./game.service";
import Socket from "socket.io";

@Gateway("/game")
export class GameGateway implements Socket.Gateway {
    constructor(private gameService: GameService) {}

    @Event("iam.ready")
    iamReady(ctx: Socket.GameRequest) {
        return this.gameService.iamReadyForMatch(ctx);
    }
}
