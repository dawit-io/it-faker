import { describe, it, expect, beforeEach } from 'vitest';
import { FiscalCodeModule } from '../../../src/lib/modules/fiscalCode.module';
import { Gender } from '../../../src/lib/types/types'
import type { ItalianCity } from '../../../src/lib/types/city'
import { lastValueFrom } from 'rxjs';
import { fakerIT as faker } from '@faker-js/faker'
import { FiscalCodeGenerator } from '../../../src/lib/utils/fiscalCode';

describe('FiscalCodeModule', () => {
    let fiscalCodeModule: FiscalCodeModule;

    beforeEach(() => {
        fiscalCodeModule = new FiscalCodeModule(faker);
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
                birthPlace: { name: 'Roma', provinceCode: 'RM', belfioreCode: 'H501' } as ItalianCity
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
                birthPlace: { name: 'Roma', provinceCode: 'RM', belfioreCode: 'H501' } as ItalianCity
            };
            const fiscalCode$ = fiscalCodeModule.generate$(options);
            const fiscalCode = await lastValueFrom(fiscalCode$);

            // Verify the complete fiscal code
            expect(fiscalCode).toBe('RSSMRA90A01H501W');
        });
    });
});