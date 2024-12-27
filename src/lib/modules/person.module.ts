import type { Faker } from "@faker-js/faker";
import { LastNameModule } from "./lastName.module";
import { type FirstNameOptions, FirstNameModule } from "./firstName.module";
import { Gender, type PersonOptions } from "../types/types";
import { PlacesModule } from "./places.module";
import { FiscalCodeModule, type FiscalCodeOptions } from "./fiscalCode.module";
import { AddressModule } from "./addresses.module";
import type { ItalianPersonDto } from "../types/dto/person.dto";
import { type Observable, of, forkJoin, lastValueFrom, combineLatest } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

export class PersonModule {
    private readonly lastNameModule: LastNameModule;
    private readonly namesModule: FirstNameModule;
    private readonly placesModule: PlacesModule;
    private readonly fiscalCodeModule: FiscalCodeModule;
    private readonly addressModule: AddressModule;

    constructor(private readonly faker: Faker) {
        this.lastNameModule = new LastNameModule(faker);
        this.namesModule = new FirstNameModule(faker);
        this.placesModule = new PlacesModule(faker);
        this.fiscalCodeModule = new FiscalCodeModule(faker);
        this.addressModule = new AddressModule(faker);
    }

    firstName$(options?: FirstNameOptions): Observable<string> {
        return this.namesModule.firstName$(options);
    }

    lastName$(options?: { region?: string; province?: string }): Observable<string> {
        return this.lastNameModule.lastName$(options);
    }

    fullName$(options?: FirstNameOptions): Observable<string> {
        return forkJoin({
            first: this.firstName$(options),
            last: this.lastName$()
        }).pipe(
            map(({ first, last }) => `${first} ${last}`)
        );
    }

    prefix$(gender: Gender): Observable<string> {
        return this.namesModule.prefix$(gender);
    }

    fiscalCode$(options: FiscalCodeOptions): Observable<string> {
        return this.fiscalCodeModule.generate$(options);
    }

    birthPlace$(): Observable<string> {
        return this.placesModule.randomCity$().pipe(
            map(city => city.name)
        );
    }

    province$(): Observable<{ name: string; code: string }> {
        return this.placesModule.province$();
    }

