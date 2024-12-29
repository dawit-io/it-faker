
# IT-Faker Modules Overview

IT-Faker provides a comprehensive suite of modules for generating authentic Italian test data. Each module is specialized in a specific domain of Italian data generation, from personal information to geographic locations, ensuring that all generated data follows real Italian patterns, distributions, and formats.

<script setup>
import PersonDemo from '../.vitepress/theme/components/PersonDemo.vue'
</script>

## Interactive Demo

<ClientOnly>
  <PersonDemo />
</ClientOnly>

## Core Features

- Real demographic data distributions
- Regional and provincial variations
- Italian formatting standards
- Both Promise and Observable patterns support
- Comprehensive data validation
- Official administrative codes
- Data caching for performance

## Available Modules

### Person Module
Generate complete Italian personal profiles including:
- First names with gender specificity
- Last names with regional distribution
- Professional titles (e.g., Dott., Ing., Prof.)
- Italian fiscal codes
- Phone numbers and email addresses
- PEC (Certified Email) addresses

```typescript
const person = await faker.itPerson.generatePerson({
    gender: 'male',
    region: 'Lombardia',
    withTitle: true
});
// { fullName: "Dott. Marco Rossi", ... }
```

### FirstName Module
Specialized in generating authentic Italian first names:
- Gender-specific name generation
- Professional title support
- Real demographic frequency distribution
- Common names appear more frequently
- Regional name variations

```typescript
const name = await faker.itFirstName.firstName({
    gender: 'female',
    prefix: true
}); // "Dott.ssa Maria"
```

### LastName Module
Generate Italian surnames with geographic authenticity:
- Regional surname distributions
- Provincial variations reflecting local cultural identity
- Historical migration patterns
- Demographic accuracy
- Family name frequencies
- Bilingual area surname patterns

```typescript
// Regional examples
const sicilianSurname = await faker.itLastName.lastName({
    region: 'Sicilia'
}); // "Romano"

// Provincial examples showing cultural variations
const bolzanoSurname = await faker.itLastName.lastName({
    province: 'Bolzano'
}); // "Mair" (reflecting German-speaking majority)

const milanSurname = await faker.itLastName.lastName({
    province: 'Milano'
}); // "Colombo"
```

### Places Module
Comprehensive Italian and international geographic data:
- Italian cities with population data
- Provinces and regions
- Administrative codes
- International country information
- Geographic hierarchies
- Demographic statistics

```typescript
const city = await faker.itPlaces.randomCity();
// { name: "Milano", population: 1378689, ... }
```

### Address Module
Generate authentic Italian addresses:
- Street names with weighted type distribution
- Building numbers with Italian formatting
- Complete addresses with postal codes
- Apartment details
- Regional variations
- Official administrative codes

```typescript
const address = await faker.itAddress.completeAddress({
    region: 'Lazio'
}); // "Via Giuseppe Garibaldi, 42, 00100 Roma (RM)"
```

### Fiscal Code Module
Generate valid Italian fiscal codes:
- Consistent with personal data
- Valid checksum calculation
- Birth place validation
- Gender encoding
- Official format compliance

```typescript
const fiscalCode = await faker.itFiscalCode.generate({
    firstName: 'Mario',
    lastName: 'Rossi',
    gender: Gender.Male
}); // "RSSMRC80A01H501X"
```

## Module Integration

All modules are designed to work together seamlessly, allowing you to generate consistent data across different domains:

```typescript
const faker = new ItFaker();

async function generateCompleteProfile() {
    const region = 'Toscana';
    
    const profile = {
        personal: await faker.itPerson.generatePerson({ region }),
        address: await faker.itAddress.completeAddress({ region }),
        contacts: {
            phone: await faker.itPerson.phone(),
            email: await faker.itPerson.email(),
            pec: await faker.itPerson.pec()
        },
        birthPlace: await faker.itPlaces.getBirthPlace()
    };

    return profile;
}
```

## Data Authenticity

Each module ensures authenticity through:
- Real demographic data
- Official administrative codes
- Actual geographic information
- Valid document formats
- Regional cultural patterns
- Historical naming conventions

This makes IT-Faker ideal for:
- Testing Italian applications
- Creating demo environments
- Data migration testing
- UI/UX prototyping
- Integration testing
- Performance testing with realistic data

## Performance Optimization

All modules support:
- Data preloading
- Caching mechanisms
- Batch operations
- Asynchronous processing
- Observable streams
- Memory management

```typescript
// Preload data for better performance
await faker.itFirstName.preloadData();
await faker.itLastName.preloadData();
await faker.itPlaces.preloadData();
```

## Observable Support

Every module method is available in both Promise-based and Observable-based variants:

```typescript
// Promise-based
const name = await faker.itFirstName.firstName();

// Observable-based
faker.itFirstName.firstName$()
    .subscribe(name => console.log(name));
```

This makes IT-Faker suitable for both traditional asynchronous programming and reactive applications.