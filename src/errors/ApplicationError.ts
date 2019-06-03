export class ApplicationError extends Error {
  public status: number;
  public log: boolean = false;
  public params;
  constructor(message) {
    super(message);

    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}
