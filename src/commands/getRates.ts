import axios from 'axios';
import {ExchangeRatesApiParams} from '../types';
import {EXCHANGE_RATES_HISTORY_API_URL} from '../utils/config';

export default (params: ExchangeRatesApiParams) => {
  return axios.get(`${EXCHANGE_RATES_HISTORY_API_URL}`, {
    params: {
      base: params.base,
      end_at: params.endDate,
      start_at: params.startDate,
      symbols: params.target,
    },
    timeout: 3000,
  });
};
