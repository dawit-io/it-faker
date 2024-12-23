import { Faker } from "@faker-js/faker";
import { WeightedRandomSelector } from '../utils/weightedRandom';
import { Gender, WeightedData } from "../types/types";
import { NameUtils } from "../utils/nameUtils";
import { Observable, from, BehaviorSubject, of, lastValueFrom } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

export interface FirstNameOptions {
    gender?: Gender;
    prefix?: boolean;
}

export class FirstNameModule {
    private readonly commonTitles = {
        male: ['Dott.', 'Ing.', 'Avv.', 'Prof.', 'Arch.', 'Rag.'],
        female: ['Dott.ssa', 'Ing.', 'Avv.', 'Prof.ssa', 'Arch.', 'Rag.'],
        neutral: ['Ing.', 'Avv.', 'Arch.', 'Rag.', 'Geom.']
    };

    private dataSubject = new BehaviorSubject<{
        femaleNamesSelector: WeightedRandomSelector<string>;
        maleNamesSelector: WeightedRandomSelector<string>;
    } | null>(null);

    constructor(private readonly faker: Faker) {}

    private loadNameData(): Observable<void> {
        if (this.dataSubject.getValue()) {
            return of(undefined);
        }

        const femaleNamesPromise = import('../data/femaleFirstNames.json');
        const maleNamesPromise = import('../data/maleFirstNames.json');

        return from(Promise.all([femaleNamesPromise, maleNamesPromise])).pipe(
            map(([femaleModule, maleModule]) => {
                const femaleFirstNames = femaleModule.default as WeightedData;
                const maleFirstNames = maleModule.default as WeightedData;

                const femaleNamesSelector = new WeightedRandomSelector(femaleFirstNames.items);
                const maleNamesSelector = new WeightedRandomSelector(maleFirstNames.items);

                this.dataSubject.next({
                    femaleNamesSelector,
                    maleNamesSelector
                });
            }),
            catchError(error => {
                console.error('Error loading name data:', error);
                throw error;
            })
        );
    }

    firstName$(options?: FirstNameOptions): Observable<string> {
        return this.loadNameData().pipe(
            switchMap(() => {
                const data = this.dataSubject.getValue();
                if (!data) {
                    throw new Error('Name data not initialized');
                }

                const gender = options?.gender || 
                    this.faker.helpers.arrayElement([Gender.Male, Gender.Female]);

                let name = gender === Gender.Male
                    ? data.maleNamesSelector.select()
                    : data.femaleNamesSelector.select();

                name = NameUtils.formatItalianName(name);
                
                if (options?.prefix) {
                    return of(this.getNameWithPrefix(name, gender));
                }
                return of(name);
            }),
            catchError(error => {
                console.error('Error generating first name:', error);
                return of('');
            })
        );
    }

    prefix$(gender?: Gender): Observable<string> {
        return of(this.getPrefix(gender));
    }

    preloadData$(): Observable<void> {
        return this.loadNameData();
    }

    async firstName(options?: FirstNameOptions): Promise<string> {
        return lastValueFrom(this.firstName$(options));
    }

    async prefix(gender?: Gender): Promise<string> {
        return lastValueFrom(this.prefix$(gender));
    }

    async preloadData(): Promise<void> {
        return lastValueFrom(this.preloadData$());
    }

    private getNameWithPrefix(name: string, gender: Gender): string {
        return `${this.getPrefix(gender)} ${name}`;
    }

    private getPrefix(gender?: Gender): string {
        if (!gender) {
            return this.faker.helpers.arrayElement(this.commonTitles.neutral);
        }
        return this.faker.helpers.arrayElement(this.commonTitles[gender]);
    }

    clearCache(): void {
        this.dataSubject.next(null);
    }
}