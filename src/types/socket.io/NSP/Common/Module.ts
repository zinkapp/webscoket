import { Service } from "./Service";
import { Gateway } from "./Gateway";

export abstract class Module {
  constructor([propName]: any) {}
  [propName: string]: any;
  imports?: any[];
  gateways?: any[];
  providers?: any[];
  register?: (...imports) => void;
}
