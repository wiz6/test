export default (rates) => {
  const result = [];
  Object.keys(rates).sort().forEach((key) => {
    const [value] = Object.values(rates[key]);
    result.push({
      date: key,
      value,
    });
  });

  return result;
};
