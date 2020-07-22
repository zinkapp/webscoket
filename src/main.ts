import { ServerFactory } from "src/lib/app";
import { AppModule } from "src/module";
import { Config } from "src/config";

async function main() {
  const [app, io] = ServerFactory.create([AppModule]);

  app.listen(Config.PORT, () => {
    console.log("Application starting at", Config.PORT);
  });
}

main();
