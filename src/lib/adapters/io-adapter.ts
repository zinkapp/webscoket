import { Container } from "typedi";
import * as IO from "socket.io";
import * as http from "http";
import { Logger } from "../logger";
import { ErrorException } from "../exceptions/ErrorException";
import { GatewayException } from "../exceptions/GatewayException";

export class SocketAdapter implements Zink.Adapter {
    private logger: Logger = Container.get(Logger);
    public create(
        app: http.Server,
        options?: Zink.ServerConfig,
    ): SocketIO.Server {
        if (!options) return IO(app);
        const { server, ...opts } = options;

        return server || IO(app, opts);
    }
    public gatewayHandler(io: SocketIO.Server, gateway) {
        const ga: Zink.Gateway = Container.get(gateway.target);
        const path: string = Reflect.getMetadata("path", gateway.target);
        const events: Array<{
            key: string;
            eventName: string;
        }> = Reflect.getMetadata("events", gateway.target);
        const nsp = io.of(path);
        nsp.on("connection", (socket) => {
            socket.on("disconnect", () =>
                typeof ga.onDisconnect === "function"
                    ? ga.onDisconnect(socket)
                    : null,
            );
            socket.on("zink.ping", () => socket.emit("zink.pong", true));
            this.eventHandler(socket, events, ga);
        });
    }

    public eventHandler(
        socket: SocketIO.Socket,
        events: { key: string; eventName: string }[],
        gateway: Zink.Gateway,
    ) {
        events.forEach(({ eventName, key }) => {
            socket.on(eventName, async (data) => {
                try {
                    const params = {
                        user: socket.user,
                        socket,
                        data,
                    };
                    const response = await gateway[key](params);
                    if (!response.event)
                        throw new Error("Response Event Not Found");
                    if (!response.message)
                        throw new Error("Response Message Not Found");
                    if (response.room)
                        return socket
                            .to(response.room)
                            .emit(response.event, response.message);
                    return socket.emit(response.event, response.message);
                } catch (e) {
                    if (e instanceof ErrorException)
                        return socket.emit("error", e.desc);
                    if (e instanceof GatewayException)
                        return socket.emit(e.event, e.desc);
                    return this.logger.log("error", e);
                }
            });
        });
    }
}
