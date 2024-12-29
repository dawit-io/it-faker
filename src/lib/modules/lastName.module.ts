import type { Faker } from "@faker-js/faker";
import { NameUtils } from "../utils/nameUtils";
import { LastNameSelector } from "../utils/lastNameSelector";
import { type Observable, lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

export interface LastNameOptions {
    region?: string;
    province?: string;
}

export class LastNameModule {
    private readonly lastNameSelector: LastNameSelector;

    constructor(readonly faker: Faker) {
        this.lastNameSelector = new LastNameSelector(faker);
    }

    lastName$(options?: LastNameOptions): Observable<string> {
        return this.lastNameSelector.select(options).pipe(
            map(name => NameUtils.formatItalianName(name))
        );
    }

    preloadData$(): Observable<void> {
        return this.lastNameSelector.preloadData();
    }

    async lastName(options?: LastNameOptions): Promise<string> {
        return lastValueFrom(this.lastName$(options));
    }

    async preloadData(): Promise<void> {
        return lastValueFrom(this.preloadData$());
    }

    clearCache(): void {
        this.lastNameSelector.clearCache();
    }
}