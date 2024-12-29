import type { Country, RawCountry } from "../types/country";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class CountryAdapter {
    /**
     * Converts raw country data to Country
     * Used for deserialization
     */
    static toEnglish(raw: RawCountry): Country {
        return {
            continent: raw.denominazioneContinente,
            istatCode: raw.codiceIstat,
            nameIt: raw.denominazioneIt,
            nameEn: raw.denominazioneEn,
            minCode: raw.codiceMin,
            atCode: raw.codiceAt,
            unsdm49Code: raw.codiceUnsdm49,
            iso3166Alpha2: raw.codiceIso3166Alpha2,
            iso3166Alpha3: raw.codiceIso3166Alpha3
        };
    }

    /**
     * Converts Country to raw country data
     * Used for serialization
     */
    static toRaw(country: Country): RawCountry {
        return {
            denominazioneContinente: country.continent,
            codiceIstat: country.istatCode,
            denominazioneIt: country.nameIt,
            denominazioneEn: country.nameEn,
            codiceMin: country.minCode,
            codiceAt: country.atCode,
            codiceUnsdm49: country.unsdm49Code,
            codiceIso3166Alpha2: country.iso3166Alpha2,
            codiceIso3166Alpha3: country.iso3166Alpha3
        };
    }
}