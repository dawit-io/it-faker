# 🇮🇹 Faker IT

Generate authentic Italian fake data with real demographic distributions and formatting. Perfect for testing apps that need that genuine Italian touch! 🍝

> ⚠️ **Development Status**: This library is currently under active development. Features may be incomplete, APIs might change, and some links/references are not yet functional. Feel free to try it out and contribute, but please note it's not yet production-ready!

[![npm version](https://img.shields.io/npm/v/@italia-tools/faker)](https://www.npmjs.com/package/@italia-tools/faker)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Coverage Status](https://codecov.io/gh/dawit-io/it-faker/branch/master/graph/badge.svg)](https://codecov.io/gh/dawit-io/it-faker)

## 🌟 Highlights

- **Complete Italian Personal Profiles** - Generate full profiles with consistent data
- **Real Geographic Data** - Actual Italian cities, provinces, and regions
- **Smart Fiscal Codes** - Valid codice fiscale generation
- **Professional Titles** - Including proper Italian honorifics (Dott., Ing., etc.)
- **Contact Details** - Email, PEC, phone numbers in Italian format
- **Modular Design** - Use just what you need
- **Async Support** - All methods support both Promise and Observable patterns

## 🚀 Quick Start

```bash
npm i @italia-tools/faker
```

## 💫 Create a Complete Italian Person

### Using Promises

```typescript
import { ItFaker } from '@italia-tools/faker';

const itFaker = new ItFaker();

// Using Promise
await itFaker.itPerson.generatePerson()
  .then(person => {
    console.log(person);
    // {
    //   "fullName": "Marco Rossi",
    //   "firstName": "Marco",
    //   "lastName": "Rossi",
    //   "gender": "male",
    //   "birthDate": "1947-05-10T02:38:15.257Z",
    //   "birthPlace": {
    //     "city": "Milano",
    //     "province": "Milano",
    //     "region": "Lombardia"
    //   },
    //   "fiscalCode": "RSSMRC85L15F205X",
    //   "contacts": {
    //     "phone": "3681961744",
    //     "email": "marco.rossi@gmail.com",
    //     "pec": "marco.rossi@pec.it"
    //   },
    //   "address": "Via Garibaldi, 118 Scala D, Piano 2, 00100 Roma (RM)"
    // }
  });

// Or using async/await
const person = await itFaker.itPerson.generatePerson();
```

### Using Observables

```typescript
import { ItFaker } from '@italia-tools/faker';

const itFaker = new ItFaker();

// Using Observable
itFaker.itPerson.generatePerson$().subscribe(person => {
  console.log(person);
});
```

## 🎯 Specific Generation

```typescript
// Generate with specific options (Promise)
const person = await itFaker.itPerson.generatePerson({
  gender: 'male',
  region: 'Lombardia',
  minAge: 25,
  maxAge: 35,
  withTitle: true
});

// Or using Observable
itFaker.itPerson.generatePerson$({
  gender: 'male',
  region: 'Lombardia',
  minAge: 25,
  maxAge: 35,
  withTitle: true
}).subscribe(person => console.log(person));

// Just need a name? (Promise)
const name = await itFaker.itPerson.fullName({ gender: 'male', prefix: true });
// "Prof. Giuseppe Bianchi"

// Professional email? (Observable)
itFaker.itPerson.email$('Mario', 'Verdi')
  .subscribe(email => console.log(email));  // "mario.verdi@gmail.com"

// Need a PEC address? (Promise)
const pec = await itFaker.itPerson.pec('Mario', 'Verdi');  
// "mario.verdi@pec.it"

// Italian mobile number? (Observable)
itFaker.itPerson.phone$()
  .subscribe(phone => console.log(phone));  // "3281234567"

// Landline number? (Promise)
const landline = await itFaker.itPerson.landline();  
// "021234567"
```

## 🏛 Geographic Data

```typescript
// Get a random Italian city (Promise)
const birthPlace = await itFaker.itPerson.birthPlace();  
// "Milano"

// Get province info (Observable)
itFaker.itPerson.province$()
  .subscribe(province => console.log(province));
// { name: "Milano", code: "MI" }
```

## 🛠 Advanced Options

```typescript
// Using Promise
const businessPerson = await itFaker.itPerson.generatePerson({
  gender: 'female',
  region: 'Lazio',
  province: 'RM',
  withTitle: true,  // Includes professional title
  minAge: 30,
  maxAge: 65
});

// Using Observable
itFaker.itPerson.generatePerson$({
  gender: 'female',
  region: 'Lazio',
  province: 'RM',
  withTitle: true,
  minAge: 30,
  maxAge: 65
}).subscribe(businessPerson => console.log(businessPerson));
```

## 🎯 Use Cases

- Testing Italian-specific applications
- Generating realistic test data
- UI/UX prototyping
- Database seeding
- Demo environments

## 📊 Data Sources

- Real ISTAT demographic data
- Actual Italian administrative codes
- Authentic geographic distributions
- Valid fiscal code algorithms

## 📖 Documentation

Visit our [detailed documentation](http://it-faker.gojodigital.com/) for complete API reference.

## 🤝 Contributing

Contributions are welcome!

## 📄 License

MIT © Dawit

---

<p align="center">Made with ❤️ for the Italian developer community</p>