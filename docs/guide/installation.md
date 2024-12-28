# Installation

## Requirements
- Node.js (version 16 or higher)
- npm, yarn, or pnpm package manager

## Package Installation

You can install IT-Faker using your preferred package manager:

### npm
```bash
npm install @italia-tools/faker
```

### yarn
```bash
yarn add @italia-tools/faker
```

### pnpm
```bash
pnpm add @italia-tools/faker
```

## TypeScript Configuration
IT-Faker includes TypeScript definitions out of the box. No additional types package is needed.

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "lib": ["es2015", "dom"],  // Required for Promise support
    // ... rest of your config
  }
}
```

## Basic Setup

### ES Modules (Recommended)
```typescript
import { itFaker } from '@italia-tools/faker';
```

### CommonJS
```javascript
const { itFaker } = require('@italia-tools/faker');
```

## Verification
To verify your installation, you can run this simple test:

```typescript
import { itFaker } from '@italia-tools/faker';

async function test() {
  // Should generate an Italian name
  const name = await itFaker.itPerson.firstName();
  console.log(name);
}

test();
```

## Optional RxJS Support

If you need reactive programming support, you can install RxJS as an optional dependency:

```bash
npm install rxjs
```

Then you can use the Observable-based API:

```typescript
import { itFaker } from '@italia-tools/faker';
import { Observable } from 'rxjs';

itFaker.itPerson.firstName$().subscribe(name => {
  console.log(name);
});
```
## Framework Integration

### Angular
IT-Faker works seamlessly with Angular's RxJS-based architecture:
```typescript
import { Component } from '@angular/core';
import { itFaker } from '@italia-tools/faker';

@Component({
  selector: 'app-person',
  template: '{{ italianName$ | async }}'
})
export class PersonComponent {
  italianName$ = itFaker.itPerson.firstName$();
}
```

### React
You can use either Promises or Observables based on your needs:
```typescript
import { useState, useEffect } from 'react';
import { itFaker } from '@italia-tools/faker';

function PersonName() {
  const [name, setName] = useState('');
  
  // Using Promises
  useEffect(() => {
    itFaker.itPerson.firstName().then(setName);
  }, []);

  // Using Observables
  useEffect(() => {
    const subscription = itFaker.itPerson.firstName$().subscribe(setName);
    return () => subscription.unsubscribe();
  }, []);

  return <div>{name}</div>;
}
```

## Next Steps
- Check our [Getting Started](/guide/) guide for basic usage
- Explore [Examples](/examples/) to see IT-Faker in action
- Browse the [Modules](/modules/) documentation for detailed API information