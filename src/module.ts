import { NSP } from "src/types/NSP";
import { Server } from "socket.io";

export class AppModule implements NSP.Module {
  constructor(public io: Server) {}
  register() {
    console.log(this.io);
  }
}
