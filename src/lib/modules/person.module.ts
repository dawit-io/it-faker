import { Faker } from "@faker-js/faker";
import { LastNameModule } from "./lastName.module";
import { NameOptions, NamesModule } from "./names.module";
import { Gender, PersonOptions } from "../types/types";
import { PlacesModule } from "./places.module";
import { FiscalCodeModule, FiscalCodeOptions } from "./fiscalCode.module";
import { AddressModule } from "./addresses.module";
import { ItalianPersonDto } from "../types/dto/person.dto";

export class PersonModule {
    private readonly lastNameModule: LastNameModule;
    private readonly namesModule: NamesModule;
    private readonly placesModule: PlacesModule;
    private readonly fiscalCodeModule: FiscalCodeModule;
    private readonly addressModule: AddressModule;
    constructor(private readonly faker: Faker) {
        this.lastNameModule = new LastNameModule(faker);
        this.namesModule = new NamesModule(faker);
        this.placesModule = new PlacesModule(faker);
        this.fiscalCodeModule = new FiscalCodeModule(faker);
        this.addressModule = new AddressModule(faker);
    }

    firstName(options?: NameOptions): string {
        return this.namesModule.firstName(options);
    }

    lastName(options?: { region?: string; province?: string }): string {
        return this.lastNameModule.lastName(options);
    }

    fullName(options?: NameOptions): string {
        return `${this.firstName(options)} ${this.lastName()}`;
    }

    prefix(gender: Gender): string {
        return this.namesModule.prefix(gender);
    }

    fiscalCode(options: FiscalCodeOptions): string {
        return this.fiscalCodeModule.generate(options);
    }

    birthPlace(): string {
        const randomCity = this.placesModule.randomCity();
        return randomCity.name;
    }

    province(): { name: string; code: string } {
        const randomCity = this.placesModule.randomCity();
        return { name: randomCity.province.name, code: randomCity.provinceCode };
    }

    birthDate(): Date {
        return this.faker.date.between({
            from: new Date('1950-01-01'),
            to: new Date('2005-12-31')
        });
    }

    phone(): string {
        const prefixes = ['320', '328', '338', '348', '350', '360', '368', '388', '389', '391', '392'];
        const prefix = this.faker.helpers.arrayElement(prefixes);
        const number = this.faker.string.numeric(7);
        return `${prefix}${number}`;
    }

    landline(): string {
        const prefixes = ['02', '06', '010', '011', '045', '051'];
        const prefix = this.faker.helpers.arrayElement(prefixes);
        const number = this.faker.string.numeric(7);
        return `${prefix}${number}`;
    }

    email(firstName?: string, lastName?: string): string {
        const first = (firstName || this.firstName()).toLowerCase().replace(/ /g, '.');
        const last = (lastName || this.lastName()).toLowerCase().replace(/ /g, '.');
        const domains = ['gmail.com', 'yahoo.it', 'libero.it', 'hotmail.it', 'outlook.it'];
        const domain = this.faker.helpers.arrayElement(domains);
        const separator = this.faker.helpers.arrayElement(['.', '_', '']);
        return `${first}${separator}${last}@${domain}`;
    }

    pec(firstName?: string, lastName?: string): string {
        const first = firstName || this.firstName().toLowerCase().replace(/ /g, '.');
        const last = lastName || this.lastName().toLowerCase().replace(/ /g, '.');
        const domains = ['pec.it', 'legalmail.it', 'pecmail.it'];
        const domain = this.faker.helpers.arrayElement(domains);
        return `${first}.${last}@${domain}`;
    }

    generatePerson(options?: PersonOptions): ItalianPersonDto {
        const gender = options?.gender || this.faker.helpers.arrayElement([Gender.Male, Gender.Female]);
        let birthDate = this.faker.date.birthdate({
            mode: 'age',
            min: options?.minAge || 18,
            max: options?.maxAge || 80
        });

        const birthCity = options?.province
            ? this.placesModule.city({ province: options.province })
            : options?.region
                ? this.placesModule.city({ region: options.region })
                : this.placesModule.randomCity();

        const firstName = this.namesModule.firstName({ gender });
        const lastName = this.lastNameModule.lastName({
            region: options?.region,
            province: options?.province
        });

        const prefix = options?.withTitle ? this.namesModule.prefix(gender) : '';

        return {
            fullName: [prefix, firstName, lastName].filter(Boolean).join(' '),
            firstName,
            lastName,
            gender,
            birthDate,
            birthPlace: {
                city: birthCity.name,
                province: birthCity.province.name,
                region: birthCity.region.name
            },
            fiscalCode: this.fiscalCodeModule.generate({
                firstName,
                lastName,
                gender,
                birthDate,
                birthPlace: birthCity
            }),
            contacts: {
                phone: this.phone(),
                email: this.email(firstName, lastName),
                pec: this.pec(firstName, lastName)
            },
            address: this.addressModule.completeAddress()
        };
    }

    parseGender(value: string | undefined): Gender | undefined {
        const isValidGender = value === Gender.Male || value === Gender.Female;
        return isValidGender ? value : undefined;
    }
}