import { Event, Gateway } from "../lib/decorators";
import { GameService } from "./game.service";

@Gateway("/game")
export class GameGateway implements Zink.Gateway {
    constructor(private gameService: GameService) {}

    @Event("iam.ready")
    iamReady(ctx: Zink.Match.Request) {
        return this.gameService.iamReadyForMatch(ctx);
    }
}
