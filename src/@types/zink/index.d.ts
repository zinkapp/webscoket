export {}

declare global  {
    namespace Zink {
        namespace Match {
            interface User extends Zink.User {
                ready: boolean;
                socketID: string;
            }
            type MatchType = "duel" | "catch" | "fast-typing" | "math";
            interface Area {
                id: number;
                status: boolean;
                type: MatchType;
                users: User[];
                winner: User;
                sequence: Round[];
            }
            interface Round {
                name: string;
                type: MatchType;
                data:
                    | number
                    | { x: number; y: number }
                    | string
                    | { description: string; choices: string[]; answer: string };
            }
            interface Request extends Zink.Request {
                match: Area;
            }
        }
        interface Request {
            user: User;
            socket: SocketIO.Socket;
            data: any;
        }
        interface Response {
            err?: {
                code: number;
                message: string;
            };
            event?: string;
            room?: string;
            message?: any;
        }
        interface User {
            id: number;
            tag: string;
            gems: number;
            xp: number;
            coins: number;
            discriminator: number;
            username: string;
            email: string;
            createdAt: number;
            updateAt: number;
        }
        abstract class Gateway {
            constructor([propName]: any);
    
            onConnection?(socket: SocketIO.Socket): void;
    
            onDisconnect?(socket: SocketIO.Socket): void;
    
            didDisconnect?(socket: SocketIO.Socket): void;
    
            [propName: string]: any | Promise<any>;
        }
        abstract class Module {
            constructor([propName]: any);
            [propName: string]: any;
            imports?: any[];
            gateways?: any[];
            providers?: any[];
            register?: (...imports) => void;
        }
        abstract class Service {
            [propName: string]: any;
        }
    }
}

