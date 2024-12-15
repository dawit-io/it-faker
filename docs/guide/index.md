# Getting Started with IT-Faker

## Introduction
IT-Faker is a specialized data generation library built on top of Faker.js, specifically designed for generating realistic Italian data. It provides coherent and statistically accurate data generation for Italian names, addresses, fiscal codes, and more.

## Key Features
- 🗺 **Coherent Geographic Data**: Generate consistent combinations of cities, provinces, and regions
- 👤 **Realistic Personal Data**: Names based on ISTAT statistics and region-specific surnames
- 📝 **Valid Fiscal Codes**: Generate fiscal codes that match the person's data
- 📍 **Accurate Addresses**: Create consistent Italian addresses
- 📊 **Statistical Accuracy**: Name distribution based on real Italian demographics

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
```typescript
// Generate a complete person with consistent data
const person = itFaker.person.generate();
// Returns an object with name, surname, fiscal code, and address
// All data is coherent (e.g., fiscal code matches the person's details)

// Generate individual components
const name = itFaker.names.firstName();     // Statistically accurate Italian first name
const surname = itFaker.lastNames.get();    // Region-specific last name
const fiscalCode = itFaker.fiscalCode.get(); // Valid Italian fiscal code
```

### Generate Location Data
```typescript
// Generate coherent geographic data
const address = itFaker.addresses.get();
// Returns a complete Italian address with consistent city, province, and region

// Generate specific location components
const city = itFaker.places.city();         // Real Italian city
const province = itFaker.places.province(); // Province matching the region
const region = itFaker.places.region();     // Italian region
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

## Integration with Faker.js
IT-Faker extends the Italian locale of Faker.js with additional functionalities specific to the Italian context. You can use it alongside regular Faker.js methods while having access to specialized Italian data generation:

```typescript
// Mix IT-Faker with regular Faker.js methods
const phoneNumber = itFaker.phone.number(); // Italian format
const email = itFaker.internet.email();     // Regular Faker.js method
```

## Next Steps
- Check out the [Modules](/modules/) section for detailed documentation of each module
- See [Examples](/examples/basic-usage) for more usage patterns
- Explore the complete [API Reference](/api/) for all available methods