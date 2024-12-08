import { Faker } from "@faker-js/faker";
import { RegionalLastName } from "../types/types";

export class LastNameSelector {
    private readonly regionMap: Map<string, RegionalLastName[]>;
    private readonly provinceMap: Map<string, RegionalLastName>;
    private readonly fallbackSurnames: string[];
    private readonly faker: Faker;
    constructor(
        regionalData: RegionalLastName[],
        fallbackSurnames: string[],
        faker: Faker
    ) {
        this.faker = faker;
        this.fallbackSurnames = fallbackSurnames;
        this.regionMap = new Map();
        this.provinceMap = new Map();
        
        // Index data by region and province
        regionalData.forEach(data => {
            // Region indexing
            if (!this.regionMap.has(data.region)) {
                this.regionMap.set(data.region, []);
            }
            this.regionMap.get(data.region)?.push(data);
            
            // Province indexing
            this.provinceMap.set(data.province.toLowerCase(), data);
        });
    }

    select(options?: { region?: string; province?: string }): string {
        if (!options) {
            return this.faker.helpers.arrayElement(this.fallbackSurnames);
        }

        let surnames: string[] = [];

        if (options.province) {
            const provinceData = this.provinceMap.get(options.province.toLowerCase());
            if (provinceData) {
                surnames = provinceData.surnames;
            }
        } else if (options.region) {
            const regionData = this.regionMap.get(options.region);
            if (regionData) {
                surnames = regionData.flatMap(data => data.surnames);
            }
        }

        return surnames.length > 0 
            ? this.faker.helpers.arrayElement(surnames)
            : this.faker.helpers.arrayElement(this.fallbackSurnames);
    }

}