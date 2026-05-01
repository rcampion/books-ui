import { Levels } from "./levels";
/**
 * Logger.
 * @public
 */
export class Logger {
    constructor(logger, category, label) {
        this._angularLogService = logger;
        this.category = category;
        this.label = label;
    }
    error(content) {
        this.genericLog(Levels.error, content);
    }
    warn(content) {
        this.genericLog(Levels.warn, content);
    }
    log(content) {
        this.genericLog(Levels.log, content);
    }
    debug(content) {
        this.genericLog(Levels.debug, content);
    }
    genericLog(level, content) {
        this._angularLogService.genericLog(level, this.category, this.label, content);
    }
    get level() {
        return this._angularLogService.level;
    }
    set level(newLevel) {
        this._angularLogService.level = newLevel;
    }
}
