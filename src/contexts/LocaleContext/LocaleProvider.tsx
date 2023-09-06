import * as React from "react";
import LocaleContext from "./LocaleContext";
import { toCurrency } from "@/utils/formatNumber";

interface LocaleProviderProps {
  children: React.ReactNode;
}

export interface LocaleContextValues {
  CURRENCY_SYMBOL: string;
  ISO_CURRENCY_CODE: string;
  LANGUANGE_CODE: string;
  COUNTRY_CODE: string;
  PRETROL_PRICE: number;
  numberToCurrency(value: number): string;
}

const LocaleProvider: React.FC<LocaleProviderProps> = ({ children }) => {
  const CURRENCY_SYMBOL = "MT";
  const ISO_CURRENCY_CODE = "MZN";
  const LANGUANGE_CODE = "pt";
  const COUNTRY_CODE = "MZ";
  const PRETROL_PRICE = 86.97;
  function numberToCurrency(value: number) {
    return toCurrency({
      number: value,
      locale: `${LANGUANGE_CODE}-${COUNTRY_CODE}`,
      currency: ISO_CURRENCY_CODE,
      replaceCurrency: CURRENCY_SYMBOL,
    });
  }

  const values: LocaleContextValues = {
    CURRENCY_SYMBOL,
    ISO_CURRENCY_CODE,
    LANGUANGE_CODE,
    COUNTRY_CODE,
    PRETROL_PRICE,
    numberToCurrency,
  };

  return (
    <LocaleContext.Provider value={values}>{children}</LocaleContext.Provider>
  );
};

export default LocaleProvider;
