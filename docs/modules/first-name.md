# FirstName Module

The FirstName module of IT-Faker provides methods for generating authentic Italian first names, with support for gender-specific names and professional titles (prefixes). The module uses real Italian demographic data to generate names with realistic frequency distribution - more common names like "Marco" or "Giuseppe" will appear more frequently than rare names, accurately reflecting real Italian naming patterns.

## Import

To use the FirstName module, import it from `@italia-tools/faker`:

```typescript
import { ItFaker } from '@italia-tools/faker';

const faker = new ItFaker();
```

## Available Methods

Each method is available in two variants:
- Promise-based (default)
- Observable-based (with `$` suffix)

### firstName(options?: FirstNameOptions)

Generates an Italian first name based on the provided options. The options allow specifying gender and whether to include a professional title.

```typescript
interface FirstNameOptions {
    gender?: 'male' | 'female';
    prefix?: boolean;
}

// Simple usage
const name = await faker.itFirstName.firstName(); // 'Marco'

// With specific gender
const femaleName = await faker.itFirstName.firstName({ gender: 'female' }); // 'Giulia'

// With professional title
const nameWithTitle = await faker.itFirstName.firstName({ 
    gender: 'male',
    prefix: true 
}); // 'Dott. Marco'

// Using Observables
faker.itFirstName.firstName$({ gender: 'female', prefix: true })
    .subscribe(name => console.log(name)); // 'Dott.ssa Maria'
```

### prefix(gender?: 'male' | 'female')

Generates an Italian professional title (prefix) appropriate to the specified gender. If no gender is specified, returns a neutral title.

Available titles:
- Male: 'Dott.', 'Ing.', 'Avv.', 'Prof.', 'Arch.', 'Rag.'
- Female: 'Dott.ssa', 'Ing.', 'Avv.', 'Prof.ssa', 'Arch.', 'Rag.'
- Neutral: 'Ing.', 'Avv.', 'Arch.', 'Rag.', 'Geom.'

```typescript
// Generate male prefix
const malePrefix = await faker.itFirstName.prefix('male'); // 'Dott.'

// Generate female prefix
const femalePrefix = await faker.itFirstName.prefix('female'); // 'Dott.ssa'

// Generate neutral prefix
const neutralPrefix = await faker.itFirstName.prefix(); // 'Ing.'

// Using Observables
faker.itFirstName.prefix$('female')
    .subscribe(prefix => console.log(prefix)); // 'Prof.ssa'
```

### preloadData()

Preloads the name data for faster subsequent operations. This is optional but recommended if you plan to generate many names.

```typescript
// Using Promises
await faker.itFirstName.preloadData();

// Using Observables
faker.itFirstName.preloadData$()
    .subscribe(() => console.log('Data preloaded'));
```

### clearCache()

Clears the cached name data, forcing a reload on the next operation.

```typescript
faker.itFirstName.clearCache();
```

## Complete Example

Here's an example that demonstrates various uses of the FirstName module:

```typescript
const faker = new ItFaker();

async function generateNames() {
    // Preload data for better performance
    await faker.itFirstName.preloadData();

    // Generate various types of names
    const examples = {
        simpleMaleName: await faker.itFirstName.firstName({ gender: 'male' }),
        simpleFemaleName: await faker.itFirstName.firstName({ gender: 'female' }),
        maleNameWithTitle: await faker.itFirstName.firstName({ 
            gender: 'male',
            prefix: true 
        }),
        femaleNameWithTitle: await faker.itFirstName.firstName({ 
            gender: 'female',
            prefix: true 
        }),
        randomName: await faker.itFirstName.firstName(),
        malePrefix: await faker.itFirstName.prefix('male'),
        femalePrefix: await faker.itFirstName.prefix('female'),
        neutralPrefix: await faker.itFirstName.prefix()
    };

    console.log(JSON.stringify(examples, null, 2));
}

// Example output:
// {
//     "simpleMaleName": "Marco",
//     "simpleFemaleName": "Giulia",
//     "maleNameWithTitle": "Dott. Giuseppe",
//     "femaleNameWithTitle": "Prof.ssa Maria",
//     "randomName": "Andrea",
//     "malePrefix": "Ing.",
//     "femalePrefix": "Dott.ssa",
//     "neutralPrefix": "Avv."
// }
```

## Using with Observables

The module also supports reactive programming with RxJS Observables:

```typescript
import { combineLatest } from 'rxjs';

const nameExamples$ = combineLatest({
    maleName: faker.itFirstName.firstName$({ gender: 'male' }),
    femaleName: faker.itFirstName.firstName$({ gender: 'female' }),
    titleName: faker.itFirstName.firstName$({ 
        gender: 'male',
        prefix: true 
    }),
    prefix: faker.itFirstName.prefix$('female')
});

nameExamples$.subscribe(examples => {
    console.log(JSON.stringify(examples, null, 2));
});
```

## Data Sources and Distribution

The FirstName module uses real Italian demographic data to generate names with authentic frequency distribution. The module implements a weighted random selection system where:

- Common names (e.g., "Marco", "Giuseppe", "Maria", "Anna") have a higher probability of being selected
- Less common names appear with lower frequency
- The distribution matches actual Italian demographic statistics

This ensures that generated data closely mirrors real-world Italian naming patterns, making it ideal for:
- Creating realistic test data
- Simulating authentic Italian user bases
- Developing demographically accurate mock databases

The name data is loaded dynamically and cached for performance, while maintaining the weighted distribution system throughout all operations.