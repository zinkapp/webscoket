export class ErrorException {
    desc: any;
    name: string;
    type: string;
    code: number;
    constructor(code: number, desc: string = "") {
        this.desc = desc;
        this.type = "Gateway Exception";
        this.name = "Gateway Error";
        this.code = code;
    }
}
