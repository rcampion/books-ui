import { Levels } from "./levels";
import { LoggerFactory } from "./logger-factory";

/**
 * Logger.
 * @public
 */
export class Logger {
  private _angularLogService: LoggerFactory;
  private category: string;
  private label: string | undefined;

  constructor(logger: LoggerFactory, category: string, label?: string) {
    this._angularLogService = logger;
    this.category = category;
    this.label = label;
  }

  public error(content: string): void {
    this.genericLog(Levels.error, content);
  }
  public warn(content: string): void {
    this.genericLog(Levels.warn, content);
  }
  public log(content: string): void {
    this.genericLog(Levels.log, content);
  }
  public debug(content: string): void {
    this.genericLog(Levels.debug, content);
  }

  private genericLog(level: Levels, content: string): void {
    this._angularLogService.genericLog(level, this.category, this.label, content);
  }

  get level(): Levels {
    return this._angularLogService.level;
  }
  set level(newLevel: Levels) {
    this._angularLogService.level = newLevel;
  }
}
