# Person Module

<script setup>
import PersonDemo from '../.vitepress/theme/components/PersonDemo.vue'
</script>

IT-Faker provides various modules for generating different types of Italian data. Each module is specialized in a specific domain and all methods support both Promise-based and Observable patterns.

The `ItPersonModule` is one of the core modules, providing methods for generating realistic personal data in the Italian context. This includes names following regional distributions, fiscal codes, email addresses, and phone numbers.

## Interactive Demo

<ClientOnly>
  <PersonDemo />
</ClientOnly>

## Available Methods

Each method is available in two variants:
- Promise-based (default)
- Observable-based (with `$` suffix)

### firstName(gender?: 'male' | 'female')

Generates an Italian first name. If gender is specified, returns a male or female name accordingly.

```typescript
const faker = new ItFaker();

// Using Promises
await faker.itPerson.firstName({ gender: 'male' }); // 'Marco'
await faker.itPerson.firstName({ gender: 'female' }); // 'Giulia'

// Using Observables
faker.itPerson.firstName$({ gender: 'male' }).subscribe(name => console.log(name)); // 'Marco'
faker.itPerson.firstName$({ gender: 'female' }).subscribe(name => console.log(name)); // 'Giulia'
```

### lastName()

Generate common italian surname.

```typescript
const faker = new ItFaker();

// Using Promises
const surname = await faker.itPerson.lastName(); // 'Rossi'

// Using Observables
faker.itPerson.lastName$().subscribe(surname => console.log(surname)); // 'Rossi'
```

### Generate a Person with Specific Province

Generate an Italian last name based on real last name distribution.

```typescript
const faker = new ItFaker();

// Using Promises
const localPerson = await faker.itPerson.generatePerson({ province: 'Bolzano' });
console.log(localPerson.lastName); // 'Gruber'

// Using Observables
faker.itPerson.generatePerson$({ province: 'Bolzano' })
  .subscribe(person => console.log(person.lastName)); // 'Gruber'
```

<view-source />

### fullName(gender?: 'male' | 'female')

Generates a complete Italian name, optionally specifying gender.

```typescript
const faker = new ItFaker();

// Using Promises
await faker.itPerson.fullName({ gender: 'male' }); // 'Marco Rossi'
await faker.itPerson.fullName({ gender: 'female' }); // 'Giulia Bianchi'

// Using Observables
faker.itPerson.fullName$({ gender: 'male' }).subscribe(name => console.log(name));
faker.itPerson.fullName$({ gender: 'female' }).subscribe(name => console.log(name));
```

<view-source />

### prefix(gender: 'male' | 'female')

Generates an Italian professional title appropriate to the gender.

```typescript
const faker = new ItFaker();

// Using Promises
await faker.itPerson.prefix('male'); // 'Dott.'
await faker.itPerson.prefix('female'); // 'Dott.ssa'

// Using Observables
faker.itPerson.prefix$('male').subscribe(prefix => console.log(prefix));
faker.itPerson.prefix$('female').subscribe(prefix => console.log(prefix));
```

<view-source />

### fullNameWithTitle(gender?: 'male' | 'female')

Generates a complete name with professional title.

```typescript
const faker = new ItFaker();

// Using Promises
await faker.itPerson.fullNameWithTitle('male'); // 'Dott. Marco Rossi'
await faker.itPerson.fullNameWithTitle('female'); // 'Dott.ssa Giulia Bianchi'

// Using Observables
faker.itPerson.fullNameWithTitle$('male').subscribe(name => console.log(name));
faker.itPerson.fullNameWithTitle$('female').subscribe(name => console.log(name));
```

<view-source />

### fiscalCode()

Generates a valid Italian fiscal code based on random personal data.

```typescript
const faker = new ItFaker();

// Using Promises
await faker.itPerson.fiscalCode(); // 'RSSMRC80A01H501X'

// Using Observables
faker.itPerson.fiscalCode$().subscribe(code => console.log(code));
```

<view-source />

### birthPlace()

