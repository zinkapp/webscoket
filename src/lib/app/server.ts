import "reflect-metadata";
import * as http from "http";
import { Container } from "typedi";
import { Logger } from "../logger";

export class ServerFactory {
    static async create(
        app: http.Server,
        mod: any,
        adapter: Zink.Adapter,
        config?: Zink.ServerConfig,
    ): Promise<SocketIO.Server> {
        const logger = Container.get(Logger);
        logger.log("success", "Starting Application");
        const io = adapter.create(app, config);
        const moduleHandler = (mod) => {
            const Mod: Zink.IModule = {
                imports: Reflect.getMetadata("imports", mod) || [],
                gateways: Reflect.getMetadata("gateways", mod) || [],
                providers: Reflect.getMetadata("providers", mod) || [],
            };
            logger.log("success", `Mapped ${mod.name} Module`);
            Mod.gateways.forEach((g) => {
                const path: string = Reflect.getMetadata("path", g);
                const events: {
                    key: string;
                    eventName: string;
                }[] = Reflect.getMetadata("events", g);
                adapter.gatewayHandler(io, { events, path, target: g });
                logger.log("success", `Added ${g.name} Gateway {${path}}`);
                events.forEach((e) =>
                    logger.log("success", `Mapped {${e.eventName}} route`),
                );
            });
            Mod.imports.forEach((i) => moduleHandler(i));
        };
        moduleHandler(mod);
        logger.log("success", "Application successfully started");
        return io;
    }
}
