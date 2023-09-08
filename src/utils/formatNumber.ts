interface toCurrencyParams {
  number: number;
  locale: string;
  currency: string;
  replaceCurrency: string;
}

export function toCurrency({
  number,
  locale,
  currency,
  replaceCurrency,
}: toCurrencyParams) {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    currencyDisplay: "code", // Display currency code instead of symbol
  });

  if (replaceCurrency) {
    return formatter.format(number).replace(currency, replaceCurrency);
  }

  return formatter.format(number);
}

export function addDecimals(num: number, decimalPlaces = 2) {
  return Number(num.toFixed(decimalPlaces));
}
