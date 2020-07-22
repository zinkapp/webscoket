import { SocketUser } from "./User/SocketUser";
import * as AGateway from "./Common/Gateway";
import * as AModule from "./Common/Module";
import * as AService from "./Common/Service";

export namespace NSP {
  export type Event = AGateway.Event;
  export type ISocketUser = SocketUser;
  export abstract class Gateway extends AGateway.Gateway {}
  export abstract class Module extends AModule.Module {}
  export abstract class Service extends AService.Service {}
}
