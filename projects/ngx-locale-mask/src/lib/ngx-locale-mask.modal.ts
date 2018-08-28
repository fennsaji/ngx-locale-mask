export interface DateMask {
    format: string
    timezone?: string

}
export interface CurrencyMask {
    currency: string,
    currencyCode?: string,
    digitsInfo: string
}

export interface NumberMask {
    digitsInfo: string;

}

export interface PercentMask {
    digitsInfo: string;
}

