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
            expect(city.region.name).toBe(region);
        });

        it('should return a city matching the provided province', async () => {
            const province = 'Milano';
            const city = await placesModule.city({ province });
            expect(city.province.name).toBe(province);
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

});