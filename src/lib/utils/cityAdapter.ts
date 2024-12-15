import { WeightedItem } from "../types/types";
import { ItalianCity, RawItalianCity } from "../types/city";

interface CityAdapterOptions {
    includeCap?: boolean;
    includeProvince?: boolean;
    includeRegion?: boolean;
}

export class CityAdapter {
    /**
     * Converts raw city data to ItalianCity
     * Used for deserialization
     * @param raw  RawItalianCity
     * @returns    ItalianCity
     * */
    static toEnglish(raw: RawItalianCity): ItalianCity {
        return {
            name: raw.nome,
            code: raw.codice,
            zone: {
                code: raw.zona.codice,
                name: raw.zona.nome
            },
            region: {
                code: raw.regione.codice,
                name: raw.regione.nome
            },
            province: {
                code: raw.provincia.codice,
                name: raw.provincia.nome
            },
            provinceCode: raw.sigla,
            belfioreCode: raw.codiceCatastale,
            postalCodes: raw.cap,
            population: raw.popolazione
        };
    }

    /**
     * Converts ItalianCity to raw city data
     * Used for serialization
     * @param city  ItalianCity
     * @returns    RawItalianCity
     * */

    static toRaw(city: ItalianCity): RawItalianCity {
        return {
            nome: city.name,
            codice: city.code,
            zona: {
                codice: city.zone.code,
                nome: city.zone.name
            },
            regione: {
                codice: city.region.code,
                nome: city.region.name
            },
            provincia: {
                codice: city.province.code,
                nome: city.province.name
            },
            sigla: city.provinceCode,
            codiceCatastale: city.belfioreCode,
            cap: city.postalCodes,
            popolazione: city.population
        };
    }

    /**
     * Converts city data for use with WeightedRandomSelector
     * Uses population as weight
     */
    static toWeightedItems(
        cities: RawItalianCity[],
    ): WeightedItem<RawItalianCity>[] {
        return cities.map(city => ({
            value: city,
            weight: city.popolazione
        }));
    }

    /**
     * Converts city data with custom formatting
     */
    static toFormattedWeightedItems(
        cities: RawItalianCity[],
        options: CityAdapterOptions = {}
    ): WeightedItem<string>[] {
        return cities.map(city => ({
            value: CityAdapter.formatCity(city, options),
            weight: city.popolazione
        }));
    }

    /**
     * Formats city data as a string
     */
    private static formatCity(city: RawItalianCity, options: CityAdapterOptions): string {
        const parts = [city.nome];

        if (options.includeProvince) {
            parts.push(`(${city.sigla})`);
        }

        if (options.includeCap) {
            parts.push(city.cap[0]);
        }

        if (options.includeRegion) {
            parts.push(city.regione.nome);
        }

        return parts.join(' ');
    }
}