import {ApplicationError} from './ApplicationError';

export class UnexpectedSystemError extends ApplicationError {
  constructor(message, params = {}) {
    super(message);
    this.status = 500;
    this.log = true;
    this.params = params;
  }
}
