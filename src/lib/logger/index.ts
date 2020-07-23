import {Service} from "typedi"
import {LogFactory} from "./LogFactory"

type TYPE = "success"|"error"|"warn"|"awaiting"|"start"|"pause"|"complete"|"note"|"debug"

const
    TYPES = ["success","error","warn","awaiting","start","pause","complete","note","debug"],
    TYPE_COLORS = ["greenBright","redBright","yellow","blue","green","yellowBright","cyan","blue","blueBright"],
    TYPE_BADGE = {
        emojis: ["🎉","🚨","⚠️","⌛","🏁","✋","👌","📝","🐛"],
        unix: ["✔","X","⚠","...","➤","■","¤","●",""]
    }

@Service()
export class Logger {
    constructor() {
        TYPES.forEach((t,i)=>{
            this[t] = new LogFactory({
                displayBadge: true,
                displayDate: true,
                badge: TYPE_BADGE.unix[i],
                type: t,
                typeColor: TYPE_COLORS[i]
            }).log
        })
    }

    log(type:TYPE,...msg) {
        const i = TYPES.findIndex(t=>t===type)
        new LogFactory({
            displayBadge: true,
            displayDate: true,
            badge: TYPE_BADGE.unix[i],
            type,
            typeColor: TYPE_COLORS[i]
        }).log(...msg)
    }
}