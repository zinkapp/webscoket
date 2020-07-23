import NSP from "socket.io";
import {PoolGateway} from "./gateaway"
import { Server } from "socket.io";

export class PoolModule implements NSP.Module {
    constructor(
        private io:Server
    ) {}
    gateways = [
        PoolGateway
    ]
}