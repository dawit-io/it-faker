import { describe, it, expect } from 'vitest';
import { ItFaker } from '../../../src/lib/ItFaker';
import { CompanyModule } from '../../../src/lib/modules/company.module';

describe('CompanyModule', () => {
    const faker = new ItFaker();

    describe('vatNumber', () => {
        it('generates 11 digits with a valid checksum', () => {
            for (let i = 0; i < 200; i++) {
                const vat = faker.itCompany.vatNumber();
                expect(vat).toMatch(/^\d{11}$/);
                expect(CompanyModule.isValidVatNumber(vat)).toBe(true);
            }
        });

        it('rejects malformed or wrong-checksum values', () => {
            expect(CompanyModule.isValidVatNumber('123')).toBe(false);
            expect(CompanyModule.isValidVatNumber('abcdefghijk')).toBe(false);
            // 00743110157 is valid; flipping the check digit must fail
            expect(CompanyModule.isValidVatNumber('00743110157')).toBe(true);
            expect(CompanyModule.isValidVatNumber('00743110158')).toBe(false);
        });
    });

    describe('iban', () => {
        it('generates a 27-char IT IBAN that passes MOD 97-10', () => {
            for (let i = 0; i < 200; i++) {
                const iban = faker.itCompany.iban();
                expect(iban).toMatch(/^IT\d{2}[A-Z]\d{22}$/);
                expect(iban).toHaveLength(27);
                expect(CompanyModule.isValidIban(iban)).toBe(true);
            }
        });

        it('rejects a tampered IBAN', () => {
            const iban = faker.itCompany.iban();
            const tampered = iban.slice(0, -1) + (iban.endsWith('0') ? '1' : '0');
            expect(CompanyModule.isValidIban(tampered)).toBe(false);
        });
    });

    describe('companyName', () => {
        it('ends with a legal form by default', async () => {
            const name = await faker.itCompany.companyName();
            expect(name).toMatch(/(S\.r\.l\.(s\.)?|S\.p\.A\.|S\.n\.c\.|S\.a\.s\.|Soc\. Coop\.)$/);
        });

        it('omits the legal form when requested', async () => {
            const name = await faker.itCompany.companyName({ withLegalForm: false });
            expect(name).toBeTruthy();
            expect(name).not.toMatch(/S\.r\.l\.$/);
        });
    });

    describe('determinism', () => {
        it('same seed reproduces vat/iban/legalForm', () => {
            const a = new ItFaker();
            a.seed(7);
            const b = new ItFaker();
            b.seed(7);
            for (let i = 0; i < 10; i++) {
                expect(a.itCompany.vatNumber()).toBe(b.itCompany.vatNumber());
                expect(a.itCompany.iban()).toBe(b.itCompany.iban());
                expect(a.itCompany.legalForm()).toBe(b.itCompany.legalForm());
            }
        });
    });
});
