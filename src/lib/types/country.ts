export interface RawCountry {
    denominazioneContinente: string;
    codiceIstat: number;
    denominazioneIt: string;
    denominazioneEn: string;
    codiceMin: string;
    codiceAt: string;
    codiceUnsdm49: string;
    codiceIso3166Alpha2: string;
    codiceIso3166Alpha3: string;
}

export interface Country {
    continent: string;
    istatCode: number;
    nameIt: string;
    nameEn: string;
    minCode: string;
    atCode: string;
    unsdm49Code: string;
    iso3166Alpha2: string;
    iso3166Alpha3: string;
}