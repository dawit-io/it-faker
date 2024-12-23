import { Faker } from "@faker-js/faker";
import { PlacesModule } from "./places.module";
import { LastNameModule } from "./lastName.module";
import { Observable, of, lastValueFrom } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export class AddressModule {
    private readonly placesModule: PlacesModule;
    private readonly lastNameModule: LastNameModule;
    
    private readonly streetTypes = [
        'Via', 'Viale', 'Corso', 'Piazza', 'Largo', 'Vicolo', 
        'Lungomare', 'Strada', 'Salita', 'Calata', 'Galleria', 
        'Borgo', 'Traversa'
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
        'dei Mille', 'delle Grazie', 'della Repubblica', 'della Libertà',
        'della Costituzione', 'della Pace', 'dell\'Indipendenza', 'dell\'Unità',
        'Verdi', 'Rossini', 'Puccini', 'Michelangelo',
        'Leonardo', 'Raffaello', 'Brunelleschi'
    ];

    private readonly geographicalReferences = [
        'Monte Bianco', 'Vesuvio', 'Etna', 'Dolomiti',
        'Tevere', 'Po', 'Arno', 'Mediterraneo'
    ];

    constructor(private readonly faker: Faker) {
        this.placesModule = new PlacesModule(faker);
        this.lastNameModule = new LastNameModule(faker);
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
                const streetType = this.faker.helpers.arrayElement(this.streetTypes);
                const buildingNumber = this.buildingNumber();
                return `${streetType} ${name}, ${buildingNumber}`;
            })
        );
    }

    apartmentDetails$(): Observable<string> {
        return of(this.generateApartmentDetails());
    }

    completeAddress$(options?: { region?: string }): Observable<string> {
        return this.streetAddress$(options).pipe(
            switchMap(streetAddr => 
                (options?.region 
                    ? this.placesModule.city$({ region: options.region })
                    : this.placesModule.randomCity$()
                ).pipe(
                    map(city => {
                        const apartment = this.generateApartmentDetails();
                        const cap = city.postalCodes[0] || this.faker.string.numeric(5);
                        return [
                            streetAddr,
                            apartment,
                            `${cap} ${city.name} (${city.provinceCode})`
                        ].join(' ');
                    })
                )
            )
        );
    }

    async streetName(region?: string): Promise<string> {
        return lastValueFrom(this.streetName$(region));
    }

    async streetAddress(options?: { region?: string }): Promise<string> {
        return lastValueFrom(this.streetAddress$(options));
    }

    async apartmentDetails(): Promise<string> {
        return lastValueFrom(this.apartmentDetails$());
    }

    async completeAddress(options?: { region?: string }): Promise<string> {
        return lastValueFrom(this.completeAddress$(options));
    }

    private buildingNumber(): string {
        const number = this.faker.number.int({ min: 1, max: 300 });
        const suffix = this.faker.helpers.maybe(() => 
            this.faker.helpers.arrayElement(['A', 'B', 'C', '/a', '/b', '/c', 'bis', 'ter']), 
            { probability: 0.1 }
        );
        return suffix ? `${number}${suffix}` : `${number}`;
    }

    private generateApartmentDetails(): string {
        const buildings = ['A', 'B', 'C', 'D', 'E', 'F'];
        const floor = this.faker.number.int({ min: 0, max: 10 });
        const apartmentNumber = this.faker.number.int({ min: 1, max: 20 });
        const internalLetter = this.faker.helpers.maybe(() => 
            this.faker.helpers.arrayElement(['a', 'b', 'c']), 
            { probability: 0.3 }
        );
        
        return `Scala ${this.faker.helpers.arrayElement(buildings)}, Piano ${floor}, Interno ${apartmentNumber}${internalLetter || ''}`;
    }
}