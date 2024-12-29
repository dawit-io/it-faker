# Examples Overview

IT-Faker provides powerful tools for generating authentic Italian data. This section demonstrates common use cases and patterns through practical examples.

## Real-World Scenarios

### User Registration System
Generate realistic Italian user profiles for testing registration systems:

```typescript
const faker = new ItFaker();

async function generateUser() {
    const region = 'Lombardia';
    const gender = 'male';

    const user = {
        // Personal information
        title: await faker.itPerson.prefix(gender),
        firstName: await faker.itFirstName.firstName({ gender }),
        lastName: await faker.itLastName.lastName({ region }),
        fiscalCode: await faker.itFiscalCode.generate(),
        birthDate: await faker.itPerson.birthDate(),
        
        // Contact details
        email: await faker.itPerson.email(),
        pec: await faker.itPerson.pec(),
        phone: await faker.itPerson.phone(),
        
        // Address
        address: await faker.itAddress.completeAddress({ region })
    };

    return user;
}

// Example output:
// {
//     "title": "Dott.",
//     "firstName": "Marco",
//     "lastName": "Colombo",
//     "fiscalCode": "CLMMRC80A01F205X",
//     "birthDate": "1980-01-01T00:00:00.000Z",
//     "email": "marco.colombo@gmail.com",
//     "pec": "marco.colombo@pec.it",
//     "phone": "3201234567",
//     "address": "Via Giuseppe Garibaldi, 42, 20123 Milano (MI)"
// }
```

### Medical Office System
Generate patient records with region-specific data:

```typescript
const faker = new ItFaker();

async function generatePatient() {
    const gender = 'female';
    const region = 'Toscana';
    
    const patient = {
        // Medical professional
        doctor: {
            title: await faker.itPerson.prefix('male'),
            fullName: await faker.itPerson.fullNameWithTitle('male')
        },
        
        // Patient information
        patient: {
            fullName: await faker.itPerson.fullName({ gender }),
            fiscalCode: await faker.itFiscalCode.generate({ gender }),
            birthPlace: await faker.itPlaces.getBirthPlace(),
            address: await faker.itAddress.completeAddress({ region }),
            contacts: {
                phone: await faker.itPerson.phone(),
                email: await faker.itPerson.email()
            }
        }
    };

    return patient;
}
```

### Business Directory
Create a database of Italian businesses with regional distribution:

```typescript
const faker = new ItFaker();

async function generateBusinesses(count: number) {
    const businesses = [];
    
    for (let i = 0; i < count; i++) {
        const region = await faker.itPlaces.region();
        const city = await faker.itPlaces.city({ region });
        
        businesses.push({
            owner: {
                title: await faker.itPerson.prefix('male'),
                name: await faker.itPerson.fullName({ gender: 'male' })
            },
            company: {
                address: await faker.itAddress.completeAddress({ region }),
                city: city.name,
                province: city.province.name,
                contacts: {
                    phone: await faker.itPerson.landline(),
                    pec: await faker.itPerson.pec()
                }
            }
        });
    }
    
    return businesses;
}
```

### School System
Generate student and teacher records with provincial distribution:

```typescript
const faker = new ItFaker();

async function generateSchoolData() {
    const province = 'Bolzano';
    
    const schoolData = {
        teachers: await Promise.all(Array(5).fill(null).map(async () => ({
            title: await faker.itPerson.prefix('female'),
            lastName: await faker.itLastName.lastName({ province }), // Will generate typical Südtirol surnames
            firstName: await faker.itFirstName.firstName({ gender: 'female' }),
            email: await faker.itPerson.email()
        }))),
        
        students: await Promise.all(Array(20).fill(null).map(async () => ({
            fullName: await faker.itPerson.fullName({ gender: 'male' }),
            fiscalCode: await faker.itFiscalCode.generate(),
            birthPlace: await faker.itPlaces.getBirthPlace()
        })))
    };

    return schoolData;
}
```

## Data Distribution Examples

### Regional Name Distribution
Generate names showing regional variations:

```typescript
const faker = new ItFaker();

async function showRegionalDistribution() {
    const regions = {
        sudtirol: await Promise.all(Array(5).fill(null).map(() => 
            faker.itLastName.lastName({ province: 'Bolzano' })
        )), // ["Mair", "Hofer", "Gruber", ...]
        
        sicily: await Promise.all(Array(5).fill(null).map(() => 
            faker.itLastName.lastName({ region: 'Sicilia' })
        )), // ["Russo", "Romano", "Ferrari", ...]
        
        lombardy: await Promise.all(Array(5).fill(null).map(() => 
            faker.itLastName.lastName({ region: 'Lombardia' })
        )) // ["Colombo", "Ferrari", "Bianchi", ...]
    };

    return regions;
}
```

# Basic Usage

Getting started with IT-Faker is straightforward. This guide shows you how to use the basic features of each module.

## Installation

```bash
npm install @italia-tools/faker
```

## Quick Start

```typescript
import { ItFaker } from '@italia-tools/faker';

const faker = new ItFaker();
```

## Basic Examples by Module

### Person Module
```typescript
// Generate basic personal information
const firstName = await faker.itFirstName.firstName();
const lastName = await faker.itLastName.lastName();
const fullName = await faker.itPerson.fullName({ gender: 'male' });
const phone = await faker.itPerson.phone();
const email = await faker.itPerson.email();
```

### Address Module
```typescript
// Generate addresses
const streetName = await faker.itAddress.streetName();
const streetAddress = await faker.itAddress.streetAddress();
const fullAddress = await faker.itAddress.completeAddress();
```

### Places Module
```typescript
// Generate geographic data
const city = await faker.itPlaces.randomCity();
const province = await faker.itPlaces.province();
const region = await faker.itPlaces.region();
```

### Fiscal Code Module
```typescript
// Generate fiscal code
const fiscalCode = await faker.itFiscalCode.generate();
```

## Using Observables

Every method is available in an Observable variant:

```typescript
// Using Observables
faker.itPerson.fullName$({ gender: 'female' })
    .subscribe(name => console.log(name));

faker.itAddress.completeAddress$({ region: 'Lazio' })
    .subscribe(address => console.log(address));
```

## Working with Regions

Generate region-specific data:

```typescript
async function generateRegionalData(region: string) {
    return {
        person: {
            lastName: await faker.itLastName.lastName({ region }),
            address: await faker.itAddress.completeAddress({ region })
        },
        geography: {
            city: await faker.itPlaces.city({ region }),
            randomCity: await faker.itPlaces.randomCity()
        }
    };
}
```

## Data Preloading

Optimize performance by preloading data:

```typescript
async function initialize() {
    // Preload all necessary data
    await Promise.all([
        faker.itFirstName.preloadData(),
        faker.itLastName.preloadData(),
        faker.itPlaces.preloadData()
    ]);
    
    console.log('Data preloaded, ready to generate');
}
```

## Error Handling

Handle potential errors gracefully:

```typescript
async function safeGenerate() {
    try {
        const data = await faker.itFiscalCode.generate({
            firstName: 'Mario',
            lastName: 'Rossi',
            birthPlace: { name: 'Roma' }
        });
        return data;
    } catch (error) {
        console.error('Error generating fiscal code:', error);
        return null;
    }
}
```

These examples demonstrate the basic usage of IT-Faker's core features. For more advanced usage and specific scenarios, refer to the individual module documentation.