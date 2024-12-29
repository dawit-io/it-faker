import { describe, it, expect, beforeEach, vi } from 'vitest';
import { type BirthPlace, FiscalCodeModule } from '../../../src/lib/modules/fiscalCode.module';
import { Gender } from '../../../src/lib/types/types'
import type { ItalianCity } from '../../../src/lib/types/city'
import { lastValueFrom, of } from 'rxjs';
import { fakerIT as faker } from '@faker-js/faker'
import { FiscalCodeGenerator } from '../../../src/lib/utils/fiscalCode';
import { PlacesModule } from '../../../src/lib/modules/places.module';
import { aw } from 'vitest/dist/chunks/reporters.D7Jzd9GS.js';
import { b } from 'vitest/dist/chunks/suite.B2jumIFP.js';

describe('FiscalCodeModule', () => {
    let fiscalCodeModule: FiscalCodeModule;
    let placesModule: PlacesModule;

    beforeEach(() => {
        fiscalCodeModule = new FiscalCodeModule(faker);
        placesModule = new PlacesModule(faker);

    });
    describe('generate', () => {
        it('should generate a valid fiscal code', async () => {
            const fiscalCode = await fiscalCodeModule.generate();
            expect(fiscalCode).toMatch(/^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/);

            // Verify the control character
            const actualControlChar = fiscalCode.slice(-1);
            const expectedControlChar = FiscalCodeGenerator.calculateControlChar(fiscalCode.slice(0, -1));
            expect(actualControlChar).toBe(expectedControlChar);
        });

        it('should generate a fiscal code with the provided options', async () => {
            const options = {
                firstName: 'Mario',
                lastName: 'Rossi',
                gender: Gender.Male,
                birthDate: new Date('1990-01-01'),
                birthPlace: { type: 'italian', city: { name: 'Roma', provinceCode: 'RM', belfioreCode: 'H501' } as ItalianCity } as BirthPlace
            };
            const fiscalCode = await fiscalCodeModule.generate(options);

            // Verify the complete fiscal code
            expect(fiscalCode).toBe('RSSMRA90A01H501W');
        });
    });

    describe('generate$', () => {
        it('should generate a valid fiscal code', async () => {
            const fiscalCode$ = fiscalCodeModule.generate$();
            const fiscalCode = await lastValueFrom(fiscalCode$);
            expect(fiscalCode).toMatch(/^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/);

            // Verify the control character
            const actualControlChar = fiscalCode.slice(-1);
            const expectedControlChar = FiscalCodeGenerator.calculateControlChar(fiscalCode.slice(0, -1));
            expect(actualControlChar).toBe(expectedControlChar);
        });

        it('should generate a fiscal code with the provided options', async () => {
            const options = {
                firstName: 'Mario',
                lastName: 'Rossi',
                gender: Gender.Male,
                birthDate: new Date('1990-01-01'),
                birthPlace: { type: 'italian', city: { name: 'Roma', provinceCode: 'RM', belfioreCode: 'H501' } as ItalianCity } as BirthPlace
            };
            const fiscalCode$ = fiscalCodeModule.generate$(options);
            const fiscalCode = await lastValueFrom(fiscalCode$);

            // Verify the complete fiscal code
            expect(fiscalCode).toBe('RSSMRA90A01H501W');
        });

        it('should generate a fiscal code with birth place', async () => {
            const options = {
                firstName: 'Andrea',
                lastName: 'Ferrari',
                gender: Gender.Male,
                birthDate: new Date('1980-01-01'),
                birthPlace: { type: 'italian', city: { name: 'Milano' } as ItalianCity } as BirthPlace
            };
            const fiscalCode$ = fiscalCodeModule.generate$(options);
            const fiscalCode = await lastValueFrom(fiscalCode$);

            // Verify the complete fiscal code
            expect(fiscalCode).toBe('FRRNDR80A01F205O');
        });

        it('should throw error when city does not exist', async () => {
            // Mock PlacesModule to return null for invalid city
            vi.spyOn(placesModule, 'city$').mockReturnValue(of(null));

            const options = {
                firstName: 'Andrea',
                lastName: 'Ferrari',
                gender: Gender.Male,
                birthDate: new Date('1980-01-01'),
                birthPlace: { type: 'italian', city: { name: 'InvalidCity' } as ItalianCity } as BirthPlace
            };

            const fiscalCode$ = fiscalCodeModule.generate$(options);

            // Assert that the Promise rejects with the expected error
            await expect(lastValueFrom(fiscalCode$)).rejects.toThrow('Invalid city name');
        });

        it('should throw error when Belfiore code does not exist', async () => {
            vi.spyOn(placesModule, 'city$').mockReturnValue(of(null));

            const options = {
                firstName: 'Andrea',
                lastName: 'Ferrari',
                birthPlace: { type: 'italian', city: { belfioreCode: 'InvalidCode' } as ItalianCity } as BirthPlace
            };

            const fiscalCode$ = fiscalCodeModule.generate$(options);
            await expect(lastValueFrom(fiscalCode$)).rejects.toThrow('Invalid Belfiore Code');
        });

        it('should generate a fiscal code with foreign birth place', async () => {
            const options = {
                firstName: 'John',
                lastName: 'Doe',
                gender: Gender.Male,
                birthDate: new Date('1980-01-01'),
                birthPlace: { type: 'foreign', country: { name: 'Stati Uniti d\'America' } } as BirthPlace
            };
            const fiscalCode$ = fiscalCodeModule.generate$(options);
            await expect(lastValueFrom(fiscalCode$)).resolves.toBe('DOEJHN80A01Z404C');
        });

        it('should throw error when country does not exist', async () => {
            vi.spyOn(placesModule, 'getCountryByName$').mockReturnValue(of(null));

            const options = {
                firstName: 'John',
                lastName: 'Doe',
                birthPlace: { type: 'foreign', country: { name: 'InvalidCountry' } } as BirthPlace
            };

            const fiscalCode$ = fiscalCodeModule.generate$(options);
            await expect(lastValueFrom(fiscalCode$)).rejects.toThrow('Invalid country name: InvalidCountry');
        });
    });
});