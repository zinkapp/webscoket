import { Event, Gateway } from "../lib/decorators";
import { GameService } from "./game.service";

@Gateway("/game")
export class GameGateway implements Zink.Gateway {
    constructor(private gameService: GameService) {}

    @Event("iam.ready")
    async iamReady(ctx: Zink.Match.Request): Promise<Zink.Response> {
        return await this.gameService.iamReadyForMatch(ctx);
    }
}
