import { fakerIT as faker } from '@faker-js/faker'
import { beforeEach, describe, expect, it } from 'vitest'
import { lastValueFrom } from 'rxjs'
import { AddressModule } from '../../../src/lib/modules/addresses.module'
const ITALIAN_LETTERS_REGEX = /^[a-zA-ZàèéìòóùÀÈÉÌÒÓÙçÇ' ]+$/;
const ADDRESS_REGEX = /, \d+[A-Z]?(?: Scala [A-Z])?(?:, Piano \d+)?(?:, Interno \d+)?(?:, \d{5} [a-zA-Z\u00C0-\u017F ]+ \([A-Z]{2}\))?/;

describe('AddressModule', () => {
  let addressModule: AddressModule;
  beforeEach(() => {
    addressModule = new AddressModule(faker);
  });

  describe('streetName', () => {
    it('should return a street name', async () => {
      const streetName = await addressModule.streetName();
      expect(typeof streetName).toBe('string');
      expect(streetName.length).toBeGreaterThan(0);
    });

    it('should return a street name for a specific region', async () => {
      const region = 'Lombardia';
      const streetName = await addressModule.streetName(region);
      expect(typeof streetName).toBe('string');
      expect(streetName.length).toBeGreaterThan(0);
    });

    it('should handle accented letters', async () => {
      const streetName = await addressModule.streetName();
      expect(streetName).toMatch(ITALIAN_LETTERS_REGEX);
    });
  });

  describe('streetName$', () => {
    it('should return an observable that emits a street name', async () => {
      const streetName$ = addressModule.streetName$();
      const streetName = await lastValueFrom(streetName$);
      expect(typeof streetName).toBe('string');
      expect(streetName.length).toBeGreaterThan(0);
    });

    it('should return an observable that emits a street name for a specific region', async () => {
      const region = 'Lombardia';
      const streetName$ = addressModule.streetName$(region);
      const streetName = await lastValueFrom(streetName$);
      expect(typeof streetName).toBe('string');
      expect(streetName.length).toBeGreaterThan(0);
    });

    it('should handle accented letters', async () => {
      const streetName$ = addressModule.streetName$();
      const streetName = await lastValueFrom(streetName$);
      expect(streetName).toMatch(ITALIAN_LETTERS_REGEX);
    });
  });

  describe('streetAddress', () => {
    it('should return a street address', async () => {
      const streetAddress = await addressModule.streetAddress();
      expect(typeof streetAddress).toBe('string');
      expect(streetAddress.length).toBeGreaterThan(0);
      expect(streetAddress).toMatch(/^Via|Viale|Piazza|Corso|Largo|Vicolo|Lungomare|Strada|Salita|Calata|Galleria|Borgo|Traversa/);
      expect(streetAddress).toMatch(/, \d+[A-Z]?\/?\w*$/);
    });

    it('should return a street address for a specific region', async () => {
      const region = 'Toscana';
      const streetAddress = await addressModule.streetAddress({ region });
      expect(typeof streetAddress).toBe('string');
      expect(streetAddress.length).toBeGreaterThan(0);
      expect(streetAddress).toMatch(/^Via|Viale|Piazza|Corso|Largo|Vicolo|Lungomare|Strada|Salita|Calata|Galleria|Borgo|Traversa/);
      expect(streetAddress).toMatch(/, \d+[A-Z]?\/?\w*$/);
    });
  });

  describe('streetAddress$', () => {
    it('should return an observable that emits a street address', async () => {
      const streetAddress$ = addressModule.streetAddress$();
      const streetAddress = await lastValueFrom(streetAddress$);
      expect(typeof streetAddress).toBe('string');
      expect(streetAddress.length).toBeGreaterThan(0);
      expect(streetAddress).toMatch(/^Via|Viale|Piazza|Corso|Largo|Vicolo|Lungomare|Strada|Salita|Calata|Galleria|Borgo|Traversa/);
      expect(streetAddress).toMatch(/, \d+[A-Z]?\/?\w*$/);
    });

    it('should return an observable that emits a street address for a specific region', async () => {
      const region = 'Toscana';
      const streetAddress$ = addressModule.streetAddress$({ region });
      const streetAddress = await lastValueFrom(streetAddress$);
      expect(typeof streetAddress).toBe('string');
      expect(streetAddress.length).toBeGreaterThan(0);
      expect(streetAddress).toMatch(/^Via|Viale|Piazza|Corso|Largo|Vicolo|Lungomare|Strada|Salita|Calata|Galleria|Borgo|Traversa/);
      expect(streetAddress).toMatch(/, \d+[A-Z]?\/?\w*$/);
    });
  });

  describe('completeAddress', () => {
    it('should return a complete address', async () => {
      const completeAddress = await addressModule.completeAddress();
      expect(typeof completeAddress).toBe('string');
      expect(completeAddress.length).toBeGreaterThan(0);
      expect(completeAddress).toMatch(/^Via|Viale|Piazza|Corso|Largo|Vicolo|Lungomare|Strada|Salita|Calata|Galleria|Borgo|Traversa/);
      expect(completeAddress).toMatch(ADDRESS_REGEX);
      expect(completeAddress).toMatch(/\d{5} [a-zA-Z\u00C0-\u017F' ]+ \([A-Z]{2}\)$/);
    });

    it('should return a complete address for a specific region', async () => {
      const region = 'Campania';
      const completeAddress = await addressModule.completeAddress({ region });
      expect(typeof completeAddress).toBe('string');
      expect(completeAddress.length).toBeGreaterThan(0);
      expect(completeAddress).toMatch(/^Via|Viale|Piazza|Corso|Largo|Vicolo|Lungomare|Strada|Salita|Calata|Galleria|Borgo|Traversa/);
      expect(completeAddress).toMatch(ADDRESS_REGEX);
      expect(completeAddress).toMatch(/\d{5} [a-zA-Z\u00C0-\u017F' ]+ \([A-Z]{2}\)$/);
    });
  });

  describe('completeAddress$', () => {
    it('should return an observable that emits a complete address', async () => {
      const completeAddress$ = addressModule.completeAddress$();
      const completeAddress = await lastValueFrom(completeAddress$);
      expect(typeof completeAddress).toBe('string');
      expect(completeAddress.length).toBeGreaterThan(0);
      expect(completeAddress).toMatch(/^Via|Viale|Piazza|Corso|Largo|Vicolo|Lungomare|Strada|Salita|Calata|Galleria|Borgo|Traversa/);
      expect(completeAddress).toMatch(ADDRESS_REGEX);
      expect(completeAddress).toMatch(/\d{5} [a-zA-Z\u00C0-\u017F' ]+ \([A-Z]{2}\)$/);
    });

    it('should return an observable that emits a complete address for a specific region', async () => {
      const region = 'Campania';
      const completeAddress$ = addressModule.completeAddress$({ region });
      const completeAddress = await lastValueFrom(completeAddress$);
      expect(typeof completeAddress).toBe('string');
      expect(completeAddress.length).toBeGreaterThan(0);
      expect(completeAddress).toMatch(/^Via|Viale|Piazza|Corso|Largo|Vicolo|Lungomare|Strada|Salita|Calata|Galleria|Borgo|Traversa/);
      expect(completeAddress).toMatch(ADDRESS_REGEX);
      expect(completeAddress).toMatch(/\d{5} [a-zA-Z\u00C0-\u017F' ]+ \([A-Z]{2}\)$/);
    });
  });
});