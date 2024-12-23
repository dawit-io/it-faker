import { Faker } from "@faker-js/faker";
import { FiscalCodeGenerator } from "../utils/fiscalCode";
import { Gender } from "../types/types";
import { PlacesModule } from "./places.module";
import { FirstNameModule } from "./firstName.module";
import { LastNameModule } from "./lastName.module";
import { ItalianCity } from "../types/city";
import { Observable, of, forkJoin, lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

export interface FiscalCodeOptions {
    firstName?: string;
    lastName?: string;
    gender?: Gender;
    birthDate?: Date;
    birthPlace?: ItalianCity;
}

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
            ? of(options.birthPlace)
            : this.placesModule.randomCity();

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
}