import { Faker } from "@faker-js/faker";
import { RegionalLastName } from "../types/types";
import { NameUtils } from "../utils/nameUtils";
import regionalLastNamesData from '../data/lastNamesByProvince.json';
import randomLastNamesData from '../data/lastNames.json';
import { LastNameSelector } from "../utils/lastNameSelector";

const regionalLastNames = regionalLastNamesData as RegionalLastName[];
const randomLastNames = randomLastNamesData as string[];

export interface LastNameOptions {
    region?: string;
    province?: string;
}

export class LastNameModule {
    private readonly lastNameSelector: LastNameSelector;

    constructor(readonly faker: Faker) {
        this.lastNameSelector = new LastNameSelector(
            regionalLastNames,
            randomLastNames,
            faker
        );
    }

    lastName(options?: LastNameOptions): string {
        const name = this.lastNameSelector.select(options);
        return NameUtils.formatItalianName(name);
    }
}