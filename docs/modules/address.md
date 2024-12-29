# Address Module

The Address module of IT-Faker provides methods for generating authentic Italian addresses, including street names, building numbers, and complete addresses. The module uses real Italian address patterns and naming conventions, with weighted probabilities to ensure realistic distributions of street types.

## Import

To use the Address module, import it from `@italia-tools/faker`:

```typescript
import { ItFaker } from '@italia-tools/faker';

const faker = new ItFaker();
```

## Available Methods

Each method is available in two variants:
- Promise-based (default)
- Observable-based (with `$` suffix)

### streetName(region?)/streetName$(region?)

Generates an Italian street name following authentic naming patterns. Optionally accepts a region parameter to generate region-specific names.

Street names are generated using various authentic Italian patterns including:
- Historical figures (e.g., "Giuseppe Garibaldi", "Dante Alighieri")
- Saints (e.g., "San Francesco", "Santa Maria")
- Important dates (e.g., "XX Settembre", "XXV Aprile")
- Cultural references (e.g., "della Repubblica", "dell'Unità")
- Geographical references (e.g., "Monte Bianco", "Vesuvio")

```typescript
// Generate a random street name
const streetName = await faker.itAddress.streetName();
// "Giuseppe Garibaldi"

// Generate a region-specific street name
const regionalName = await faker.itAddress.streetName('Lombardia');
// Includes surnames typical of Lombardia

// Using Observables
faker.itAddress.streetName$('Toscana')
    .subscribe(name => console.log(name));
```

### streetAddress(options?)/streetAddress$(options?)

Generates a complete street address with building number. The street type is selected using weighted probabilities to match real Italian street type distributions.

Street types distribution:
- Via (70% - Most common)
- Viale (8%)
- Piazza (8%)
- Corso (5%)
- Largo (3%)
- Vicolo (2%)
- And others with lower probabilities (Lungomare, Strada, Salita, etc.)

```typescript
interface AddressOptions {
    region?: string;
}

// Generate a random street address
const address = await faker.itAddress.streetAddress();
// "Via Giuseppe Garibaldi, 42"

// Generate a region-specific address
const regionalAddress = await faker.itAddress.streetAddress({ 
    region: 'Toscana' 
});
// "Piazza della Repubblica, 15"

// Using Observables
faker.itAddress.streetAddress$({ region: 'Lazio' })
    .subscribe(address => console.log(address));
```

### completeAddress(options?)/completeAddress$(options?)

Generates a complete Italian address including street, building number, postal code, city, and province code. May also include apartment details (5% probability).

```typescript
// Generate a complete random address
const fullAddress = await faker.itAddress.completeAddress();
// "Via Giuseppe Garibaldi, 42, 20123 Milano (MI)"

// With apartment details (5% probability)
// "Via Giuseppe Garibaldi, 42 Scala A, Piano 3, Interno 7, 20123 Milano (MI)"

// Generate a region-specific complete address
const regionalFullAddress = await faker.itAddress.completeAddress({ 
    region: 'Toscana' 
});
// "Piazza della Repubblica, 15, 50123 Firenze (FI)"

// Using Observables
faker.itAddress.completeAddress$({ region: 'Lazio' })
    .subscribe(address => console.log(address));
```

## Address Components

### Building Numbers
- Basic number (1-300)
- Optional suffix (5% probability): A, B, /a, /b, bis

### Apartment Details (5% probability of inclusion)
- Building/Staircase (Scala A, B, C)
- Floor number (Piano 0-8)
- Apartment number (Interno 1-15)
- Optional internal letter (20% probability): a, b

## Complete Example

Here's an example demonstrating various uses of the Address module:

```typescript
const faker = new ItFaker();

async function generateAddresses() {
    const examples = {
        // Basic street name
        streetName: await faker.itAddress.streetName(),
        
        // Regional street name
        regionalStreetName: await faker.itAddress.streetName('Lombardia'),
        
        // Basic street address
        streetAddress: await faker.itAddress.streetAddress(),
        
        // Regional street address
        regionalStreetAddress: await faker.itAddress.streetAddress({ 
            region: 'Toscana' 
        }),
        
        // Complete address
        completeAddress: await faker.itAddress.completeAddress(),
        
        // Regional complete address
        regionalCompleteAddress: await faker.itAddress.completeAddress({ 
            region: 'Lazio' 
        })
    };

    console.log(JSON.stringify(examples, null, 2));
}

// Example output:
// {
//     "streetName": "Giuseppe Garibaldi",
//     "regionalStreetName": "Colombo",
//     "streetAddress": "Via Giuseppe Garibaldi, 42",
//     "regionalStreetAddress": "Piazza della Repubblica, 15",
//     "completeAddress": "Via Giuseppe Garibaldi, 42, 20123 Milano (MI)",
//     "regionalCompleteAddress": "Viale dei Fori Imperiali, 100, 00186 Roma (RM)"
// }
```

## Using with Observables

The module fully supports reactive programming with RxJS Observables:

```typescript
import { combineLatest } from 'rxjs';

const addressExamples$ = combineLatest({
    milan: faker.itAddress.completeAddress$({ region: 'Lombardia' }),
    rome: faker.itAddress.completeAddress$({ region: 'Lazio' }),
    florence: faker.itAddress.completeAddress$({ region: 'Toscana' })
});

addressExamples$.subscribe(addresses => {
    console.log(JSON.stringify(addresses, null, 2));
});
```

## Authenticity Features

The Address module ensures authenticity through:
- Weighted street type distribution matching real Italian usage
- Authentic naming patterns using historical figures, saints, and cultural references
- Region-specific surname integration
- Correct postal code formats
- Province code conventions
- Realistic apartment numbering systems
- Proper Italian address formatting