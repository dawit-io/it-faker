import type { Faker } from "@faker-js/faker";
import { CityAdapter } from '../utils/cityAdapter';
import { WeightedRandomSelector } from "../utils/weightedRandom";
import type { BirthPlace, Province } from "../types/types";
import type { ItalianCity, RawItalianCity } from "../types/city";
import { Observable, from, BehaviorSubject, of, lastValueFrom, tap } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import type { Country, RawCountry } from "../types/country";
import { CountryAdapter } from "../utils/countryAdapter";

export class PlacesModule {
    private dataSubject = new BehaviorSubject<{
        citySelector: WeightedRandomSelector<RawItalianCity>;
        citiesData: RawItalianCity[];
    } | null>(null);
    private countrySubject = new BehaviorSubject<Country[] | null>(null);

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

    private loadCountryData(): Observable<void> {
        // Check if data is already loaded
        const existingData = this.countrySubject.getValue();

        if (existingData) {
            return of(undefined);
        }
        return from(import('../data/countries.json')).pipe(
            map(module => {
                const countries = module.default.map((country: RawCountry) => CountryAdapter.toEnglish(country));
                this.countrySubject.next(countries);
            }),
            catchError(error => {
                console.error('Error loading countries:', error);
                throw new Error(`Failed to load country data: ${error.message}`);
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

    city$(options?: { region?: string; province?: string, belfioreCode?: string, cityName?: string }): Observable<ItalianCity | null> {
        return this.loadCityData().pipe(
            map(() => {
                const data = this.dataSubject.getValue();
                if (!data) {
                    throw new Error('City data not initialized');
                }

                // Search by belfioreCode (exact match)
                if (options?.belfioreCode) {
                    const city = data.citiesData.find(
                        city => city.codiceCatastale.toLowerCase() === options.belfioreCode?.toLowerCase()
                    );
                    return city ? CityAdapter.toEnglish(city) : null;
                }

                // Search by name (exact match or case-insensitive)
                if (options?.cityName) {
                    const city = data.citiesData.find(
                        city => city.nome.toLowerCase() === options.cityName?.toLowerCase()
                    );
                    return city ? CityAdapter.toEnglish(city) : null;
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

    allCities$(): Observable<ItalianCity[]> {
        return this.loadCityData().pipe(
            map(() => {
                const data = this.dataSubject.getValue();
                if (!data) {
                    throw new Error('City data not initialized');
                }
                return data.citiesData.map(city => CityAdapter.toEnglish(city));
            })
        );
    }

    mostPopulatedCities$(x: number): Observable<ItalianCity[]> {
        return this.loadCityData().pipe(
            map(() => {
                const data = this.dataSubject.getValue();
                if (!data) {
                    throw new Error('City data not initialized');
                }
                const cities = data.citiesData.map(city => CityAdapter.toEnglish(city));
                return cities.sort((a, b) => b.population - a.population).slice(0, x);
            }))
    };


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

    randomCountry$(): Observable<Country> {
        return this.loadCountryData().pipe(
            map(() => {
                const countries = this.countrySubject.getValue();
                if (!countries) throw new Error('Country data not initialized');
                return this.faker.helpers.arrayElement(countries);
            })
        );
    }

    getCountryByName$(name: string): Observable<Country | null> {
        if (!name || typeof name !== 'string') {
            return of(null);
        }

        return this.loadCountryData().pipe(
            map(() => {
                const countries = this.countrySubject.getValue();
                if (!countries || !Array.isArray(countries)) {
                    throw new Error('Country data not properly initialized');
                }

                return countries.find(country =>
                    country.nameIt.toLowerCase() === name.toLowerCase() ||
                    country.nameEn.toLowerCase() === name.toLowerCase()
                ) || null;
            }),
            catchError(error => {
                console.error('Error in getCountryByName$:', error);
                return of(null);
            })
        );
    }

    getAllCountries$(): Observable<Country[]> {
        return this.loadCountryData().pipe(
            map(() => {
                const countries = this.countrySubject.getValue();
                if (!countries) throw new Error('Country data not initialized');
                return countries;
            })
        );
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

    async city(options?: { region?: string; province?: string, belfioreCode?: string, cityName?: string }): Promise<ItalianCity | null> {
        return lastValueFrom(this.city$(options));
    }

    async allCities(): Promise<ItalianCity[]> {
        return lastValueFrom(this.allCities$());
    }

    async mostPopulatedCities(x: number): Promise<ItalianCity[]> {
        return lastValueFrom(this.mostPopulatedCities$(x));
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

    async randomCountry(): Promise<Country> {
        return lastValueFrom(this.randomCountry$());
    }

    async getCountryByName(name: string): Promise<Country | null> {
        return lastValueFrom(this.getCountryByName$(name));
    }

    async getAllCountries(): Promise<Country[]> {
        return lastValueFrom(this.getAllCountries$());
    }

    clearCache(): void {
        this.dataSubject.next(null);
        this.countrySubject.next(null);
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