    birthDate$(minAge?: number, maxAge?: number): Observable<Date> {
        if (minAge !== undefined && maxAge !== undefined) {
            const currentYear = new Date().getFullYear();
            const fromYear = currentYear - maxAge;
            const toYear = currentYear - minAge;

            const fromDate = new Date(`${fromYear}-01-01`);
            const toDate = new Date(`${toYear}-12-31`);

            const currentDate = new Date();
            if (toYear === currentYear) {
                toDate.setFullYear(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            }

            return of(this.faker.date.between({
                from: fromDate,
                to: toDate
            }));
        }
        return of(this.faker.date.past());
    }

    phone$(): Observable<string> {
        return of(this.generatePhone());
    }

    landline$(): Observable<string> {
        return of(this.generateLandline());
    }

    email$(firstName?: string, lastName?: string): Observable<string> {
        return forkJoin({
            first: firstName ? of(firstName) : this.firstName$(),
            last: lastName ? of(lastName) : this.lastName$()
        }).pipe(
            map(({ first, last }) => this.generateEmail(first, last))
        );
    }

    pec$(firstName?: string, lastName?: string): Observable<string> {
        return forkJoin({
            first: firstName ? of(firstName) : this.firstName$(),
            last: lastName ? of(lastName) : this.lastName$()
        }).pipe(
            map(({ first, last }) => this.generatePec(first, last))
        );
    }

    generatePerson$(options?: PersonOptions): Observable<ItalianPersonDto> {
        // Default values for basic personal information
        const gender = options?.gender || this.faker.helpers.arrayElement([Gender.Male, Gender.Female]);
        const birthDate = this.faker.date.birthdate({
            mode: 'age',
            min: options?.minAge || 18,
            max: options?.maxAge || 80
        });

        // Build location options based on provided filters
        const locationOptions = options?.province ? { province: options.province } :
            options?.region ? { region: options.region } :
                undefined;

        const nameOptions = {
            region: options?.region,
            province: options?.province
        };

        return this.placesModule.city$(locationOptions).pipe(
            // First stage: Generate basic personal data
            mergeMap(birthCity =>
                combineLatest({
                    firstName: this.firstName$({ gender }),
                    lastName: this.lastName$(nameOptions),
                    prefix: options?.withTitle ? this.prefix$(gender) : of(''),
                    birthPlace: of(birthCity)
                })
            ),
            // Second stage: Generate documents and contact details
            mergeMap(({ firstName, lastName, prefix, birthPlace }) =>
                combineLatest({
                    base: of({ firstName, lastName, prefix, birthPlace }),
                    fiscalCode: this.fiscalCodeModule.generate$({
                        firstName, lastName, gender, birthDate,
                        birthPlace
                    }),
                    email: this.email$(firstName, lastName),
                    pec: this.pec$(firstName, lastName),
                    address: this.addressModule.completeAddress$()
                })
            ),
            // Final stage: Compose complete person profile
            map(({ base, fiscalCode, email, pec, address }) => ({
                fullName: [base.prefix, base.firstName, base.lastName].filter(Boolean).join(' '),
                firstName: base.firstName,
                lastName: base.lastName,
                gender,
                birthDate,
                birthPlace: {
                    city: base.birthPlace.name,
                    province: base.birthPlace.province.name,
                    region: base.birthPlace.region.name
                },
                fiscalCode,
                contacts: {
                    phone: this.generatePhone(),
                    email,
                    pec
                },
                address
            }))
        );
    }

    async firstName(options?: FirstNameOptions): Promise<string> {
        return lastValueFrom(this.firstName$(options));
    }

    async lastName(options?: { region?: string; province?: string }): Promise<string> {
        return lastValueFrom(this.lastName$(options));
    }

    async fullName(options?: FirstNameOptions): Promise<string> {
        return lastValueFrom(this.fullName$(options));
    }

    async fiscalCode(options: FiscalCodeOptions): Promise<string> {
        return lastValueFrom(this.fiscalCode$(options));
    }

    async email(firstName?: string, lastName?: string): Promise<string> {
        return lastValueFrom(this.email$(firstName, lastName));
    }

    async pec(firstName?: string, lastName?: string): Promise<string> {
        return lastValueFrom(this.pec$(firstName, lastName));
    }

    async generatePerson(options?: PersonOptions): Promise<ItalianPersonDto> {
        return lastValueFrom(this.generatePerson$(options));
    }

    private generatePhone(): string {
        const prefixes = ['320', '328', '338', '348', '350', '360', '368', '388', '389', '391', '392'];
        const prefix = this.faker.helpers.arrayElement(prefixes);
        const number = this.faker.string.numeric(7);
        return `${prefix}${number}`;
    }

    private generateLandline(): string {
        const prefixes = ['02', '06', '010', '011', '045', '051'];
        const prefix = this.faker.helpers.arrayElement(prefixes);
        const number = this.faker.string.numeric(7);
        return `${prefix}${number}`;
    }

    private generateEmail(firstName: string, lastName: string): string {
        const first = firstName.toLowerCase().replace(/ /g, '.');
        const last = lastName.toLowerCase().replace(/ /g, '.');
        const domains = ['gmail.com', 'yahoo.it', 'libero.it', 'hotmail.it', 'outlook.it'];
        const domain = this.faker.helpers.arrayElement(domains);
        const separator = this.faker.helpers.arrayElement(['.', '_', '']);
        return `${first}${separator}${last}@${domain}`;
    }

    private generatePec(firstName: string, lastName: string): string {
        const first = firstName.toLowerCase().replace(/ /g, '.');
        const last = lastName.toLowerCase().replace(/ /g, '.');
        const domains = ['pec.it', 'legalmail.it', 'pecmail.it'];
        const domain = this.faker.helpers.arrayElement(domains);
        return `${first}.${last}@${domain}`;
    }

    parseGender(value: string | undefined): Gender | undefined {
        const isValidGender = value === Gender.Male || value === Gender.Female;
        return isValidGender ? value : undefined;
    }
}