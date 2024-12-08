// names.module.ts
import { Faker } from "@faker-js/faker";
import { WeightedRandomSelector } from '../utils/weightedRandom';
import { Gender, WeightedData } from "../types/types";
import { NameUtils } from "../utils/nameUtils";
import femaleFirstNamesData from '../data/femaleFirstNames.json';
import maleFirstNamesData from '../data/maleFirstNames.json';

export interface NameOptions {
    gender?: Gender;
    prefix?: boolean;
}

export class NamesModule {
    private readonly femaleNamesSelector: WeightedRandomSelector<string>;
    private readonly maleNamesSelector: WeightedRandomSelector<string>;
    private readonly commonTitles = {
        male: ['Dott.', 'Ing.', 'Avv.', 'Prof.', 'Arch.', 'Rag.'],
        female: ['Dott.ssa', 'Ing.', 'Avv.', 'Prof.ssa', 'Arch.', 'Rag.'],
        neutral: ['Ing.', 'Avv.', 'Arch.', 'Rag.', 'Geom.']
    };

    constructor(private readonly faker: Faker) {
        const femaleFirstNames = femaleFirstNamesData as WeightedData;
        const maleFirstNames = maleFirstNamesData as WeightedData;

        this.femaleNamesSelector = new WeightedRandomSelector(femaleFirstNames.items);
        this.maleNamesSelector = new WeightedRandomSelector(maleFirstNames.items);
    }

    firstName(options?: NameOptions): string {
        const gender = options?.gender || this.faker.helpers.arrayElement([Gender.Male, Gender.Female]);
        let name = gender === Gender.Male
            ? this.maleNamesSelector.select()
            : this.femaleNamesSelector.select();
        name = NameUtils.formatItalianName(name); 
        return options?.prefix ? `${this.prefix(options?.gender)} ${name}` : name;
    }

    prefix(gender?: Gender): string {
        if (!gender) {
            return this.faker.helpers.arrayElement(this.commonTitles.neutral);
        }
        return this.faker.helpers.arrayElement(this.commonTitles[gender]);
    }
}