Generates an Italian city of birth.

```typescript
const faker = new ItFaker();

// Using Promises
await faker.itPerson.birthPlace(); // 'Roma'

// Using Observables
faker.itPerson.birthPlace$().subscribe(place => console.log(place));
```

<view-source />

### province()

Returns an object containing the name and code of an Italian province.

```typescript
const faker = new ItFaker();

// Using Promises
await faker.itPerson.province(); // { name: 'Roma', code: 'RM' }

// Using Observables
faker.itPerson.province$().subscribe(province => console.log(province));
```

<view-source />

### birthDate()

Generates a random birth date between 1950 and 2005.

```typescript
const faker = new ItFaker();

// Using Promises
await faker.itPerson.birthDate(); // 1980-01-01T00:00:00.000Z

// Using Observables
faker.itPerson.birthDate$().subscribe(date => console.log(date));
```

<view-source />

### phone()

Generates a valid Italian mobile phone number.

```typescript
const faker = new ItFaker();

// Using Promises
await faker.itPerson.phone(); // '3201234567'

// Using Observables
faker.itPerson.phone$().subscribe(phone => console.log(phone));
```

<view-source />

### landline()

Generates a valid Italian landline phone number.

```typescript
const faker = new ItFaker();

// Using Promises
await faker.itPerson.landline(); // '0612345678'

// Using Observables
faker.itPerson.landline$().subscribe(phone => console.log(phone));
```

<view-source />

### email(firstName?: string, lastName?: string)

Generates an email address optionally based on specific first and last names.

```typescript
const faker = new ItFaker();

// Using Promises
await faker.itPerson.email(); // 'marco.rossi@gmail.com'
await faker.itPerson.email('giuseppe', 'verdi'); // 'giuseppe.verdi@libero.it'

// Using Observables
faker.itPerson.email$().subscribe(email => console.log(email));
faker.itPerson.email$('giuseppe', 'verdi').subscribe(email => console.log(email));
```

<view-source />

### pec(firstName?: string, lastName?: string)

Generates a PEC (Certified Electronic Mail) address optionally based on specific first and last names.

```typescript
const faker = new ItFaker();

// Using Promises
await faker.itPerson.pec(); // 'marco.rossi@pec.it'
await faker.itPerson.pec('giuseppe', 'verdi'); // 'giuseppe.verdi@legalmail.it'

// Using Observables
faker.itPerson.pec$().subscribe(pec => console.log(pec));
faker.itPerson.pec$('giuseppe', 'verdi').subscribe(pec => console.log(pec));
```

<view-source />

## Complete Example

Here's an example that uses various module methods to generate a complete personal profile:

### Using Promises

```typescript
const faker = new ItFaker();

async function generateProfile() {
  const profile = {
    title: await faker.itPerson.prefix('male'),
    fullName: await faker.itPerson.fullName('male'),
    fiscalCode: await faker.itPerson.fiscalCode(),
    birthDate: await faker.itPerson.birthDate(),
    birthPlace: await faker.itPerson.birthPlace(),
    province: await faker.itPerson.province(),
    phone: await faker.itPerson.phone(),
    email: await faker.itPerson.email(),
    pec: await faker.itPerson.pec()
  };

  console.log(JSON.stringify(profile, null, 2));
}

generateProfile();
```

### Using Observables

```typescript
const faker = new ItFaker();

import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

const profile$ = combineLatest({
  title: faker.itPerson.prefix$('male'),
  fullName: faker.itPerson.fullName$('male'),
  fiscalCode: faker.itPerson.fiscalCode$(),
  birthDate: faker.itPerson.birthDate$(),
  birthPlace: faker.itPerson.birthPlace$(),
  province: faker.itPerson.province$(),
  phone: faker.itPerson.phone$(),
  email: faker.itPerson.email$(),
  pec: faker.itPerson.pec$()
});

profile$.subscribe(profile => {
  console.log(JSON.stringify(profile, null, 2));
});
```

<ClientOnly>
  <PersonDemo />
</ClientOnly>