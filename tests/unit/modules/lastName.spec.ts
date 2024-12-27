import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { LastNameModule } from '../../../src/lib/modules/lastName.module';
import { fakerIT as faker } from '@faker-js/faker';
import { lastValueFrom } from 'rxjs';

describe('LastNameModule', () => {
    let lastNameModule: LastNameModule;

    beforeEach(() => {
        lastNameModule = new LastNameModule(faker);
    });

    afterEach(() => {
        lastNameModule.clearCache();
    });

    describe('lastName', () => {
        it('should generate a valid Italian last name', async () => {
            const lastName = await lastNameModule.lastName();
            expect(lastName).toMatch(/^[a-zA-ZàèéìòóùÀÈÉÌÒÓÙçÇ' ]+$/);
        });

        it('should generate a last name for a specific region', async () => {
            const options = { region: 'Lombardia' };
            const lastName = await lastNameModule.lastName(options);
            expect(lastName).toMatch(/^[a-zA-ZàèéìòóùÀÈÉÌÒÓÙçÇ' ]+$/);
        });

        it('should generate a last name for a specific province', async () => {
            const options = { province: 'Milano' };
            const lastName = await lastNameModule.lastName(options);
            expect(lastName).toMatch(/^[a-zA-ZàèéìòóùÀÈÉÌÒÓÙçÇ' ]+$/);
        });
    });

    describe('lastName$', () => {
        it('should generate a valid Italian last name', async () => {
            const lastName$ = lastNameModule.lastName$();
            const lastName = await lastValueFrom(lastName$);
            expect(lastName).toMatch(/^[a-zA-ZàèéìòóùÀÈÉÌÒÓÙçÇ' ]+$/);
        });

        it('should generate a last name for a specific region', async () => {
            const options = { region: 'Lombardia' };
            const lastName$ = lastNameModule.lastName$(options);
            const lastName = await lastValueFrom(lastName$);
            expect(lastName).toMatch(/^[a-zA-ZàèéìòóùÀÈÉÌÒÓÙçÇ' ]+$/);
        });

        it('should generate a last name for a specific province', async () => {
            const options = { province: 'Milano' };
            const lastName$ = lastNameModule.lastName$(options);
            const lastName = await lastValueFrom(lastName$);
            expect(lastName).toMatch(/^[a-zA-ZàèéìòóùÀÈÉÌÒÓÙçÇ' ]+$/);
        });
    });

    describe('preloadData', () => {
        it('should preload data successfully', async () => {
            await expect(lastNameModule.preloadData()).resolves.toBeUndefined();
        });
    });

    describe('preloadData$', () => {
        it('should preload data successfully', async () => {
            await expect(lastValueFrom(lastNameModule.preloadData$())).resolves.toBeUndefined();
        });
    });
});