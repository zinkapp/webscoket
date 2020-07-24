import "reflect-metadata";
import * as http from "http";
import { ServerFactory } from "./lib/app";
import { AppModule } from "./module";
import { Config } from "./config";

async function main() {
  const app = http.createServer();
  const server = ServerFactory.create(app);

  new ServerFactory().init(AppModule);

  app.listen(Config.PORT, () => {
    console.log("Application starting at", Config.PORT);
  });
}

main();
