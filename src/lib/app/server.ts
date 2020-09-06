import "reflect-metadata";
import * as http from "http";
import { Container } from "typedi";
import { Logger } from "../logger";
import { Module } from "./module";
import { EVENTS } from "../constants";

export class ServerFactory {
    static create(
        app: http.Server,
        mod: typeof Zink.Module,
        adapter: Zink.Adapter,
        config?: Zink.ServerConfig,
    ): SocketIO.Server {
        const logger = Container.get(Logger);
        logger.log("start", "Starting Application");
        const io = adapter.create(app, config);
        io.on(EVENTS.CONNECTION, (socket: SocketIO.Socket) =>
            socket.on(EVENTS.PING, () => socket.emit(EVENTS.PONG, true)),
        );
        Module.Handler(mod, adapter, io);
        logger.log("start", "Application successfully started");
        return io;
    }
}
