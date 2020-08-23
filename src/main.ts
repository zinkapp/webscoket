import * as http from "http";
import { ServerFactory } from "./lib/app";
import { AppModule } from "./module";
import { Config } from "./config";
import { SocketAdapter } from "./lib/adapters";

async function main() {
    const app = http.createServer();
    const io = await ServerFactory.create(app, AppModule, new SocketAdapter());

    app.listen(Config.PORT);
}

main();
