import { describe, it, expect, beforeEach, vi } from 'vitest';
import { PersonModule } from '../../../src/lib/modules/person.module';
import { fakerIT as faker } from '@faker-js/faker';
import { lastValueFrom, of } from 'rxjs';
import { Gender } from '../../../src/lib/types/types';
import type { ItalianPersonDto } from '../../../src/lib/types/dto/person.dto';
import type { FiscalCodeOptions } from '../../../src/lib/modules/fiscalCode.module';
import type { ItalianCity } from '../../../src/lib/types/city';

describe('PersonModule', () => {
    let personModule: PersonModule;

    beforeEach(() => {
        personModule = new PersonModule(faker);
        vi.spyOn(personModule['faker'].date, 'between').mockImplementation(({ from, to }) => {
            // Mock implementation for testing
            const fromDate = new Date(from);
            const toDate = new Date(to);
            const randomDate = new Date(fromDate.getTime() + Math.random() * (toDate.getTime() - fromDate.getTime()));
            return randomDate;
        });
        vi.spyOn(personModule['faker'].date, 'past').mockImplementation(() => {
            // Mock implementation for testing
            const pastDate = new Date();
            pastDate.setFullYear(pastDate.getFullYear() - Math.floor(Math.random() * 50));
            return pastDate;
        });
    });

    describe('firstName', () => {
        it('should generate a valid first name', async () => {
            const firstName = await personModule.firstName();
            expect(firstName).toMatch(/^[a-zA-ZàèéìòóùÀÈÉÌÒÓÙçÇ' ]+$/);
        });

        it('should generate a first name based on gender', async () => {
            const maleFirstName = await personModule.firstName({ gender: Gender.Male });
            expect(maleFirstName).toMatch(/^[a-zA-ZàèéìòóùÀÈÉÌÒÓÙçÇ' ]+$/);

            const femaleFirstName = await personModule.firstName({ gender: Gender.Female });
            expect(femaleFirstName).toMatch(/^[a-zA-ZàèéìòóùÀÈÉÌÒÓÙçÇ' ]+$/);
        });
    });

    describe('lastName', () => {
        it('should generate a valid last name', async () => {
            const lastName = await personModule.lastName();
            expect(lastName).toMatch(/^[a-zA-ZàèéìòóùÀÈÉÌÒÓÙçÇ' ]+$/);
        });

        it('should generate a last name based on region', async () => {
            const lastName = await personModule.lastName({ region: 'Lombardia' });
            expect(lastName).toMatch(/^[a-zA-ZàèéìòóùÀÈÉÌÒÓÙçÇ' ]+$/);
        });
    });

    describe('fullName', () => {
        it('should generate a valid full name', async () => {
            const fullName = await personModule.fullName();
            expect(fullName).toMatch(/^[a-zA-ZàèéìòóùÀÈÉÌÒÓÙçÇ' ]+$/);
        });
    });

    describe('fiscalCode', () => {
        it('should generate a valid fiscal code', async () => {
            const fiscalCodeOptions = {
                firstName: 'Mario',
                lastName: 'Rossi',
                gender: Gender.Male,
                birthDate: new Date('1980-01-01'),
                birthPlace: {
                    type: 'italian', city: {
                        name: 'Roma',
                        province: { code: 'RM' },
                        belfioreCode: 'H501'
                    } as ItalianCity
                }
            } as FiscalCodeOptions;
            const fiscalCode = await personModule.fiscalCode(fiscalCodeOptions);
            expect(fiscalCode).toMatch(/^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/);
        });
    });

    describe('email', () => {
        it('should generate a valid email address', async () => {
            const email = await personModule.email('Mario', 'Rossi');
            expect(email).toMatch(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
        });
    });

    describe('pec', () => {
        it('should generate a valid PEC address', async () => {
            const pec = await personModule.pec('Mario', 'Rossi');
            expect(pec).toMatch(/^[a-z.]+@[a-z]+\.[a-z]+$/);
        });
    });

    describe('generatePerson', () => {
        it('should generate a valid Italian person', async () => {
            const person = await personModule.generatePerson();
            expect(person).toMatchObject<Partial<ItalianPersonDto>>({
                fullName: expect.any(String),
                firstName: expect.any(String),
                lastName: expect.any(String),
                gender: expect.any(String),
                birthDate: expect.any(Date),
                birthPlace: {
                    city: expect.any(String),
                    province: expect.any(String),
                    region: expect.any(String)
                },
                fiscalCode: expect.any(String),
                contacts: {
                    phone: expect.any(String),
                    email: expect.any(String),
                    pec: expect.any(String)
                },
                address: expect.any(String)
            });
        });

        it('should generate a person based on provided options', async () => {
            const currentYear = new Date().getFullYear();
            const minYear = currentYear - 50;
            const maxYear = currentYear - 30;
            const options = {
                gender: Gender.Female,
                region: 'Lazio',
                minAge: 30,
                maxAge: 50,
                withTitle: true
            };
            const person = await personModule.generatePerson(options);
            expect(person.gender).toBe(Gender.Female);
            expect(person.birthPlace.region).toBe('Lazio');
            expect(person.fullName).toMatch(/^(Dott\.ssa|Ing\.|Arch\.|Geom\.|Prof\.ssa|Rag\.|Avv\.) [a-zA-ZàèéìòóùÀÈÉÌÒÓÙçÇ' ]+$/);
            expect(person.birthDate.getFullYear()).toBeGreaterThanOrEqual(minYear);
            expect(person.birthDate.getFullYear()).toBeLessThanOrEqual(maxYear);
        });
    });

    // Tests for Observable methods
    describe('Observable methods', () => {
        describe('firstName$', () => {
            it('should generate a valid first name', async () => {
                const firstName$ = personModule.firstName$();
                const firstName = await lastValueFrom(firstName$);
                expect(firstName).toMatch(/^[a-zA-ZàèéìòóùÀÈÉÌÒÓÙçÇ' ]+$/);
            });

            it('should generate a first name based on gender', async () => {
                const maleFirstName$ = personModule.firstName$({ gender: Gender.Male });
                const femaleFirstName$ = personModule.firstName$({ gender: Gender.Female });

                const maleFirstName = await lastValueFrom(maleFirstName$);
                const femaleFirstName = await lastValueFrom(femaleFirstName$);

                expect(maleFirstName).toMatch(/^[a-zA-ZàèéìòóùÀÈÉÌÒÓÙçÇ' ]+$/);
                expect(femaleFirstName).toMatch(/^[a-zA-ZàèéìòóùÀÈÉÌÒÓÙçÇ' ]+$/);
            });
        });

        describe('lastName$', () => {
            it('should generate a valid last name', async () => {
                const lastName$ = personModule.lastName$();
                const lastName = await lastValueFrom(lastName$);
                expect(lastName).toMatch(/^[a-zA-ZàèéìòóùÀÈÉÌÒÓÙçÇ' ]+$/);
            });

            it('should generate a last name based on region', async () => {
                const lastName$ = personModule.lastName$({ region: 'Lombardia' });
                const lastName = await lastValueFrom(lastName$);
                expect(lastName).toMatch(/^[a-zA-ZàèéìòóùÀÈÉÌÒÓÙçÇ' ]+$/);
            });
        });

        describe('fullName$', () => {
            it('should generate a valid full name', async () => {
                const fullName$ = personModule.fullName$();
                const fullName = await lastValueFrom(fullName$);
                expect(fullName).toMatch(/^[a-zA-ZàèéìòóùÀÈÉÌÒÓÙçÇ' ]+$/);
            });
        });

        describe('fiscalCode$', () => {
            it('should generate a valid fiscal code', async () => {
                const fiscalCodeOptions = {
                    firstName: 'Mario',
                    lastName: 'Rossi',
                    gender: Gender.Male,
                    birthDate: new Date('1980-01-01'),
                    birthPlace: {
                        type: 'italian', city: {
                            name: 'Roma',
                            province: { code: 'RM' },
                            belfioreCode: 'H501'
                        } as ItalianCity
                    }
                } as FiscalCodeOptions;
                const fiscalCode$ = personModule.fiscalCode$(fiscalCodeOptions);
                const fiscalCode = await lastValueFrom(fiscalCode$);
                expect(fiscalCode).toMatch(/^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/);
            });
        });

        describe('email$', () => {
            it('should generate a valid email address', async () => {
                const email$ = personModule.email$('Mario', 'Rossi');
                const email = await lastValueFrom(email$);
                expect(email).toMatch(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
            });
        });

        describe('pec$', () => {
            it('should generate a valid PEC address', async () => {
                const pec$ = personModule.pec$('Mario', 'Rossi');
                const pec = await lastValueFrom(pec$);
                expect(pec).toMatch(/^[a-z.]+@[a-z]+\.[a-z]+$/);
            });
        });

        describe('generatePerson$', () => {
            it('should generate a valid Italian person', async () => {
                const person$ = personModule.generatePerson$();
                const person = await lastValueFrom(person$);
                expect(person).toMatchObject<Partial<ItalianPersonDto>>({
                    fullName: expect.any(String),
                    firstName: expect.any(String),
                    lastName: expect.any(String),
                    gender: expect.any(String),
                    birthDate: expect.any(Date),
                    birthPlace: {
                        city: expect.any(String),
                        province: expect.any(String),
                        region: expect.any(String)
                    },
                    fiscalCode: expect.any(String),
                    contacts: {
                        phone: expect.any(String),
                        email: expect.any(String),
                        pec: expect.any(String)
                    },
                    address: expect.any(String)
                });
            });

            it('should generate a person based on provided options', async () => {
                const currentYear = new Date().getFullYear();
                const minYear = currentYear - 50;
                const maxYear = currentYear - 30;
                const options = {
                    gender: Gender.Female,
                    region: 'Lazio',
                    minAge: 30,
                    maxAge: 50,
                    withTitle: true
                };
                const person$ = personModule.generatePerson$(options);
                const person = await lastValueFrom(person$);
                expect(person.gender).toBe(Gender.Female);
                expect(person.birthPlace.region).toBe('Lazio');
                expect(person.fullName).toMatch(/^(Dott\.ssa|Ing\.|Arch\.|Geom\.|Prof\.ssa|Rag\.|Avv\.) [a-zA-ZàèéìòóùÀÈÉÌÒÓÙçÇ' ]+$/);
                expect(person.birthDate.getFullYear()).toBeGreaterThanOrEqual(minYear);
                expect(person.birthDate.getFullYear()).toBeLessThanOrEqual(maxYear);
            });
        });
    });

    describe('birthDate$', () => {
        it('should generate a birth date within the specified age range', async () => {
            const minAge = 30;
            const maxAge = 50;
            const currentYear = new Date().getFullYear();
            const fromYear = currentYear - maxAge;
            const toYear = currentYear - minAge;

            const birthDate$ = personModule.birthDate$(minAge, maxAge);
            const birthDate = await lastValueFrom(birthDate$);

            expect(birthDate.getFullYear()).toBeGreaterThanOrEqual(fromYear);
            expect(birthDate.getFullYear()).toBeLessThanOrEqual(toYear);
        });

        it('should generate a birth date in the past if no age range is specified', async () => {
            const birthDate$ = personModule.birthDate$();
            const birthDate = await lastValueFrom(birthDate$);

            const currentDate = new Date();
            expect(birthDate).toBeInstanceOf(Date);
            expect(birthDate.getTime()).toBeLessThan(currentDate.getTime());
        });

        it('should not generate a future date if maxAge corresponds to the current year', async () => {
            const minAge = 0;
            const maxAge = 1;
            const currentYear = new Date().getFullYear();
            const fromYear = currentYear - maxAge;
            const toYear = currentYear - minAge;

            const birthDate$ = personModule.birthDate$(minAge, maxAge);
            const birthDate = await lastValueFrom(birthDate$);

            const currentDate = new Date();
            expect(birthDate.getFullYear()).toBeGreaterThanOrEqual(fromYear);
            expect(birthDate.getFullYear()).toBeLessThanOrEqual(toYear);
            expect(birthDate.getTime()).toBeLessThanOrEqual(currentDate.getTime());
        });
    });

    describe('birthPlace$', () => {
        it('should return the name of a random city', async () => {
            vi.spyOn(personModule['placesModule'], 'randomCity$').mockReturnValue(of({ name: 'Roma' } as ItalianCity));

            const birthPlace$ = personModule.birthPlace$();
            const birthPlace = await lastValueFrom(birthPlace$);

            expect(birthPlace).toBe('Roma');
        });
    });

    describe('province$', () => {
        it('should return a province with name and code', async () => {
            vi.spyOn(personModule['placesModule'], 'province$').mockReturnValue(of({ name: 'Lazio', code: 'RM' }));

            const province$ = personModule.province$();
            const province = await lastValueFrom(province$);

            expect(province).toEqual({ name: 'Lazio', code: 'RM' });
        });
    });

});