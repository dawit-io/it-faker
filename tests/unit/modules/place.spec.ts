import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { PlacesModule } from '../../../src/lib/modules/places.module';
import { fakerIT as faker } from '@faker-js/faker';
import { lastValueFrom } from 'rxjs';
import type { ItalianCity } from '../../../src/lib/types/city';
import type { Province } from '../../../src/lib/types/types';

describe('PlacesModule', () => {
    let placesModule: PlacesModule;

    beforeEach(() => {
        placesModule = new PlacesModule(faker);
    });

    afterEach(() => {
        placesModule.clearCache();
    });

    describe('randomCity', () => {
        it('should return a random Italian city', async () => {
            const city = await placesModule.randomCity();
            expect(city).toMatchObject<Partial<ItalianCity>>({
                name: expect.any(String),
                code: expect.any(String),
                province: {
                    name: expect.any(String),
                    code: expect.any(String),
                },
                region: {
                    name: expect.any(String),
                    code: expect.any(String),
                },
            });
        });
    });

    describe('randomCities', () => {
        it('should return an array of unique random Italian cities', async () => {
            const cities = await placesModule.randomCities(5);
            expect(cities).toHaveLength(5);
            expect(new Set(cities).size).toBe(5);
            for (const city of cities) {
                expect(city).toMatchObject<Partial<ItalianCity>>({
                    name: expect.any(String),
                    code: expect.any(String),
                    province: {
                        name: expect.any(String),
                        code: expect.any(String),
                    },
                    region: {
                        name: expect.any(String),
                        code: expect.any(String),
                    },
                });
            }
        });
    });

    describe('province', () => {
        it('should return a random Italian province', async () => {
            const province = await placesModule.province();
            expect(province).toMatchObject<Partial<Province>>({
                name: expect.any(String),
                code: expect.any(String),
            });
        });
    });

    describe('city', () => {
        it('should return a city matching the provided region', async () => {
            const region = 'Lombardia';
            const city = await placesModule.city({ region });
            expect(city?.region.name).toBe(region);
        });

        it('should return a city matching the provided province', async () => {
            const province = 'Milano';
            const city = await placesModule.city({ province });
            expect(city?.province.name).toBe(province);
        });
    });

    describe('getBirthPlace', () => {
        it('should return a valid birth place', async () => {
            const birthPlace = await placesModule.getBirthPlace();
            expect(birthPlace).toMatchObject({
                name: expect.any(String),
                belfioreCode: expect.any(String),
                province: expect.any(String),
                region: expect.any(String),
                provinceCode: expect.any(String),
            });
        });
    });

    describe('region', () => {
        it('should return a random Italian region', async () => {
            const region = await placesModule.region();
            expect(typeof region).toBe('string');
        });
    });


    describe('preloadData', () => {
        it('should preload data successfully', async () => {
            await expect(placesModule.preloadData()).resolves.toBeUndefined();
        });
    });

    describe('randomCountry', () => {
        it('should return a random country', async () => {
            const country = await placesModule.randomCountry();
            expect(country).toMatchObject({
                continent: expect.any(String),
                istatCode: expect.any(Number),
                nameIt: expect.any(String),
                nameEn: expect.any(String),
                atCode: expect.any(String),
                unsdm49Code: expect.any(String),
                iso3166Alpha2: expect.any(String),
                iso3166Alpha3: expect.any(String)
            });
        });
    });


    describe('getCountryByName', () => {
        it('should return a country by name', async () => {
            const country = await placesModule.getCountryByName('Italia');
            expect(country).toMatchObject({
                continent: expect.any(String),
                istatCode: expect.any(Number),
                nameIt: 'Italia',
                nameEn: 'Italy',
                atCode: expect.any(String),
                unsdm49Code: expect.any(String),
                iso3166Alpha2: 'IT',
                iso3166Alpha3: 'ITA'
            });
        });
    });

    describe('getAllCountries', () => {
        it('should return all countries', async () => {
            const countries = await placesModule.getAllCountries();
            expect(countries).toHaveLength(225);
            for (const country of countries) {
                expect(country).toMatchObject({
                    continent: expect.any(String),
                    istatCode: expect.any(Number),
                    nameIt: expect.any(String),
                    nameEn: expect.any(String),
                    atCode: expect.any(String),
                    unsdm49Code: expect.any(String),
                    iso3166Alpha2: expect.any(String),
                    iso3166Alpha3: expect.any(String)
                });
            }
        });
    });

    // Tests for Observable methods
    describe('randomCity$', () => {
        it('should return an Observable that emits a random Italian city', async () => {
            const city$ = placesModule.randomCity$();
            const city = await lastValueFrom(city$);
            expect(city).toMatchObject<Partial<ItalianCity>>({
                name: expect.any(String),
                code: expect.any(String),
                province: {
                    name: expect.any(String),
                    code: expect.any(String),
                },
                region: {
                    name: expect.any(String),
                    code: expect.any(String),
                },
            });
        });
    });

    describe('province$', () => {
        it('should return an Observable that emits a random Italian province', async () => {
            const province$ = placesModule.province$();
            const province = await lastValueFrom(province$);
            expect(province).toMatchObject<Partial<Province>>({
                name: expect.any(String),
                code: expect.any(String),
            });
        });
    });

    describe('city$', () => {
        it('should return an Observable that emits a city matching the provided region', async () => {
            const region = 'Lombardia';
            const city$ = placesModule.city$({ region });
            const city = await lastValueFrom(city$);
            expect(city?.region.name).toBe(region);
        });

        it('should return an Observable that emits a city matching the provided province', async () => {
            const province = 'Milano';
            const city$ = placesModule.city$({ province });
            const city = await lastValueFrom(city$);
            expect(city?.province.name).toBe(province);
        });
    });

    describe('allCities$', () => {
        it('should return an Observable that emits all Italian cities', async () => {
            const cities$ = placesModule.allCities$();
            const cities = await lastValueFrom(cities$);
            for (const city of cities) {
                expect(city).toMatchObject<Partial<ItalianCity>>({
                    name: expect.any(String),
                    code: expect.any(String),
                    province: {
                        name: expect.any(String),
                        code: expect.any(String),
                    },
                    region: {
                        name: expect.any(String),
                        code: expect.any(String),
                    },
                });
            }
        });
    });

    describe('mostPopulatedCities$', () => {
        it('should return an Observable that emits the most populated Italian cities', async () => {
            const cities$ = placesModule.mostPopulatedCities$(100);
            const cities = await lastValueFrom(cities$);
            expect(cities).toHaveLength(100);
            let previousPopulation = Number.MAX_SAFE_INTEGER;
            for (const city of cities) {
                expect(city.population).toBeLessThanOrEqual(previousPopulation);
                previousPopulation = city.population;
            }
        });
    });

    describe('mostPopulatedCities', () => {
        it('should return the most populated Italian cities', async () => {
            const cities = await placesModule.mostPopulatedCities(100);
            expect(cities).toHaveLength(100);
            let previousPopulation = Number.MAX_SAFE_INTEGER;
            for (const city of cities) {
                expect(city.population).toBeLessThanOrEqual(previousPopulation);
                previousPopulation = city.population;
            }
        });
    });

    describe('allCities', () => {
        it('should return an array of all Italian cities', async () => {
            const cities = await placesModule.allCities();
            for (const city of cities) {
                expect(city).toMatchObject<Partial<ItalianCity>>({
                    name: expect.any(String),
                    code: expect.any(String),
                    province: {
                        name: expect.any(String),
                        code: expect.any(String),
                    },
                    region: {
                        name: expect.any(String),
                        code: expect.any(String),
                    },
                });
            }
        });
    });


    describe('getBirthPlace$', () => {
        it('should return an Observable that emits a valid birth place', async () => {
            const birthPlace$ = placesModule.getBirthPlace$();
            const birthPlace = await lastValueFrom(birthPlace$);
            expect(birthPlace).toMatchObject({
                name: expect.any(String),
                belfioreCode: expect.any(String),
                province: expect.any(String),
                region: expect.any(String),
                provinceCode: expect.any(String),
            });
        });
    });

    describe('region$', () => {
        it('should return an Observable that emits a random Italian region', async () => {
            const region$ = placesModule.region$();
            const region = await lastValueFrom(region$);
            expect(typeof region).toBe('string');
        });
    });

    describe('preloadData$', () => {
        it('should return an Observable that emits undefined', async () => {
            await expect(lastValueFrom(placesModule.preloadData$())).resolves.toBeUndefined();
        });
    });

    describe('randomCountry$', () => {
        it('should return an Observable that emits a random country', async () => {
            const country$ = placesModule.randomCountry$();
            const country = await lastValueFrom(country$);
            expect(country).toMatchObject({
                continent: expect.any(String),
                istatCode: expect.any(Number),
                nameIt: expect.any(String),
                nameEn: expect.any(String),
                atCode: expect.any(String),
                unsdm49Code: expect.any(String),
                iso3166Alpha2: expect.any(String),
                iso3166Alpha3: expect.any(String)
            });
        });
    });

    describe('getCountryByName$', () => {
        it('should return an Observable that emits a country by name', async () => {
            const country$ = placesModule.getCountryByName$('Italia');
            const country = await lastValueFrom(country$);
            expect(country).toMatchObject({
                continent: expect.any(String),
                istatCode: expect.any(Number),
                nameIt: 'Italia',
                nameEn: 'Italy',
                atCode: expect.any(String),
                unsdm49Code: expect.any(String),
                iso3166Alpha2: 'IT',
                iso3166Alpha3: 'ITA'
            });
        });
    });

    describe('getAllCountries$', () => {
        it('should return an Observable that emits all countries', async () => {
            const countries$ = placesModule.getAllCountries$();
            const countries = await lastValueFrom(countries$);
            expect(countries).toHaveLength(225);
            for (const country of countries) {
                expect(country).toMatchObject({
                    continent: expect.any(String),
                    istatCode: expect.any(Number),
                    nameIt: expect.any(String),
                    nameEn: expect.any(String),
                    atCode: expect.any(String),
                    unsdm49Code: expect.any(String),
                    iso3166Alpha2: expect.any(String),
                    iso3166Alpha3: expect.any(String)
                });
            }
        });
    });

});