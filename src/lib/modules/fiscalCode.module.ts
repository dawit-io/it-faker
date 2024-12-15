import { Faker } from "@faker-js/faker";
import { FiscalCodeGenerator } from "../utils/fiscalCode";
import { Gender } from "../types/types";
import { PlacesModule } from "./places.module";
import { NamesModule } from "./names.module";
import { LastNameModule } from "./lastName.module";
import { ItalianCity } from "../types/city";

export interface FiscalCodeOptions {
    firstName?: string;
    lastName?: string;
    gender?: Gender;
    birthDate?: Date;
    birthPlace?: ItalianCity;
}

export class FiscalCodeModule {
    private readonly placesModule: PlacesModule;
    private readonly namesModule: NamesModule;
    private readonly lastNameModule: LastNameModule;

    constructor(private readonly faker: Faker) {
        this.placesModule = new PlacesModule(faker);
        this.namesModule = new NamesModule(faker);
        this.lastNameModule = new LastNameModule(faker);
    }

    generate(options?: FiscalCodeOptions): string {
        const birthCity = this.placesModule.randomCity();
        const firstName = options?.firstName ?? this.namesModule.firstName();
        const lastName = options?.lastName ?? this.lastNameModule.lastName();
        const gender = options?.gender ?? this.faker.helpers.arrayElement([Gender.Male, Gender.Female]);
        const birthDate = options?.birthDate ?? this.faker.date.birthdate();
        const birthPlace = options?.birthPlace ?? birthCity;

        return FiscalCodeGenerator.generate({
            firstName: firstName,
            lastName: lastName,
            gender,
            birthDate,
            birthPlace
        });
    }
}