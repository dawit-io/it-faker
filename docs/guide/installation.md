# Installation

## Requirements
- Node.js (version 16 or higher)
- npm, yarn, or pnpm package manager
- RxJS (version 7 or higher) for Observable support

## Package Installation

You can install IT-Faker using your preferred package manager:

### npm
```bash
npm install @italia-tools/faker rxjs
```

### yarn
```bash
yarn add @italia-tools/faker rxjs
```

### pnpm
```bash
pnpm add @italia-tools/faker rxjs
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
// For Observable support
import { Observable } from 'rxjs';
```

### CommonJS
```javascript
const { itFaker } = require('@italia-tools/faker');
// For Observable support
const { Observable } = require('rxjs');
```

## Verification
To verify your installation, you can run these simple tests:

### Using Promises
```typescript
import { itFaker } from '@italia-tools/faker';

async function test() {
  // Should generate an Italian name
  const name = await itFaker.itPerson.firstName();
  console.log(name);
}

test();
```

### Using Observables
```typescript
import { itFaker } from '@italia-tools/faker';

// Should generate an Italian name
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
  // ...
})
export class MyComponent {
  italianNames$ = itFaker.itPerson.firstName$();
}
```

### React
You can use either Promises or Observables based on your needs:
```typescript
import { useState, useEffect } from 'react';
import { itFaker } from '@italia-tools/faker';

// Using Promises
const [name, setName] = useState('');
useEffect(() => {
  itFaker.itPerson.firstName().then(setName);
}, []);

// Using Observables
useEffect(() => {
  const subscription = itFaker.itPerson.firstName$().subscribe(setName);
  return () => subscription.unsubscribe();
}, []);
```

## Next Steps
- Check our [Getting Started](/guide/) guide for basic usage
- Explore [Examples](/examples/) to see IT-Faker in action
- Browse the [Modules](/modules/) documentation for detailed API information