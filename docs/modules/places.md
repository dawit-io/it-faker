# Places Module

The Places module of IT-Faker provides comprehensive functionality for generating and managing geographic data, including Italian cities, provinces, regions, and international countries. It uses real demographic and administrative data to ensure accuracy and authenticity.

## Import

To use the Places module, import it from `@italia-tools/faker`:

```typescript
import { ItFaker } from '@italia-tools/faker';

const faker = new ItFaker();
```

## Italian Cities Methods

### randomCity()/randomCity$()

Generates a random Italian city with complete information.

```typescript
// Using Promises
const city = await faker.itPlaces.randomCity();
// Using Observables
faker.itPlaces.randomCity$().subscribe(city => console.log(city));

// Example output:
{
    name: "Milano",
    code: "F205",
    belfioreCode: "F205",
    provinceCode: "MI",
    population: 1378689,
    province: {
        name: "Milano",
        code: "MI"
    },
    region: {
        name: "Lombardia",
        code: "03"
    }
}
```

### randomCities(count)/randomCities$(count)

Generates an array of unique random Italian cities.

```typescript
// Get 5 unique cities
const cities = await faker.itPlaces.randomCities(5);
```

### city(options)/city$(options)

Finds a city based on specific criteria.

```typescript
interface CityOptions {
    region?: string;
    province?: string;
    belfioreCode?: string;
    cityName?: string;
}

// Find by region
const lombardiaCity = await faker.itPlaces.city({ 
    region: 'Lombardia' 
});

// Find by province
const milanCity = await faker.itPlaces.city({ 
    province: 'Milano' 
});

// Find by exact name
const rome = await faker.itPlaces.city({ 
    cityName: 'Roma' 
});

// Find by Belfiore code
const milan = await faker.itPlaces.city({ 
    belfioreCode: 'F205' 
});
```

### allCities()/allCities$()

Returns all Italian cities in the database.

```typescript
const allCities = await faker.itPlaces.allCities();
```

### mostPopulatedCities(x)/mostPopulatedCities$(x)

Returns the x most populated Italian cities, sorted by population.

```typescript
// Get top 10 most populated cities
const topCities = await faker.itPlaces.mostPopulatedCities(10);
```

## Administrative Division Methods

### province()/province$()

Generates a random Italian province.

```typescript
const province = await faker.itPlaces.province();
// { name: "Milano", code: "MI" }
```

### region()/region$()

Returns a random Italian region name.

```typescript
const region = await faker.itPlaces.region();
// "Lombardia"
```

### getBirthPlace()/getBirthPlace$()

Generates a complete birth place record with all necessary identifiers.

```typescript
const birthPlace = await faker.itPlaces.getBirthPlace();
// {
//     name: "Roma",
//     belfioreCode: "H501",
//     province: "Roma",
//     region: "Lazio",
//     provinceCode: "RM"
// }
```

## International Country Methods

### randomCountry()/randomCountry$()

Generates a random country with complete information.

```typescript
const country = await faker.itPlaces.randomCountry();
// {
//     continent: "Europe",
//     istatCode: 380,
//     nameIt: "Italia",
//     nameEn: "Italy",
//     atCode: "IT",
//     unsdm49Code: "380",
//     iso3166Alpha2: "IT",
//     iso3166Alpha3: "ITA"
// }
```

### getCountryByName(name)/getCountryByName$(name)

Finds a country by its name (supports both Italian and English names).

```typescript
const italy = await faker.itPlaces.getCountryByName('Italia');
const france = await faker.itPlaces.getCountryByName('France');
```

### getAllCountries()/getAllCountries$()

Returns all available countries with their complete information.

```typescript
const allCountries = await faker.itPlaces.getAllCountries();
```

## Data Management Methods

### preloadData()/preloadData$()

Preloads geographic data for faster subsequent operations.

```typescript
await faker.itPlaces.preloadData();
```

### clearCache()

Clears the cached geographic data.

```typescript
faker.itPlaces.clearCache();
```

## Complete Example

Here's an example demonstrating various uses of the Places module:

```typescript
const faker = new ItFaker();

async function generateGeographicData() {
    // Preload data for better performance
    await faker.itPlaces.preloadData();

    const examples = {
        // Italian geographic data
        randomCity: await faker.itPlaces.randomCity(),
        topCities: await faker.itPlaces.mostPopulatedCities(3),
        milanArea: await faker.itPlaces.city({ province: 'Milano' }),
        randomProvince: await faker.itPlaces.province(),
        randomRegion: await faker.itPlaces.region(),
        birthPlace: await faker.itPlaces.getBirthPlace(),

        // International data
        randomCountry: await faker.itPlaces.randomCountry(),
        italyInfo: await faker.itPlaces.getCountryByName('Italia')
    };

    console.log(JSON.stringify(examples, null, 2));
}
```

## Using with Observables

The module fully supports reactive programming with RxJS Observables:

```typescript
import { combineLatest } from 'rxjs';

const locationData$ = combineLatest({
    city: faker.itPlaces.randomCity$(),
    province: faker.itPlaces.province$(),
    country: faker.itPlaces.randomCountry$()
});

locationData$.subscribe(data => {
    console.log(JSON.stringify(data, null, 2));
});
```

## Data Sources and Accuracy

The Places module uses official Italian geographic and demographic data:
- Complete database of all Italian municipalities
- Current administrative divisions
- Updated population data
- Official Belfiore codes
- ISO country codes and international standards

This ensures that all generated data is:
- Consistent with official records
- Geographically accurate
- Administratively valid
- Suitable for testing and development with real Italian administrative systems