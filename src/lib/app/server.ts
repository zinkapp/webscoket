import * as http from "http";
import * as https from "https";
import * as IO from "socket.io";
import Socket from "socket.io";
import Container from "typedi";
import { Logger } from "../logger";
import { AuthGuard } from "../auth/guard";

export class ServerFactory {
    private logger: Logger = Container.get(Logger);
    static create(
        app: https.Server | http.Server,
        config: Socket.ServerOptions = {},
    ): Socket.Server {
        const io = IO(app, config);
        Container.set("io", io);
        Container.set("app", app);
        return io;
    }
    init(Module: any) {
        const io: Socket.Server = Container.get("io");
        const app: http.Server = Container.get("app");
        const moduleInstance: Socket.Module = new Module(io);
        moduleInstance.imports.forEach((m) => {
            const nspModInstance: Socket.Module = new m(io);
            if (!nspModInstance.gateways) nspModInstance.gateways = [];
            if (!nspModInstance.providers) nspModInstance.providers = [];
            if (!nspModInstance.imports) nspModInstance.imports = [];
            nspModInstance.gateways.forEach((g) => {
                const gaInstance: Socket.Gateway = new g(
                    ...nspModInstance.providers.map((p) => Container.get(p)),
                );
                const path = Reflect.getMetadata("path", g);
                const events: Array<{
                    key: string;
                    eventName: string;
                }> = Reflect.getMetadata("events", g);
                const nsp = io.of(path);
                nsp.use(AuthGuard);
                nsp.on("connection", (socket) => {
                    socket.on("disconnect", () =>
                        gaInstance.onDisconnect(socket),
                    );
                    if (gaInstance.onConnection)
                        gaInstance.onConnection(socket);
                    socket.on("zink.ping", () =>
                        socket.emit("zink.pong", true),
                    );
                    events.forEach(({ eventName, key }) => {
                        socket.on(eventName, async (data) => {
                            try {
                                const param = {
                                    user: socket.user,
                                    socket,
                                    data,
                                };
                                Reflect.defineMetadata("param", param, g);
                                const response = await gaInstance[key](param);
                                if (response.err) {
                                    if (
                                        !(
                                            response.err.message ^
                                            response.err.code
                                        )
                                    )
                                        throw new Error(
                                            "Response Error Field Invalid",
                                        );
                                    return socket.emit("error", response.err);
                                }
                                if (!response.event)
                                    throw new Error("Response Event Not Found");
                                if (!response.message)
                                    throw new Error(
                                        "Response Message Not Found",
                                    );
                                if (response.room)
                                    return socket
                                        .to(response.room)
                                        .emit(response.event, response.message);
                                return socket.emit(
                                    response.event,
                                    response.message,
                                );
                            } catch (e) {
                                this.logger.log("error", e);
                            }
                        });
                    });
                });
            });
        });
    }
}
