import { describe, it, expect } from 'vitest';
import { CityAdapter } from '../../../src/lib/utils/cityAdapter';
import type { ItalianCity, RawItalianCity } from '../../../src/lib/types/city';

describe('CityAdapter', () => {
    const rawCity: RawItalianCity = {
        nome: 'Milano',
        codice: '015146',
        zona: {
            codice: '1',
            nome: 'Nord-ovest'
        },
        regione: {
            codice: '03',
            nome: 'Lombardia'
        },
        provincia: {
            codice: '015',
            nome: 'Milano'
        },
        sigla: 'MI',
        codiceCatastale: 'F205',
        cap: ['20121', '20122', '20123'],
        popolazione: 1352000
    };

    const italianCity: ItalianCity = {
        name: 'Milano',
        code: '015146',
        zone: {
            code: '1',
            name: 'Nord-ovest'
        },
        region: {
            code: '03',
            name: 'Lombardia'
        },
        province: {
            code: '015',
            name: 'Milano'
        },
        provinceCode: 'MI',
        belfioreCode: 'F205',
        postalCodes: ['20121', '20122', '20123'],
        population: 1352000
    };

    describe('toEnglish', () => {
        it('should convert RawItalianCity to ItalianCity', () => {
            expect(CityAdapter.toEnglish(rawCity)).toEqual(italianCity);
        });
    });

    describe('toRaw', () => {
        it('should convert ItalianCity to RawItalianCity', () => {
            expect(CityAdapter.toRaw(italianCity)).toEqual(rawCity);
        });
    });

    describe('toWeightedItems', () => {
        it('should convert RawItalianCity array to WeightedItem array', () => {
            const weightedItems = CityAdapter.toWeightedItems([rawCity]);
            expect(weightedItems).toEqual([
                {
                    value: rawCity,
                    weight: rawCity.popolazione
                }
            ]);
        });
    });

    describe('toFormattedWeightedItems', () => {
        it('should convert RawItalianCity array to WeightedItem array with formatted city names', () => {
            const weightedItems = CityAdapter.toFormattedWeightedItems([rawCity], {
                includeProvince: true,
                includeCap: true,
                includeRegion: true
            });
            expect(weightedItems).toEqual([
                {
                    value: 'Milano (MI) 20121 Lombardia',
                    weight: rawCity.popolazione
                }
            ]);
        });

        it('should format city names according to provided options', () => {
            const weightedItems1 = CityAdapter.toFormattedWeightedItems([rawCity], {
                includeProvince: true
            });
            expect(weightedItems1[0].value).toBe('Milano (MI)');

            const weightedItems2 = CityAdapter.toFormattedWeightedItems([rawCity], {
                includeCap: true
            });
            expect(weightedItems2[0].value).toBe('Milano 20121');

            const weightedItems3 = CityAdapter.toFormattedWeightedItems([rawCity], {
                includeRegion: true
            });
            expect(weightedItems3[0].value).toBe('Milano Lombardia');
        });
    });
});