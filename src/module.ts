import IO from "socket.io";
import { PoolModule } from "./pool/pool.module";

export class AppModule implements Zink.Module {
    constructor(private io: IO.Server) {}
    imports = [PoolModule];
}
