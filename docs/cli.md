# CLI Commands

IT-Faker provides a command-line interface for generating Italian data directly from your terminal.

## Installation

```bash
npm install -g @italia-tools/faker
```

Or use directly with npx:

```bash
npx @italia-tools/faker <command> [options]
```

## Available Commands

### Generate First Names

```bash
# Generate a random Italian first name
npx it-faker firstName

# Generate a female first name
npx it-faker firstName -g female

# Generate 3 male names with professional titles
npx it-faker firstName -g male -p -c 3

# Options:
#   -g, --gender <gender>  Specify gender (male/female)
#   -p, --prefix          Include professional title
#   -c, --count <number>  Number of names to generate (default: 1)
```

### Generate Last Names

```bash
# Generate a random Italian last name
npx it-faker lastName

# Generate a last name from Lombardia
npx it-faker lastName -r Lombardia

# Generate 5 last names from Bolzano province
npx it-faker lastName -p Bolzano -c 5

# Options:
#   -r, --region <region>    Specify Italian region
#   -p, --province <province>  Specify Italian province
#   -c, --count <number>     Number of surnames to generate (default: 1)
```

### Generate Complete Persons

```bash
# Generate a random Italian person
npx it-faker person

# Generate a female person from Toscana
npx it-faker person -g female -r Toscana

# Generate 3 persons with addresses
npx it-faker person -c 3 --with-address

# Options:
#   -r, --region <region>     Specify Italian region
#   -p, --province <province>  Specify Italian province
#   -g, --gender <gender>     Specify gender (male/female)
#   -c, --count <number>      Number of persons to generate (default: 1)
#   --with-address           Include address
```

### Generate Addresses

```bash
# Generate a random Italian address
npx it-faker address

# Generate an address in Milano province
npx it-faker address -p Milano

# Generate 4 addresses in Lazio
npx it-faker address -r Lazio -c 4

# Options:
#   -r, --region <region>     Specify Italian region
#   -p, --province <province>  Specify Italian province
#   -c, --count <number>      Number of addresses to generate (default: 1)
```

### Generate Fiscal Codes

```bash
# Generate a random Italian fiscal code
npx it-faker fiscal-code

# Generate 5 fiscal codes
npx it-faker fiscal-code -c 5

# Options:
#   -c, --count <number>  Number of fiscal codes to generate (default: 1)
```

## Common Options

All numeric options (`-c, --count`) must be positive integers.

## Output Format

All commands output data in formatted JSON. Single items are output as objects, multiple items as arrays.

Example output:
```json
{
  "firstName": "Marco",
  "lastName": "Rossi",
  "gender": "male",
  "fiscalCode": "RSSMRC..."
}
```

## Error Handling

The CLI will display helpful error messages if:
- Invalid options are provided
- Invalid count values are used
- Any generation errors occur

## Help

Get general help:
```bash
npx it-faker --help
```

Get help for specific command:
```bash
npx it-faker person --help
npx it-faker address --help
# etc.
```