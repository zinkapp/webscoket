import * as http from "http";
import { ServerFactory } from "./lib/app";
import { AppModule } from "./module";
import { Config } from "./config";
import { SocketAdapter } from "./lib/adapters";
import Container from "typedi";
import { Logger } from "./lib/logger";

async function main() {
    const logger = Container.get(Logger);
    const app = http.createServer((req, res) => {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.write(`Cannot ${req.method.toUpperCase()} ${req.url}`);
        res.end();
    });
    ServerFactory.create(app, AppModule, new SocketAdapter());

    await app.listen(Config.PORT, () => {
        logger.log("start", `Application started at ${Config.PORT}`);
    });
}

main();
