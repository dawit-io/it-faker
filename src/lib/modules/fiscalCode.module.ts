import type { Faker } from "@faker-js/faker";
import { FiscalCodeGenerator } from "../utils/fiscalCode";
import { Gender } from "../types/types";
import { PlacesModule } from "./places.module";
import { FirstNameModule } from "./firstName.module";
import { LastNameModule } from "./lastName.module";
import type { ItalianCity } from "../types/city";
import { type Observable, of, forkJoin, lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from "../types/country";

export interface FiscalCodeOptions {
    firstName?: string;
    lastName?: string;
    gender?: Gender;
    birthDate?: Date;
    birthPlace?: BirthPlace;
}

export interface CountryDto {
    name: string;
    code: string;
}

export type BirthPlace =
    | { type: 'italian'; city: ItalianCity }
    | { type: 'foreign'; country: CountryDto };

export class FiscalCodeModule {
    private readonly placesModule: PlacesModule;
    private readonly firstNameModule: FirstNameModule;
    private readonly lastNameModule: LastNameModule;

    constructor(private readonly faker: Faker) {
        this.placesModule = new PlacesModule(faker);
        this.firstNameModule = new FirstNameModule(faker);
        this.lastNameModule = new LastNameModule(faker);
    }

    generate$(options?: FiscalCodeOptions): Observable<string> {
        const gender = options?.gender ?? this.faker.helpers.arrayElement([Gender.Male, Gender.Female]);
        const birthDate = options?.birthDate ?? this.faker.date.birthdate();

        const firstName$ = options?.firstName
            ? of(options.firstName)
            : this.firstNameModule.firstName$();

        const lastName$ = options?.lastName
            ? of(options.lastName)
            : this.lastNameModule.lastName$();

        const birthPlace$ = options?.birthPlace
            ? this.validateBirthPlace(options.birthPlace)
            : this.placesModule.randomCity$().pipe(
                map(city => ({ type: 'italian', city } as BirthPlace))
            );

        return forkJoin({
            firstName: firstName$,
            lastName: lastName$,
            birthPlace: birthPlace$
        }).pipe(
            map(({ firstName, lastName, birthPlace }) =>
                FiscalCodeGenerator.generate({
                    firstName,
                    lastName,
                    gender,
                    birthDate,
                    birthPlace
                })
            )
        );
    }

    async generate(options?: FiscalCodeOptions): Promise<string> {
        return lastValueFrom(this.generate$(options));
    }

    private validateBirthPlace(birthPlace: BirthPlace): Observable<BirthPlace> {
        if (birthPlace.type === 'italian' && birthPlace.city && birthPlace.city.belfioreCode) {
            return this.placesModule.city$({ belfioreCode: birthPlace.city.belfioreCode }).pipe(
                map(city => {
                    if (!city) throw new Error('Invalid Belfiore Code');
                    return { type: 'italian', city };
                })
            );
        }
        if (birthPlace.type === 'italian' && birthPlace.city && birthPlace.city.name) {
            return this.placesModule.city$({ cityName: birthPlace.city.name }).pipe(
                map(city => {
                    if (!city) throw new Error('Invalid city name');
                    return { type: 'italian', city };
                })
            );
        }
        if (birthPlace.type === 'foreign' && birthPlace.country?.name) {
            return this.placesModule.getCountryByName$(birthPlace.country.name).pipe(
                map(country => {
                    if (!country) throw new Error(`Invalid country name: ${birthPlace.country.name}`);
                    const countryDto: CountryDto = { name: country.nameEn, code: country.atCode };
                    return { type: 'foreign', country: countryDto };
                })
            );
        }
        throw new Error('Invalid birth place');
    }
}