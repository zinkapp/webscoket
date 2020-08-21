import { SocketUser } from "../User/SocketUser";

export interface MatchUser extends SocketUser {
    ready: boolean;
    socketID: string;
}

type MatchType = "duel" | "catch" | "fast-typing" | "math";

export interface MatchEntity {
    id: number;
    status: boolean;
    type: "duel" | "catch" | "fast-typing" | "math";
    users: MatchUser[];
    winner: MatchUser;
    sequence: Round[];
}

export interface Round {
    name: string;
    type: MatchType;
    data:
        | number
        | { x: number; y: number }
        | string
        | { description: string; choices: string[]; answer: string };
}
