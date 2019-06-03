import getForecast from '../commands/getForecast';
import validationMiddleware from '../middlewares/validationMiddleware';
import {RouteMethods} from '../types';
import asyncHandler from './asyncHandler';

export const getForecastRoute = {
  method: RouteMethods.GET,
  middlewares: [
    validationMiddleware,
    asyncHandler(async (req, res, next) => {
      const forecast = await getForecast({
        base: req.query.baseCurrency,
        maxWaitingWeeks: req.query.maxWaitingTime,
        target: req.query.targetCurrency,
      });
      return res.status(200).json(forecast);
    }),
  ],
  name: '/getForecast',
};
