import type { Faker } from "@faker-js/faker";
import { CityAdapter } from '../utils/cityAdapter';
import { WeightedRandomSelector } from "../utils/weightedRandom";
import type { BirthPlace, Province } from "../types/types";
import type { ItalianCity, RawItalianCity } from "../types/city";
import { Observable, from, BehaviorSubject, of, lastValueFrom } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

export class PlacesModule {
    private dataSubject = new BehaviorSubject<{
        citySelector: WeightedRandomSelector<RawItalianCity>;
        citiesData: RawItalianCity[];
    } | null>(null);

    constructor(private readonly faker: Faker) { }

    private loadCityData(): Observable<void> {
        if (this.dataSubject.getValue()) {
            return of(undefined);
        }

        return from(import('../data/cities.json')).pipe(
            map(module => {
                const citiesData = module.default as RawItalianCity[];
                const citySelector = new WeightedRandomSelector(
                    CityAdapter.toWeightedItems(citiesData)
                );

                this.dataSubject.next({
                    citySelector,
                    citiesData
                });
            }),
            catchError(error => {
                console.error('Error loading city data:', error);
                throw error;
            })
        );
    }

    randomCity$(): Observable<ItalianCity> {
        return this.loadCityData().pipe(
            map(() => this.selectItalianCity())
        );
    }

    randomCities$(count: number): Observable<ItalianCity[]> {
        return this.loadCityData().pipe(
            switchMap(() => {
                const uniqueCities = new Set<ItalianCity>();
                return new Observable<ItalianCity[]>(observer => {
                    while (uniqueCities.size < count) {
                        uniqueCities.add(this.selectItalianCity());
                    }
                    observer.next(Array.from(uniqueCities));
                    observer.complete();
                });
            })
        );
    }

    province$(): Observable<Province> {
        return this.randomCity$().pipe(
            map(randomCity => ({
                name: randomCity.province.name,
                code: randomCity.code
            }))
        );
    }

    city$(options?: { region?: string; province?: string }): Observable<ItalianCity> {
        return this.loadCityData().pipe(
            map(() => {
                const data = this.dataSubject.getValue();
                if (!data) {
                    throw new Error('City data not initialized');
                }

                if (options?.province) {
                    const filteredCities = data.citiesData.filter(
                        city => city.provincia.nome.toLowerCase() === options.province?.toLowerCase()
                    );
                    if (filteredCities.length > 0) {
                        return CityAdapter.toEnglish(this.faker.helpers.arrayElement(filteredCities));
                    }
                }

                if (options?.region) {
                    const filteredCities = data.citiesData.filter(
                        city => city.regione.nome.toLowerCase() === options.region?.toLowerCase()
                    );
                    if (filteredCities.length > 0) {
                        return CityAdapter.toEnglish(this.faker.helpers.arrayElement(filteredCities));
                    }
                }

                return this.selectItalianCity();
            })
        );
    }

    getBirthPlace$(): Observable<BirthPlace> {
        return this.randomCity$().pipe(
            map(randomCity => ({
                name: randomCity.name,
                belfioreCode: randomCity.belfioreCode,
                province: randomCity.province.name,
                region: randomCity.region.name,
                provinceCode: randomCity.provinceCode
            }))
        );
    }

    region$(): Observable<string> {
        return this.randomCity$().pipe(
            map(randomCity => randomCity.region.name)
        );
    }

    preloadData$(): Observable<void> {
        return this.loadCityData();
    }

    async randomCity(): Promise<ItalianCity> {
        return lastValueFrom(this.randomCity$());
    }

    async randomCities(count: number): Promise<ItalianCity[]> {
        return lastValueFrom(this.randomCities$(count));
    }

    async province(): Promise<Province> {
        return lastValueFrom(this.province$());
    }

    async city(options?: { region?: string; province?: string }): Promise<ItalianCity> {
        return lastValueFrom(this.city$(options));
    }

    async getBirthPlace(): Promise<BirthPlace> {
        return lastValueFrom(this.getBirthPlace$());
    }

    async region(): Promise<string> {
        return lastValueFrom(this.region$());
    }

    async preloadData(): Promise<void> {
        return lastValueFrom(this.preloadData$());
    }

    clearCache(): void {
        this.dataSubject.next(null);
    }

    private selectItalianCity(): ItalianCity {
        const data = this.dataSubject.getValue();
        if (!data) {
            throw new Error('City data not initialized');
        }
        const randomCity = data.citySelector.select();
        return CityAdapter.toEnglish(randomCity);
    }
}