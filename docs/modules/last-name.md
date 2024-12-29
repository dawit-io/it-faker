# LastName Module

The LastName module of IT-Faker provides methods for generating authentic Italian surnames with support for regional and provincial distribution patterns. This module generates surnames based on real demographic data, taking into account geographical variations in surname frequency across different regions and provinces of Italy.

## Import

To use the LastName module, import it from `@italia-tools/faker`:

```typescript
import { ItFaker } from '@italia-tools/faker';

const faker = new ItFaker();
```

## Available Methods

Each method is available in two variants:
- Promise-based (default)
- Observable-based (with `$` suffix)

### lastName(options?: LastNameOptions)

Generates an Italian surname based on the provided options. The options allow specifying a particular region or province to generate surnames typical of that area.

```typescript
interface LastNameOptions {
    region?: string;   // Italian region (e.g., 'Lombardia', 'Sicilia')
    province?: string; // Italian province (e.g., 'Milano', 'Palermo')
}

// Generate a random Italian surname
const surname = await faker.itLastName.lastName(); // 'Rossi'

// Generate a surname typical of Lombardia
const lombardiaSurname = await faker.itLastName.lastName({ 
    region: 'Lombardia' 
}); // 'Colombo'

// Generate a surname typical of Milano province
const milanoSurname = await faker.itLastName.lastName({ 
    province: 'Milano' 
}); // 'Ferrari'

// Using Observables
faker.itLastName.lastName$({ region: 'Sicilia' })
    .subscribe(surname => console.log(surname)); // 'Russo'
```

### preloadData()

Preloads the surname data for faster subsequent operations. This is optional but recommended if you plan to generate many surnames.

```typescript
// Using Promises
await faker.itLastName.preloadData();

// Using Observables
faker.itLastName.preloadData$()
    .subscribe(() => console.log('Data preloaded'));
```

### clearCache()

Clears the cached surname data, forcing a reload on the next operation.

```typescript
faker.itLastName.clearCache();
```

## Regional Distribution

A key feature of the LastName module is its ability to generate surnames based on regional distribution patterns. This means:

- Surnames are distributed according to real demographic data from different Italian regions
- Common surnames in specific regions appear more frequently when that region is specified
- The module accounts for historical migration patterns and regional surname concentrations

For example, surnames like:
- "Russo" are more common in southern regions
- "Colombo" appears more frequently in Lombardia
- "Rossi" has a higher frequency in central Italy

## Complete Example

Here's an example demonstrating various uses of the LastName module:

```typescript
const faker = new ItFaker();

async function generateSurnames() {
    // Preload data for better performance
    await faker.itLastName.preloadData();

    // Generate various types of surnames
    const examples = {
        // Random Italian surname
        randomSurname: await faker.itLastName.lastName(),

        // Regional examples
        lombardiaSurname: await faker.itLastName.lastName({ 
            region: 'Lombardia' 
        }),
        siciliaSurname: await faker.itLastName.lastName({ 
            region: 'Sicilia' 
        }),
        toscanaSurname: await faker.itLastName.lastName({ 
            region: 'Toscana' 
        }),

        // Provincial examples
        milanoSurname: await faker.itLastName.lastName({ 
            province: 'Milano' 
        }),
        palemoSurname: await faker.itLastName.lastName({ 
            province: 'Palermo' 
        })
    };

    console.log(JSON.stringify(examples, null, 2));
}

// Example output:
// {
//     "randomSurname": "Rossi",
//     "lombardiaSurname": "Colombo",
//     "siciliaSurname": "Romano",
//     "toscanaSurname": "Conti",
//     "milanoSurname": "Ferrari",
//     "palermoSurname": "Russo"
// }
```

## Using with Observables

The module supports reactive programming with RxJS Observables:

```typescript
import { combineLatest } from 'rxjs';

const surnameExamples$ = combineLatest({
    northernName: faker.itLastName.lastName$({ region: 'Lombardia' }),
    southernName: faker.itLastName.lastName$({ region: 'Sicilia' }),
    randomName: faker.itLastName.lastName$()
});

surnameExamples$.subscribe(examples => {
    console.log(JSON.stringify(examples, null, 2));
});
```

## Data Sources and Geographic Distribution

The LastName module uses real Italian demographic data to generate surnames with authentic geographical distribution patterns. The data includes:

- Regional surname frequencies
- Provincial distribution patterns
- Historical surname migration patterns
- Modern demographic trends

This ensures that generated surnames accurately reflect:
- Local naming traditions
- Regional cultural patterns
- Historical population movements
- Current demographic realities

The surname data is loaded dynamically and cached for performance while maintaining accuracy in geographical distribution patterns.