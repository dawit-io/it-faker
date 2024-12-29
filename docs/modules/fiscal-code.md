# Fiscal Code Module

The Fiscal Code module of IT-Faker provides methods to generate valid Italian fiscal codes that are consistent with the person's demographic data.

## Interactive Demo

Try generating a fiscal code right away with our interactive demo:
<script setup>
import FiscalCodeDemo from '../.vitepress/theme/components/FiscalCodeDemo.vue'
</script>

<ClientOnly>
  <FiscalCodeDemo />
</ClientOnly>

## Import

To use the Fiscal Code module, import it from `@italia-tools/faker`:

```typescript
import { ItFaker } from '@italia-tools/faker';

const faker = new ItFaker();
```

## Generating Fiscal Codes

The Fiscal Code module exposes two main methods for generating fiscal codes: `generate` and `generate$`.

### `generate(options?: FiscalCodeOptions): Promise<string>`

Generates a fiscal code based on the provided options. Returns a Promise that resolves to the generated fiscal code.

```typescript
const fiscalCode = await faker.itFiscalCode.generate({
  firstName: 'Mario',
  lastName: 'Rossi',  
  gender: Gender.Male,
  birthDate: new Date(1980, 0, 1),
  birthPlace: { name: 'Roma' }
});
```

### `generate$(options?: FiscalCodeOptions): Observable<string>`

Observable variant of `generate`. Generates a fiscal code based on the provided options and emits it as an Observable.

```typescript
faker.itFiscalCode.generate$({
  firstName: 'Mario',
  lastName: 'Rossi',
  gender: Gender.Male, 
  birthDate: new Date(1980, 0, 1),
  birthPlace: { name: 'Roma' }  
}).subscribe(fiscalCode => {
  console.log(fiscalCode);
});
```

### Generation Options

Both methods accept an optional `FiscalCodeOptions` object with the following properties:

- `firstName?: string`: The person's first name.
- `lastName?: string`: The person's last name.
- `gender?: Gender`: The person's gender (`Gender.Male` or `Gender.Female`).
- `birthDate?: Date`: The person's date of birth.
- `birthPlace?: { name?: string, belfioreCode?: string }`: The person's place of birth, specified as either the city name or Belfiore code.

If some options are not provided, consistent random values will be generated for the missing data.

## Birth Place Validation 

The Fiscal Code module supports validation of the provided birth place in the options. The place can be specified in two ways:

- By the city name (`birthPlace.name`): A match will be searched in the database of Italian cities. 
- By the Belfiore code (`birthPlace.belfioreCode`): It will be verified that it's a valid code.

If the provided birth place is not valid, an error will be thrown.

## Examples

Quickly generating a fiscal code with random data:

```typescript
const fiscalCode = await faker.itFiscalCode.generate();
// Example output: "RSSMRA90A01H501W"
```

You can invoke the `generate` method without any parameters to quickly get a valid fiscal code with randomly generated data. This is useful when you need a fiscal code immediately without specifying any personal details.


Generating a fiscal code with specified data:

```typescript
const fiscalCode = await faker.itFiscalCode.generate({
  firstName: 'Mario',
  lastName: 'Rossi',
  gender: Gender.Male,
  birthDate: new Date(1980, 0, 1), 
  birthPlace: { name: 'Roma' }
});
```

Generating a fiscal code with an Observable:

```typescript
faker.itFiscalCode.generate$({ birthPlace: { name: 'Milano' } })
  .subscribe(fiscalCode => {
    console.log(fiscalCode); 
  });
```