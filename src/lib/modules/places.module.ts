import { Faker } from "@faker-js/faker";
import citiesData from '../data/cities.json';
import { CityAdapter } from '../utils/cityAdapter';
import { WeightedRandomSelector } from "../utils/weightedRandom";
import { BirthPlace, Province } from "../types/types";
import { ItalianCity, RawItalianCity } from "../types/city";


export class PlacesModule {
    private readonly citySelector: WeightedRandomSelector<RawItalianCity>;

    constructor(private readonly faker: Faker) {
        this.citySelector = new WeightedRandomSelector(
            CityAdapter.toWeightedItems(citiesData)
        );
    }

    randomCity(): ItalianCity {
        return this.selectItalianCity();
    }

    randomCities(count: number): ItalianCity[] {
        return Array.from(
            Array.from({ length: count })
                .reduce<Set<ItalianCity>>((acc) => {
                    while (acc.size < count) acc.add(this.selectItalianCity());
                    return acc;
                }, new Set())
        );
    }

    province(): Province {
        const randomCity = this.selectItalianCity();

        return {
            name: randomCity.province.name,
            code: randomCity.code
        };
    }

    city(options?: { region?: string; province?: string }): ItalianCity {
        if (options?.province) {
            const filteredCities = citiesData.filter(
                city => city.provincia.nome.toLowerCase() === options.province?.toLowerCase()
            );
            if (filteredCities.length > 0) {
                return CityAdapter.toEnglish(this.faker.helpers.arrayElement(filteredCities));
            }
        }

        if (options?.region) {
            const filteredCities = citiesData.filter(
                city => city.regione.nome.toLowerCase() === options.region?.toLowerCase()
            );
            if (filteredCities.length > 0) {
                return CityAdapter.toEnglish(this.faker.helpers.arrayElement(filteredCities));
            }
        }

        return this.selectItalianCity();
    }

    getBirthPlace(): BirthPlace {
        const randomCity = this.selectItalianCity();
        return {
            name: randomCity.name,
            belfioreCode: randomCity.belfioreCode,
            province: randomCity.province.name,
            region: randomCity.region.name,
            provinceCode: randomCity.provinceCode
        };
    }

    region(): string {
        const randomCity = this.selectItalianCity();
        return randomCity.region.name;
    }

    address(): string {
        const streetTypes = ['Via', 'Corso', 'Viale', 'Piazza', 'Largo'];
        const streetType = this.faker.helpers.arrayElement(streetTypes);
        const streetName = this.faker.person.lastName();
        const number = this.faker.number.int({ min: 1, max: 200 });
        return `${streetType} ${streetName}, ${number}`;
    }

    fullAddress(): string {
        const city = this.city();
        const province = this.province();
        const cap = this.faker.string.numeric(5);
        return `${this.address()}\n${cap} ${city} (${province.code})`;
    }

    private selectItalianCity(): ItalianCity {
        const randomCity = this.citySelector.select();
        return CityAdapter.toEnglish(randomCity);
    }
}