export enum SupportedCurrencies {
  EUR = 'EUR',
  USD = 'USD',
}

export interface ExchangeRatesApiParams {
  startDate: string;
  endDate: string;
  base: SupportedCurrencies;
  target: SupportedCurrencies;
}

export interface ExchangeRatesRequestParams {
  maxWaitingWeeks: number;
  base: SupportedCurrencies;
  target: SupportedCurrencies;
}

export enum RouteMethods {
  GET = 'GET',
}

export interface RouteHandler {
  name: string;
  middlewares: Array<() => void>;
  method: RouteMethods;
}
