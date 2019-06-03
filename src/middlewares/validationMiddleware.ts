import {ValidationError} from '../errors/ValidationError';

export default (req, res, next) => {
  const {maxWaitingTime, baseCurrency, targetCurrency} = req.query;
  if (!maxWaitingTime) {
    throw new ValidationError('Max waiting time is not set!');
  }
  if (!baseCurrency) {
    throw new ValidationError('Base currency is not set!');
  }
  if (!targetCurrency) {
    throw new ValidationError('Target currency is not set!');
  }
  if (baseCurrency === targetCurrency) {
    throw new ValidationError('Target and base currency cant be equal!');
  }
  next();
};
