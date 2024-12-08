import { Faker } from "@faker-js/faker";
import { PlacesModule } from "./places.module";
import { LastNameModule } from "./lastName.module";

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

    streetName(region?: string): string {
        const allPatterns = [
            ...this.historicalFigures,
            ...this.saints,
            ...this.importantDates,
            ...this.culturalReferences,
            ...this.geographicalReferences
        ];

        if (region) {
            const regionalFigure = this.lastNameModule.lastName({ region });
            allPatterns.push(regionalFigure);
        }

        return this.faker.helpers.arrayElement(allPatterns);
    }

    streetAddress(options?: { region?: string }): string {
        const streetType = this.faker.helpers.arrayElement(this.streetTypes);
        const name = this.streetName(options?.region);
        const buildingNumber = this.buildingNumber();
        return `${streetType} ${name}, ${buildingNumber}`;
    }

    private buildingNumber(): string {
        const number = this.faker.number.int({ min: 1, max: 300 });
        const suffix = this.faker.helpers.maybe(() => 
            this.faker.helpers.arrayElement(['A', 'B', 'C', '/a', '/b', '/c', 'bis', 'ter']), 
            { probability: 0.1 }
        );
        return suffix ? `${number}${suffix}` : `${number}`;
    }

    apartmentDetails(): string {
        const buildings = ['A', 'B', 'C', 'D', 'E', 'F'];
        const floor = this.faker.number.int({ min: 0, max: 10 });
        const apartmentNumber = this.faker.number.int({ min: 1, max: 20 });
        const internalLetter = this.faker.helpers.maybe(() => 
            this.faker.helpers.arrayElement(['a', 'b', 'c']), 
            { probability: 0.3 }
        );
        
        return `Scala ${this.faker.helpers.arrayElement(buildings)}, Piano ${floor}, Interno ${apartmentNumber}${internalLetter || ''}`;
    }

    completeAddress(options?: { region?: string }): string {
        const streetAddr = this.streetAddress(options);
        const apartment = this.apartmentDetails();
        const city = options?.region 
            ? this.placesModule.city({ region: options.region })
            : this.placesModule.randomCity();
        const cap = city.postalCodes[0] || this.faker.string.numeric(5);

        return [
            streetAddr,
            apartment,
            `${cap} ${city.name} (${city.provinceCode})`
        ].join(' ');
    }
    
}