import { Faker } from "@faker-js/faker";
import { RegionalLastName } from "../types/types";

export class LastNameSelector {
    private readonly regionMap: Map<string, RegionalLastName[]>;
    private readonly provinceMap: Map<string, RegionalLastName>;
    private readonly fallbackSurnames: string[];
    private readonly faker: Faker;

    private readonly REGIONAL_WEIGHT = 0.5;
    constructor(
        regionalData: RegionalLastName[],
        fallbackSurnames: string[],
        faker: Faker
    ) {
        this.faker = faker;
        this.fallbackSurnames = fallbackSurnames;
        this.regionMap = new Map();
        this.provinceMap = new Map();

        regionalData.forEach(data => {
            if (!this.regionMap.has(data.region)) {
                this.regionMap.set(data.region, []);
            }
            this.regionMap.get(data.region)?.push(data);
            this.provinceMap.set(data.province.toLowerCase(), data);
        });
    }

    select(options?: { region?: string; province?: string }): string {
        if (!options) {
            return this.faker.helpers.arrayElement(this.fallbackSurnames);
        }

        let localSurnames: string[] = [];

        if (options.province) {
            const provinceData = this.provinceMap.get(options.province.toLowerCase());
            if (provinceData) {
                localSurnames = provinceData.surnames;
            }
        } else if (options.region) {
            const regionData = this.regionMap.get(options.region);
            if (regionData) {
                localSurnames = regionData.flatMap(data => data.surnames);
            }
        }

        if (localSurnames.length === 0) {
            return this.faker.helpers.arrayElement(this.fallbackSurnames);
        }

        const useLocal = this.faker.number.float({ min: 0, max: 1 }) < this.REGIONAL_WEIGHT;

        if (useLocal) {
            return this.faker.helpers.arrayElement(localSurnames);
        } else {
            return this.faker.helpers.arrayElement(this.fallbackSurnames);
        }
    }
}