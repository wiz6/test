import {ApplicationError} from './ApplicationError';

export class ValidationError extends ApplicationError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}
