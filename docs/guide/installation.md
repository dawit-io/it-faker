# Installation

## Requirements
- Node.js (version 16 or higher)
- npm, yarn, or pnpm package manager

## Package Installation

You can install IT-Faker using your preferred package manager:

### npm
```bash
npm install @it-tools/faker
```

### yarn
```bash
yarn add @it-tools/faker
```

### pnpm
```bash
pnpm add @it-tools/faker
```

## TypeScript Configuration
IT-Faker includes TypeScript definitions out of the box. No additional types package is needed.

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "esModuleInterop": true,
    // ... rest of your config
  }
}
```

## Basic Setup

### ES Modules (Recommended)
```typescript
import { itFaker } from '@it-tools/faker';
```

### CommonJS
```javascript
const { itFaker } = require('@it-tools/faker');
```

## Verification
To verify your installation, you can run this simple test:

```typescript
import { itFaker } from '@it-tools/faker';

// Should generate an Italian name
console.log(itFaker.names.firstName());
```

## Next Steps
- Check our [Getting Started](/guide/) guide for basic usage
- Explore [Examples](/examples/) to see IT-Faker in action
- Browse the [Modules](/modules/) documentation for detailed API information