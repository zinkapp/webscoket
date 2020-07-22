import { Service } from "./Service";
import { Gateway } from "./Gateway";

export abstract class Module {
  constructor([propName]: any[]) {}
  imports?: any[];
  gateways?: Gateway[];
  providers?: Service[];
  register?: () => void;
}
