import {ApplicationError} from '../errors/ApplicationError';

export default (err, req, res, next) => {
  const data = {
    message: err.message,
    params: {},
    type: err.name,
  };
  if (err.params) {
    data.params = err.params;
  }
  if (err.log || !(err instanceof ApplicationError)) {
    // log error to sentry or somewhere
    console.log('Error occured: ', data);
  }
  return res.status(err.status || 500).json({
    message: err.message,
    type: err.name,
  });
};
