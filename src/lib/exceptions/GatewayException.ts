export class GatewayException {
    event: string;
    desc: string;
    name: string;
    type: string;
    constructor(eventName: string, desc: string) {
        this.event = eventName;
        this.type = "Gateway Exception";
        this.name = `Gateway ${eventName}`;
        this.desc = desc;
    }
}
