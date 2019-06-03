import calculate from '../src/commands/calculate';

describe('test calculate forecast with 3-point moving method', function () {
  it('test calculation is valid', () => {
    const maxWaitingTime = 2;

    const rates = {
      '2019-05-24': { USD: 1 },
      '2019-05-31': { USD: 2 },
      '2019-05-21': { USD: 3 },
      '2019-05-20': { USD: 7 },
      '2019-05-27': { USD: 1 },
      '2019-05-23': { USD: 2 },
      '2019-05-22': { USD: 15 },
      '2019-05-30': { USD: 6 },
      '2019-05-28': { USD: 2 },
      '2019-05-29': { USD: 8 }
    };

    expect(calculate(rates, maxWaitingTime)).toEqual([
      { date: '2019-06-04', value: 8.333333333333334 },
      { date: '2019-06-05', value: 6.666666666666667 },
      { date: '2019-06-06', value: 6 },
      { date: '2019-06-07', value: 1.3333333333333333 },
      { date: '2019-06-10', value: 1.3333333333333333 },
      { date: '2019-06-11', value: 3.6666666666666665 },
      { date: '2019-06-12', value: 5.333333333333333 },
      { date: '2019-06-13', value: 5.333333333333333 }
    ]);
  });

  it('test that input rates are empty', () => {
    expect(calculate([], 1)).toEqual([]);
  });
});
