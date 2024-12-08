# People

Generate consistent Italian people data including names, surnames, and fiscal codes based on real demographic distributions.

## Names

Generate realistic Italian first names based on national frequency distribution data from ISTAT.

```js
import { faker } from '@fakerjs/it'

// Generate a random first name
faker.person.firstName() // => "Marco"

// Generate a male first name
faker.person.firstName('male') // => "Giuseppe" 

// Generate a female first name
faker.person.firstName('female') // => "Anna"

// Generate multiple names
faker.person.firstNames(3) // => ["Marco", "Giuseppe", "Luigi"]

// Generate with options
faker.person.firstName({
  gender: 'female',
  region: 'Lombardia', // Regional frequency if available
  birthYear: 1980 // Name popularity for that year
})
```

### API Reference

#### `firstName(options?: PersonOptions)`

Generates a single Italian first name.

**Options:**

|
 Parameter 
|
 Type 
|
 Description 
|
|
-----------
|
------
|
-------------
|
|
`gender`
|
`'male' \| 'female'`
|
 Specify gender for the name 
|
|
`region`
|
`string`
|
 Italian region for regional frequency 
|
|
`birthYear`
|
`number`
|
 Year of birth for historical name frequency 
|

Returns: `string`

#### `firstNames(count: number, options?: PersonOptions)`

Generates multiple Italian first names.

Returns: `string[]`

## Surnames

Generate Italian surnames based on provincial frequency distributions from ISTAT data.

```js
// Generate a random surname
faker.person.lastName() // => "Rossi"

// Generate with provincial frequency
faker.person.lastName({ 
  province: 'MI'  // Uses Milan province distribution
}) // => "Colombo"

// Generate multiple surnames
faker.person.lastNames(3) // => ["Rossi", "Ferrari", "Bianchi"]
```

### API Reference

#### `lastName(options?: SurnameOptions)`

Generates a single Italian surname.

**Options:**

|
 Parameter 
|
 Type 
|
 Description 
|
|
-----------
|
------
|
-------------
|
|
`province`
|
`string`
|
 Italian province code for local frequency 
|
|
`region`
|
`string`
|
 Italian region for regional frequency 
|

Returns: `string`

#### `lastNames(count: number, options?: SurnameOptions)`

Generates multiple Italian surnames.

Returns: `string[]`

## Fiscal Code

Generate valid Italian fiscal codes (Codice Fiscale) consistent with the person's data.

```js
// Generate a random fiscal code
faker.person.fiscalCode() // => "RSSMRA80A01H501U"

// Generate fiscal code with specific person data
faker.person.fiscalCode({
  firstName: 'Mario',
  lastName: 'Rossi',
  gender: 'male',
  birthDate: '1980-01-01',
  birthPlace: 'Roma'
}) // => "RSSMRA80A01H501U"

// Validate a fiscal code
faker.person.validateFiscalCode('RSSMRA80A01H501U') // => true
```

### API Reference

#### `fiscalCode(options?: FiscalCodeOptions)`

Generates a valid Italian fiscal code.

**Options:**

|
 Parameter 
|
 Type 
|
 Description 
|
|
-----------
|
------
|
-------------
|
|
`firstName`
|
`string`
|
 Person's first name 
|
|
`lastName`
|
`string`
|
 Person's last name 
|
|
`gender`
|
`'male' \| 'female'`
|
 Person's gender 
|
|
`birthDate`
|
`string \| Date`
|
 Date of birth 
|
|
`birthPlace`
|
`string`
|
 Place of birth (municipality) 
|

Returns: `string`

#### `validateFiscalCode(code: string)`

Validates an Italian fiscal code.

Returns: `boolean`

## Data Sources

- Names and surnames frequencies: ISTAT demographic data
- Geographic data: Latest ISTAT administrative divisions
- Fiscal code algorithm: Official Italian government specifications

::: tip
Use `faker.seed()` to generate consistent data across multiple runs
:::

::: warning
While the generated data follows real demographic distributions, it should only be used for testing purposes
:::