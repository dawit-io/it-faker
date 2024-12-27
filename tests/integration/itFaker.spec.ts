import { describe, it, expect, beforeEach } from 'vitest';
import { ItFaker } from '../../src/lib/index';
import { PersonModule } from '../../src/lib/modules/person.module';
import { PlacesModule } from '../../src/lib/modules/places.module';
import { AddressModule } from '../../src/lib/modules/addresses.module';
import { FiscalCodeModule } from '../../src/lib/modules/fiscalCode.module';
import { LastNameModule } from '../../src/lib/modules/lastName.module';

describe('ItFaker', () => {
    let itFaker: ItFaker;

    beforeEach(() => {
        itFaker = new ItFaker();
    });

    describe('itPerson', () => {
        it('should return an instance of PersonModule', () => {
            expect(itFaker.itPerson).toBeInstanceOf(PersonModule);
        });

        it('should always return the same instance', () => {
            const instance1 = itFaker.itPerson;
            const instance2 = itFaker.itPerson;
            expect(instance1).toBe(instance2);
        });
    });

    describe('itPlace', () => {
        it('should return an instance of PlacesModule', () => {
            expect(itFaker.itPlace).toBeInstanceOf(PlacesModule);
        });

        it('should always return the same instance', () => {
            const instance1 = itFaker.itPlace;
            const instance2 = itFaker.itPlace;
            expect(instance1).toBe(instance2);
        });
    });

    describe('itAddress', () => {
        it('should return an instance of AddressModule', () => {
            expect(itFaker.itAddress).toBeInstanceOf(AddressModule);
        });

        it('should always return the same instance', () => {
            const instance1 = itFaker.itAddress;
            const instance2 = itFaker.itAddress;
            expect(instance1).toBe(instance2);
        });
    });

    describe('itFiscalCode', () => {
        it('should return an instance of FiscalCodeModule', () => {
            expect(itFaker.itFiscalCode).toBeInstanceOf(FiscalCodeModule);
        });

        it('should always return the same instance', () => {
            const instance1 = itFaker.itFiscalCode;
            const instance2 = itFaker.itFiscalCode;
            expect(instance1).toBe(instance2);
        });
    });

    describe('itLastName', () => {
        it('should return an instance of LastNameModule', () => {
            expect(itFaker.itLastName).toBeInstanceOf(LastNameModule);
        });

        it('should always return the same instance', () => {
            const instance1 = itFaker.itLastName;
            const instance2 = itFaker.itLastName;
            expect(instance1).toBe(instance2);
        });
    });

    describe('itFirstName', () => {
        it('should return an instance of LastNameModule', () => {
            expect(itFaker.itFirstName).toBeInstanceOf(LastNameModule);
        });

        it('should always return the same instance', () => {
            const instance1 = itFaker.itFirstName;
            const instance2 = itFaker.itFirstName;
            expect(instance1).toBe(instance2);
        });
    });
});