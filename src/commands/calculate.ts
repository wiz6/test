import * as moment from 'moment';
import {EXCHANGE_RATES_API_DATE_FORMAT} from '../constants/prediction';
import orderRatesByDate from './orderRatesByDate';

const N = 3;

const calculateRates = (rates) => {
  const result = [];
  for (let i = 0; i <= rates.length - 2; i++) {
    const chunk = rates.slice(i, i + N);
    if (chunk.length < 3) {
      break;
    }
    result.push(chunk.reduce((sum, rate) => rate.value + sum, 0) / N);
  }
  return result;
};

const getResult = (rates, dates, maxWaitingTime) => {
  const result = [];
  for (let i = 0; i < rates.length; i++) {
    result.push({
      date: moment(dates[i + 1]).add(maxWaitingTime, 'weeks').format(EXCHANGE_RATES_API_DATE_FORMAT),
      value: rates[i],
    });
  }
  return result;
};

/**
 * Use median 3-point moving means to find forecast
 * @link https://sites.google.com/site/furthermathsu34/home/statistics/time-series
 */
export default (data, maxWaitingWeeks) => {
  const orderedRates = orderRatesByDate(data);
  const rates = calculateRates(orderedRates);
  const dates = orderedRates.map((item) => item.date);
  return getResult(rates, dates, maxWaitingWeeks);
};
