import { Faker } from "@faker-js/faker";
import { RegionalLastName } from "../types/types";
import { Observable, from, forkJoin, BehaviorSubject, of } from 'rxjs';
import { map, tap, switchMap, catchError } from 'rxjs/operators';

export class LastNameSelector {
    private readonly REGIONAL_WEIGHT = 0.5;
    private dataSubject = new BehaviorSubject<{
        regionMap: Map<string, RegionalLastName[]>;
        provinceMap: Map<string, RegionalLastName>;
        fallbackSurnames: string[];
    } | null>(null);

    constructor(private readonly faker: Faker) {}

    private loadRegionalData(): Observable<RegionalLastName[]> {
        return from(import('../data/lastNamesByProvince.json')).pipe(
            map(module => module.default as RegionalLastName[]),
            catchError(error => {
                console.error('Error loading regional data:', error);
                return of([]);
            })
        );
    }

    private loadFallbackData(): Observable<string[]> {
        return from(import('../data/lastNames.json')).pipe(
            map(module => module.default as string[]),
            catchError(error => {
                console.error('Error loading fallback data:', error);
                return of([]);
            })
        );
    }

    private initializeMaps(): Observable<void> {
        if (this.dataSubject.getValue()) {
            return of(undefined);
        }

        return forkJoin({
            regionalData: this.loadRegionalData(),
            fallbackData: this.loadFallbackData()
        }).pipe(
            map(({ regionalData, fallbackData }) => {
                const regionMap = new Map<string, RegionalLastName[]>();
                const provinceMap = new Map<string, RegionalLastName>();

                regionalData.forEach(data => {
                    if (!regionMap.has(data.region)) {
                        regionMap.set(data.region, []);
                    }
                    regionMap.get(data.region)?.push(data);
                    provinceMap.set(data.province.toLowerCase(), data);
                });

                this.dataSubject.next({
                    regionMap,
                    provinceMap,
                    fallbackSurnames: fallbackData
                });
            })
        );
    }

    select(options?: { region?: string; province?: string }): Observable<string> {
        return this.initializeMaps().pipe(
            switchMap(() => {
                const data = this.dataSubject.getValue();
                if (!data) {
                    throw new Error('Data not initialized');
                }

                if (!options) {
                    return of(this.faker.helpers.arrayElement(data.fallbackSurnames));
                }

                let localSurnames: string[] = [];

                if (options.province) {
                    const provinceData = data.provinceMap.get(options.province.toLowerCase());
                    if (provinceData) {
                        localSurnames = provinceData.surnames;
                    }
                } else if (options.region) {
                    const regionData = data.regionMap.get(options.region);
                    if (regionData) {
                        localSurnames = regionData.flatMap(data => data.surnames);
                    }
                }

                if (localSurnames.length === 0) {
                    return of(this.faker.helpers.arrayElement(data.fallbackSurnames));
                }

                const useLocal = this.faker.number.float({ min: 0, max: 1 }) < this.REGIONAL_WEIGHT;

                if (useLocal) {
                    return of(this.faker.helpers.arrayElement(localSurnames));
                } else {
                    return of(this.faker.helpers.arrayElement(data.fallbackSurnames));
                }
            })
        );
    }

    preloadData(): Observable<void> {
        return this.initializeMaps();
    }

    clearCache(): void {
        this.dataSubject.next(null);
    }
}

// Example usage:
/*
const lastNameSelector = new LastNameSelector(faker);

// Select a lastname
lastNameSelector.select({ region: 'Lombardia' }).subscribe(
    lastname => console.log('Selected lastname:', lastname),
    error => console.error('Error:', error)
);

// Preload data
lastNameSelector.preloadData().subscribe(
    () => console.log('Data preloaded'),
    error => console.error('Error preloading:', error)
);
*/