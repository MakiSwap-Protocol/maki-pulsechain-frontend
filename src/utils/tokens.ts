import { Currency } from "maki-pulsechain-sdk";

export function isDefaultTokenOrCurrency(currency?: Currency): boolean{
    return String(process.env.REACT_APP_DEFAULT_CURRENCY).normalize().toLowerCase() === currency?.symbol || 
        String(process.env.REACT_APP_DEFAULT_TOKEN).normalize().toLowerCase() === currency?.symbol;
}