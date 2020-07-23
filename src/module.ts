import IO from "socket.io";
import { Server } from "socket.io";
import {PoolModule} from "./pool/module"

export class AppModule implements IO.Module {
  constructor(
    private io: Server
  ) {}
  imports = [
    PoolModule
  ]
}
