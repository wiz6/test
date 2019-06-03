import * as moment from 'moment';
import {EXCHANGE_RATES_API_DATE_FORMAT, MODES} from '../constants/prediction';
import {UnexpectedSystemError} from '../errors/UnexpectedSystemError';
import {ValidationError} from '../errors/ValidationError';
import {ExchangeRatesRequestParams} from '../types';
import {MODE_PREDICTION} from '../utils/config';
import calculate from './calculate';
import getRates from './getRates';

export default async (params: ExchangeRatesRequestParams) => {
  const startDate = moment().subtract(params.maxWaitingWeeks, 'week').format(EXCHANGE_RATES_API_DATE_FORMAT);
  const endDate = moment(new Date()).format(EXCHANGE_RATES_API_DATE_FORMAT);
  try {
    const result = await getRates({
      ...params,
      endDate,
      startDate,
    });
    if (MODE_PREDICTION === MODES.smoothing) {
      return calculate(result.data.rates, params.maxWaitingWeeks);
    }

    // as currently we have only one calculation mode then let this be also as default
    return calculate(result.data.rates, params.maxWaitingWeeks);
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new ValidationError(error.response.data.error);
    }
    throw new UnexpectedSystemError('Unexpected system error!', {
      error,
    });
  }
};
