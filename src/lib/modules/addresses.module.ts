import type { Faker } from "@faker-js/faker";
import { PlacesModule } from "./places.module";
import { LastNameModule } from "./lastName.module";
import { type Observable, of, lastValueFrom } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export class AddressModule {
    private readonly placesModule: PlacesModule;
    private readonly lastNameModule: LastNameModule;

    // Street types with weighted probabilities
    private readonly streetTypes = [
        { value: 'Via', weight: 70 },      // Most common
        { value: 'Viale', weight: 8 },     // Fairly common
        { value: 'Piazza', weight: 8 },    // Fairly common
        { value: 'Corso', weight: 5 },     // Less common
        { value: 'Largo', weight: 3 },     // Rare
        { value: 'Vicolo', weight: 2 },    // Very rare
        { value: 'Lungomare', weight: 1 }, // Very rare
        { value: 'Strada', weight: 1 },    // Very rare
        { value: 'Salita', weight: 0.5 },  // Extremely rare
        { value: 'Calata', weight: 0.5 },  // Extremely rare
        { value: 'Galleria', weight: 0.5 }, // Extremely rare
        { value: 'Borgo', weight: 0.3 },    // Extremely rare
        { value: 'Traversa', weight: 0.2 }  // Extremely rare
    ];

    private readonly historicalFigures = [
        'Giuseppe Garibaldi', 'Giuseppe Mazzini', 'Vittorio Emanuele',
        'Dante Alighieri', 'Leonardo da Vinci', 'Cristoforo Colombo',
        'Alessandro Manzoni', 'Galileo Galilei'
    ];

    private readonly saints = [
        'San Francesco', 'San Giovanni', 'Santa Maria', 'San Giuseppe',
        'Sant\'Antonio', 'San Marco', 'Santa Chiara', 'San Pietro'
    ];

    private readonly importantDates = [
        'XX Settembre', 'IV Novembre', 'XXV Aprile', 'II Giugno',
        'I Maggio', 'VIII Agosto'
    ];

    private readonly culturalReferences = [
        'Roma', 'Venezia', 'Milano', 'Napoli', // Common city-named streets
        'dei Mille', 'delle Grazie', 'della Repubblica', 'della Libertà',
        'della Costituzione', 'della Pace', 'dell\'Indipendenza', 'dell\'Unità',
        'Verdi', 'Rossini', 'Puccini'
    ];

    private readonly geographicalReferences = [
        'Monte Bianco', 'Vesuvio', 'Etna', 'Dolomiti',
        'Tevere', 'Po', 'Arno', 'Mediterraneo'
    ];

    constructor(private readonly faker: Faker) {
        this.placesModule = new PlacesModule(faker);
        this.lastNameModule = new LastNameModule(faker);
    }

    private getWeightedStreetType(): string {
        const totalWeight = this.streetTypes.reduce((sum, type) => sum + type.weight, 0);
        let random = this.faker.number.float({ min: 0, max: totalWeight });

        for (const streetType of this.streetTypes) {
            random -= streetType.weight;
            if (random <= 0) {
                return streetType.value;
            }
        }

        return 'Via'; // Fallback to most common
    }

    streetName$(region?: string): Observable<string> {
        const basePatterns = [
            ...this.historicalFigures,
            ...this.saints,
            ...this.importantDates,
            ...this.culturalReferences,
            ...this.geographicalReferences
        ];

        if (!region) {
            return of(this.faker.helpers.arrayElement(basePatterns));
        }

        return this.lastNameModule.lastName$({ region }).pipe(
            map(regionalFigure => {
                const allPatterns = [...basePatterns, regionalFigure];
                return this.faker.helpers.arrayElement(allPatterns);
            })
        );
    }

    streetAddress$(options?: { region?: string }): Observable<string> {
        return this.streetName$(options?.region).pipe(
            map(name => {
                const streetType = this.getWeightedStreetType();
                const buildingNumber = this.buildingNumber();
                return `${streetType} ${name}, ${buildingNumber}`;
            })
        );
    }

    completeAddress$(options?: { region?: string }): Observable<string> {
        return this.streetAddress$(options).pipe(
            switchMap(streetAddr =>
                (options?.region
                    ? this.placesModule.city$({ region: options.region })
                    : this.placesModule.randomCity$()
                ).pipe(
                    map(city => {
                        // Only 5% chance to include apartment details
                        const includeApartmentDetails = this.faker.helpers.maybe(() => true, { probability: 0.05 });
                        const apartment = includeApartmentDetails ? this.generateApartmentDetails() : '';
                        const cap = city?.postalCodes[0] || this.faker.string.numeric(5);

                        const baseAddress = [streetAddr, apartment].filter(Boolean).join(' ');
                        return `${baseAddress}, ${cap} ${city?.name} (${city?.provinceCode})`;
                    })
                )
            )
        );
    }

    private buildingNumber(): string {
        const number = this.faker.number.int({ min: 1, max: 300 });
        const suffix = this.faker.helpers.maybe(() =>
            this.faker.helpers.arrayElement(['A', 'B', '/a', '/b', 'bis']),
            { probability: 0.05 } // Reduced probability for number suffixes
        );
        return suffix ? `${number}${suffix}` : `${number}`;
    }

    private generateApartmentDetails(): string {
        const buildings = ['A', 'B', 'C'];
        const floor = this.faker.number.int({ min: 0, max: 8 });
        const apartmentNumber = this.faker.number.int({ min: 1, max: 15 });
        const internalLetter = this.faker.helpers.maybe(() =>
            this.faker.helpers.arrayElement(['a', 'b']),
            { probability: 0.2 }
        );

        return `Scala ${this.faker.helpers.arrayElement(buildings)}, Piano ${floor}, Interno ${apartmentNumber}${internalLetter || ''}`;
    }

    async streetName(region?: string): Promise<string> {
        return lastValueFrom(this.streetName$(region));
    }

    async streetAddress(options?: { region?: string }): Promise<string> {
        return lastValueFrom(this.streetAddress$(options));
    }

    async completeAddress(options?: { region?: string }): Promise<string> {
        return lastValueFrom(this.completeAddress$(options));
    }
}