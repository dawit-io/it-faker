# Getting Started with IT-Faker

## Introduction
IT-Faker is a specialized data generation library built on top of Faker.js, specifically designed for generating realistic Italian data. It provides coherent and statistically accurate data generation for Italian names, addresses, fiscal codes, and more. All methods support both Promise-based and Observable patterns for flexible integration in any application.

## Key Features
- 🗺 **Coherent Geographic Data**: Generate consistent combinations of cities, provinces, and regions
- 👤 **Realistic Personal Data**: Names based on ISTAT statistics and region-specific surnames
- 📝 **Valid Fiscal Codes**: Generate fiscal codes that match the person's data
- 📍 **Accurate Addresses**: Create consistent Italian addresses
- 📊 **Statistical Accuracy**: Name distribution based on real Italian demographics
- ⚡ **Async Patterns**: Full support for both Promises and Observables

## Installation

```bash
# Using npm
npm install @italia-tools/faker

# Using yarn
yarn add @italia-tools/faker

# Using pnpm
pnpm add @italia-tools/faker
```

## Basic Usage

### Importing the Library
```typescript
import { itFaker } from '@italia-tools/faker';
```

### Generate Coherent Personal Data

Using Promises:
```typescript
// Generate a complete person with consistent data
const person = await itFaker.itPerson.generatePerson();
// Returns an object with name, surname, fiscal code, and address
// All data is coherent (e.g., fiscal code matches the person's details)

// Generate individual components
const name = await itFaker.itPerson.firstName({ gender: 'female' });     // Statistically accurate Italian first name
const surname = await itFaker.itPerson.lastName();    // Random last name
const fullName = await itFaker.itPerson.fullName({ gender: 'male' }); // Full name
const fiscalCode = await itFaker.itPerson.fiscalCode(); // Valid Italian fiscal code
const localPerson = await itFaker.itPerson.generatePerson({ province: 'Bolzano' }); // Last name based on the actual distribution in the province
```

Using Observables:
```typescript
// Generate a complete person with consistent data
itFaker.itPerson.generatePerson$().subscribe(person => {
  console.log(person);
});

// Generate individual components
itFaker.itPerson.firstName$({ gender: 'female' }).subscribe(name => {
  console.log(name);
});

itFaker.itPerson.lastName$().subscribe(surname => {
  console.log(surname);
});
```

### Generate Location Data

Using Promises:
```typescript
// Generate coherent geographic data
const address = await itFaker.itPlace.fullAddress();
// Returns a complete Italian address with consistent city, province, and region

// Generate specific location components
const randomCity = await itFaker.itPlace.randomCity();         // Real Italian city with name, code, zone, province and region
const cityByRegion = await itFaker.itPlace.city({ region: 'Lombardia' }); // City matching the region/province
const region = await itFaker.places.region();     // Random italian region
```

Using Observables:
```typescript
itFaker.itPlace.fullAddress$().subscribe(address => {
  console.log(address);
});

itFaker.itPlace.randomCity$().subscribe(city => {
  console.log(city);
});
```

## TypeScript Support
IT-Faker is written in TypeScript and provides full type definitions out of the box. All generated data comes with proper typing:

```typescript
interface Person {
  firstName: string;
  lastName: string;
  fiscalCode: string;
  address: Address;
}

interface Address {
  street: string;
  city: string;
  province: string;
  region: string;
  zipCode: string;
}
```

## Async Patterns
IT-Faker provides two ways to handle asynchronous operations:

### Promise-based API
All methods return Promises by default and can be used with async/await:

```typescript
async function generateProfile() {
  const person = await itFaker.itPerson.generatePerson();
  const address = await itFaker.itPlace.fullAddress();
  return { ...person, address };
}
```

### Observable-based API
All methods have an Observable counterpart with a `$` suffix:

```typescript
itFaker.itPerson.generatePerson$().pipe(
  switchMap(person => 
    itFaker.itPlace.fullAddress$().pipe(
      map(address => ({ ...person, address }))
    )
  )
).subscribe(profile => {
  console.log(profile);
});
```

## Integration with Faker.js
Although we recommend using IT-Faker as it takes into account the actual Italian statistical distribution of data, you can still use the standard Faker.js methods. IT-Faker extends Faker.js's Italian locale by adding functionalities specific to the Italian context. You can use it alongside standard Faker.js methods, taking advantage of both the basic features and specialized Italian data generation:

```typescript
// Mix IT-Faker with regular Faker.js methods
const firstName = await itFaker.itPerson.firstName(); // IT-Faker format
const email = itFaker.person.firstName();     // Regular Faker.js method
```

## Next Steps
- Check out the [Modules](/modules/) section for detailed documentation of each module
- See [Examples](/examples/basic-usage) for more usage patterns
- Explore the complete [API Reference](/api/) for all available methods