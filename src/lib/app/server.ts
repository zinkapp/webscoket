import * as http from "http";
import * as https from "https";
import { Config } from "../../config";
import * as IO from "socket.io";

export class ServerFactory {
  static create(
    modules?: Array<any>,
    configs: { io: any; app: any } = { io: {}, app: {} },
  ): [https.Server | http.Server, IO.Server] {
    let app: http.Server;
    if (!Config.isProd) {
      app = http.createServer(configs.app);
    }
    app = https.createServer(configs.app);
    const io = IO(app, configs[1]);
    modules.forEach((m) => {
      const ModuleInstance = new m(io);
      ModuleInstance.register();
    });
    return [app, io];
  }
}
