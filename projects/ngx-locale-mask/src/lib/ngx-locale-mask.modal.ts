export interface DateMask {
    format: string
    timezone?: string

}
export interface CurrencyOptions {
    currency: string,
    currencyCode?: string,
    digitsInfo: string,
    localeName: string
}

export interface NumberMask {
    digitsInfo: string;

}

export interface PercentMask {
    digitsInfo: string;
}

