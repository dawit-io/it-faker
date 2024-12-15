# 🇮🇹 Faker IT

Generate authentic Italian fake data with real demographic distributions and formatting. Perfect for testing apps that need that genuine Italian touch! 🍝

> ⚠️ **Development Status**: This library is currently under active development. Features may be incomplete, APIs might change, and some links/references are not yet functional. Feel free to try it out and contribute, but please note it's not yet production-ready!

[![npm version](https://badge.fury.io/js/@faker-it/core.svg)](https://badge.fury.io/js/@faker-it/core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Development Status](https://img.shields.io/badge/status-under%20development-yellow)](https://github.com/yourusername/faker-it)

## 🌟 Highlights

- **Complete Italian Personas** - Generate full profiles with consistent data
- **Real Geographic Data** - Actual Italian cities, provinces, and regions
- **Smart Fiscal Codes** - Valid codice fiscale generation
- **Professional Titles** - Including proper Italian honorifics (Dott., Ing., etc.)
- **Contact Details** - Email, PEC, phone numbers in Italian format
- **Modular Design** - Use just what you need

## 🚀 Quick Start

```bash
npm i @italia-tools/faker
```

## 💫 Create a Complete Italian Person

```javascript
import { ItFaker } from '@italia-tools/faker';

const itFaker = new ItFaker();

const person = itFaker.itPerson.generatePerson();

console.log(person);
// {
//   fullName: "Dott. Marco Rossi",
//   firstName: "Marco",
//   lastName: "Rossi",
//   gender: "M",
//   birthDate: "1985-07-15T10:30:00.000Z",
//   birthPlace: {
//     city: "Milano",
//     province: "Milano",
//     region: "Lombardia"
//   },
//   fiscalCode: "RSSMRC85L15F205X",
//   contacts: {
//     phone: "3201234567",
//     email: "marco.rossi@gmail.com",
//     pec: "marco.rossi@pec.it"
//   },
//   address: {
//     street: "Via Garibaldi",
//     number: "42",
//     city: "Roma",
//     province: "RM",
//     postalCode: "00100"
//   }
// }
```

## 🎯 Specific Generation

```javascript
// Generate with specific options
const person = itFaker.itPerson.generatePerson({
  gender: 'male',
  region: 'Lombardia',
  minAge: 25,
  maxAge: 35,
  withTitle: true
});

// Just need a name?
const name = itFaker.itPerson.fullName({ gender: 'male' });  // "Prof. Giuseppe Bianchi"

// Professional email?
const email = itFaker.itPerson.email('Mario', 'Verdi');  // "mario.verdi@gmail.com"

// Need a PEC address?
const pec = itFaker.itPerson.pec('Mario', 'Verdi');  // "mario.verdi@pec.it"

// Italian mobile number?
const phone = itFaker.itPerson.phone();  // "3281234567"

// Landline number?
const landline = itFaker.itPerson.landline();  // "021234567"
```

## 🏛 Geographic Data

```javascript
// Get a random Italian city
const birthPlace = itFaker.itPerson.birthPlace();  // "Milano"

// Get province info
const province = itFaker.itPerson.province();
// { name: "Milano", code: "MI" }
```

## 🛠 Advanced Options

```javascript
const businessPerson = itFaker.itPerson.generatePerson({
  gender: 'female',
  region: 'Lazio',
  province: 'RM',
  withTitle: true,  // Includes professional title
  minAge: 30,
  maxAge: 65
});
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

Visit our [detailed documentation](https://it-faker.gojodigital.com/) for complete API reference.

## 🤝 Contributing

Contributions are welcome!

## 📄 License

MIT © Dawit

---

<p align="center">Made with ❤️ for the Italian developer community</p>