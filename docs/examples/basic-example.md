# Basic Examples

This guide provides basic examples for using IT-Faker to generate authentic Italian data. Each example demonstrates a specific use case, from simple data generation to more complex scenarios.

## Getting Started

First, install and import IT-Faker:

```typescript
import { ItFaker } from '@italia-tools/faker';

const faker = new ItFaker();
```

## Personal Information Examples

### Generating Names

```typescript
// Basic name generation
const firstName = await faker.itFirstName.firstName();
const lastName = await faker.itLastName.lastName();

// Gender-specific names
const maleName = await faker.itFirstName.firstName({ gender: 'male' }); // "Marco"
const femaleName = await faker.itFirstName.firstName({ gender: 'female' }); // "Giulia"

// Names with professional titles
const doctorName = await faker.itFirstName.firstName({ 
    gender: 'male',
    prefix: true 
}); // "Dott. Giuseppe"

// Regional surnames
const sicilianName = await faker.itLastName.lastName({ 
    region: 'Sicilia' 
}); // "Russo"

const bolzanoName = await faker.itLastName.lastName({ 
    province: 'Bolzano' 
}); // "Mair"
```

### Contact Information

```typescript
// Generate phone numbers
const mobilePhone = await faker.itPerson.phone(); // "3201234567"
const landline = await faker.itPerson.landline(); // "0212345678"

// Generate email addresses
const email = await faker.itPerson.email('Mario', 'Rossi'); // "mario.rossi@gmail.com"
const pec = await faker.itPerson.pec('Mario', 'Rossi'); // "mario.rossi@pec.it"
```

## Address Examples

### Basic Address Generation

```typescript
// Generate street names
const streetName = await faker.itAddress.streetName(); // "Giuseppe Garibaldi"

// Generate street addresses
const streetAddress = await faker.itAddress.streetAddress(); // "Via Giuseppe Garibaldi, 42"

// Generate complete addresses
const address = await faker.itAddress.completeAddress(); // "Via Giuseppe Garibaldi, 42, 20123 Milano (MI)"

// Generate regional addresses
const toscanaAddress = await faker.itAddress.completeAddress({
    region: 'Toscana'
}); // "Piazza della Repubblica, 15, 50123 Firenze (FI)"
```

## Geographic Data Examples

### Cities and Provinces

```typescript
// Get a random city
const city = await faker.itPlaces.randomCity();
// {
//     name: "Milano",
//     province: { name: "Milano", code: "MI" },
//     region: { name: "Lombardia", code: "03" }
// }

// Get multiple random cities
const cities = await faker.itPlaces.randomCities(3);

// Get a specific city
const milan = await faker.itPlaces.city({ 
    cityName: 'Milano' 
});

// Get province information
const province = await faker.itPlaces.province();
// { name: "Roma", code: "RM" }
```

### Birth Places

```typescript
const birthPlace = await faker.itPlaces.getBirthPlace();
// {
//     name: "Roma",
//     belfioreCode: "H501",
//     province: "Roma",
//     region: "Lazio",
//     provinceCode: "RM"
// }
```

## Fiscal Code Examples

### Generate Fiscal Codes

```typescript
// Generate random fiscal code
const randomCode = await faker.itFiscalCode.generate();

// Generate specific fiscal code
const specificCode = await faker.itFiscalCode.generate({
    firstName: 'Mario',
    lastName: 'Rossi',
    gender: Gender.Male,
    birthDate: new Date(1980, 0, 1),
    birthPlace: { name: 'Roma' }
});
```

## Combined Examples

### Create a Complete Person Profile

```typescript
async function createProfile() {
    const gender = 'male';
    const region = 'Lombardia';

    const profile = {
        personal: {
            firstName: await faker.itFirstName.firstName({ gender }),
            lastName: await faker.itLastName.lastName({ region }),
            title: await faker.itPerson.prefix(gender)
        },
        documents: {
            fiscalCode: await faker.itFiscalCode.generate()
        },
        birth: {
            date: await faker.itPerson.birthDate(),
            place: await faker.itPlaces.getBirthPlace()
        },
        contact: {
            phone: await faker.itPerson.phone(),
            email: await faker.itPerson.email(),
            pec: await faker.itPerson.pec()
        },
        address: await faker.itAddress.completeAddress({ region })
    };

    return profile;
}
```

## Using Observables

Every method is available in an Observable variant:

```typescript
// Using Observable variants
faker.itFirstName.firstName$({ gender: 'female' })
    .subscribe(name => console.log(name));

faker.itAddress.completeAddress$({ region: 'Lazio' })
    .subscribe(address => console.log(address));

// Combining multiple Observables
import { combineLatest } from 'rxjs';

const profile$ = combineLatest({
    name: faker.itFirstName.firstName$({ gender: 'male' }),
    address: faker.itAddress.completeAddress$(),
    fiscalCode: faker.itFiscalCode.generate$()
});

profile$.subscribe(profile => console.log(profile));
```

## Performance Optimization

### Preload Data for Better Performance

```typescript
async function initialize() {
    console.log('Preloading data...');
    
    await Promise.all([
        faker.itFirstName.preloadData(),
        faker.itLastName.preloadData(),
        faker.itPlaces.preloadData()
    ]);
    
    console.log('Ready to generate data');
}

// Clear cache if needed
function cleanup() {
    faker.itFirstName.clearCache();
    faker.itLastName.clearCache();
    faker.itPlaces.clearCache();
}
```

## Error Handling

```typescript
async function safeDataGeneration() {
    try {
        const profile = await createProfile();
        return profile;
    } catch (error) {
        console.error('Error generating profile:', error);
        return null;
    }
}
```

These examples demonstrate the basic usage patterns for IT-Faker. For more advanced use cases and detailed information about each module, refer to the specific module documentation.

## Command Line Interface

IT-Faker can also be used directly from the command line:

```bash
# First Names
npx it-faker firstName # Random first name
npx it-faker firstName -g female # Female name
npx it-faker firstName -g male -p -c 3 # 3 male names with titles

# Last Names
npx it-faker lastName # Random last name
npx it-faker lastName -r Lombardia # Regional surname
npx it-faker lastName -p Bolzano -c 5 # 5 surnames from Bolzano

# Complete Persons
npx it-faker person # Random person
npx it-faker person -g female -r Toscana # Female from Toscana
npx it-faker person -c 3 --with-address # 3 persons with addresses

# Addresses
npx it-faker address # Random address
npx it-faker address -p Milano # Address in Milano
npx it-faker address -r Lazio -c 4 # 4 addresses in Lazio

# Fiscal Codes
npx it-faker fiscal-code # Random fiscal code
npx it-faker fiscal-code -c 5 # 5 fiscal codes

