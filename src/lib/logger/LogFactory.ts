import * as moment from "moment"
import * as chalk from "chalk"

export interface LOG_CONFIG {
    displayDate?: Boolean,
    displayBadge?: Boolean,
    typeDate?: string,
    type: string,
    typeColor: string,
    badge: string
} 

const
    DEF_LOG_CONFIG:LOG_CONFIG = {
        displayDate: true,
        displayBadge: true,
        typeDate: moment.HTML5_FMT.DATETIME_LOCAL,
        typeColor: "cyan",
        type: "success",
        badge: ""
    }

export class LogFactory {
    config = DEF_LOG_CONFIG
    constructor(config:LOG_CONFIG) {
        Object.assign(this.config,config)
    }
    log(...msg) {
        const res = []
        if(this.config.displayDate) res.push(chalk.grey(`[${moment().format(this.config.typeDate)}]`))
        if(this.config.displayBadge) res.push(chalk[this.config.typeColor](this.config.badge))
        res.push(chalk.underline[this.config.typeColor](this.config.type))
        res.push(...msg)
        return console.log(res.join(" "))
    }
}