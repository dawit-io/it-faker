# Italian Person Module

<script setup>
import PersonDemo from '../.vitepress/theme/components/PersonDemo.vue'
</script>

The `ItPersonModule` provides methods for generating realistic personal data in the Italian context, including names, fiscal codes, email addresses, and phone numbers.

## Installation

```bash
npm i @italia-tools/faker
```

## Basic Usage

```typescript
import { ItFaker } from '@italia-tools/faker';

const faker = new ItFaker();
```

## Demo

<ClientOnly>
  <PersonDemo />
</ClientOnly>

## Available Methods

### firstName(gender?: 'male' | 'female')

Generates an Italian first name. If gender is specified, returns a male or female name accordingly.

```typescript
const faker = new ItFaker();

console.log(faker.itPerson.firstName({ gender: 'male'})); // 'Marco'
console.log(faker.itPerson.firstName({ gender: 'female'})); // 'Giulia'
```

### lastName()

Generate common italian surname.

```typescript
const faker = new ItFaker();

console.log(faker.itPerson.lastName()); // 'Rossi'
```

### Generate a Person with Specific Province

Generate an Italian last name based on real last name distribution.

```typescript
const faker = new ItFaker();
const localPerson = itFaker.itPerson.generatePerson({ province: 'Bolzano' })
console.log(localPerson.lastName); // 'Gruber'
```

<view-source />

### fullName(gender?: 'male' | 'female')

Generates a complete Italian name, optionally specifying gender.

```typescript
const faker = new ItFaker();

console.log(faker.itPerson.fullName('male')); // 'Marco Rossi'
console.log(faker.itPerson.fullName('female')); // 'Giulia Bianchi'
```

<view-source />

### prefix(gender: 'male' | 'female')

Generates an Italian professional title appropriate to the gender.

```typescript
const faker = new ItFaker();

console.log(faker.itPerson.prefix('male')); // 'Dott.'
console.log(faker.itPerson.prefix('female')); // 'Dott.ssa'
```

<view-source />

### fullNameWithTitle(gender?: 'male' | 'female')

Generates a complete name with professional title.

```typescript
const faker = new ItFaker();

console.log(faker.itPerson.fullNameWithTitle('male')); // 'Dott. Marco Rossi'
console.log(faker.itPerson.fullNameWithTitle('female')); // 'Dott.ssa Giulia Bianchi'
```

<view-source />

### fiscalCode()

Generates a valid Italian fiscal code based on random personal data.

```typescript
const faker = new ItFaker();

console.log(faker.itPerson.fiscalCode()); // 'RSSMRC80A01H501X'
```

<view-source />

### birthPlace()

Generates an Italian city of birth.

```typescript
const faker = new ItFaker();

console.log(faker.itPerson.birthPlace()); // 'Roma'
```

<view-source />

### province()

Returns an object containing the name and code of an Italian province.

```typescript
const faker = new ItFaker();

console.log(faker.itPerson.province()); // { name: 'Roma', code: 'RM' }
```

<view-source />

### birthDate()

Generates a random birth date between 1950 and 2005.

```typescript
const faker = new ItFaker();

console.log(faker.itPerson.birthDate()); // 1980-01-01T00:00:00.000Z
```

<view-source />

### phone()

Generates a valid Italian mobile phone number.

```typescript
const faker = new ItFaker();

console.log(faker.itPerson.phone()); // '3201234567'
```

<view-source />

### landline()

Generates a valid Italian landline phone number.

```typescript
const faker = new ItFaker();

console.log(faker.itPerson.landline()); // '0612345678'
```

<view-source />

### email(firstName?: string, lastName?: string)

Generates an email address optionally based on specific first and last names.

```typescript
const faker = new ItFaker();

console.log(faker.itPerson.email()); // 'marco.rossi@gmail.com'
console.log(faker.itPerson.email('giuseppe', 'verdi')); // 'giuseppe.verdi@libero.it'
```

<view-source />

### pec(firstName?: string, lastName?: string)

Generates a PEC (Certified Electronic Mail) address optionally based on specific first and last names.

```typescript
const faker = new ItFaker();

console.log(faker.itPerson.pec()); // 'marco.rossi@pec.it'
console.log(faker.itPerson.pec('giuseppe', 'verdi')); // 'giuseppe.verdi@legalmail.it'
```

<view-source />

## Complete Example

Here's an example that uses various module methods to generate a complete personal profile:

```typescript
const faker = new ItFaker();

const profile = {
    title: faker.itPerson.prefix('male'),
    fullName: faker.itPerson.fullName('male'),
    fiscalCode: faker.itPerson.fiscalCode(),
    birthDate: faker.itPerson.birthDate(),
    birthPlace: faker.itPerson.birthPlace(),
    province: faker.itPerson.province(),
    phone: faker.itPerson.phone(),
    email: faker.itPerson.email(),
    pec: faker.itPerson.pec()
};

console.log(JSON.stringify(profile, null, 2));
```

<ClientOnly>
  <PersonDemo />
</ClientOnly>