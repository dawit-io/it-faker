import { describe, it, expect } from 'vitest';
import Joi from 'joi';
import type { RawItalianCity, ItalianCity } from '../../../src/lib/types/city';
import type { ItalianLocation } from '../../../src/lib/types/location';
import type { ItalianPerson } from '../../../src/lib/types/person';
import { Gender } from '../../../src/lib/types/types';

describe('Type Validation', () => {
    const rawItalianCitySchema = Joi.object({
        nome: Joi.string().required(),
        codice: Joi.string().required(),
        zona: Joi.object({
            codice: Joi.string().required(),
            nome: Joi.string().required()
        }).required(),
        regione: Joi.object({
            codice: Joi.string().required(),
            nome: Joi.string().required()
        }).required(),
        provincia: Joi.object({
            codice: Joi.string().required(),
            nome: Joi.string().required()
        }).required(),
        sigla: Joi.string().required(),
        codiceCatastale: Joi.string().required(),
        cap: Joi.array().items(Joi.string()).required(),
        popolazione: Joi.number().required()
    });

    const italianCitySchema = Joi.object({
        name: Joi.string().required(),
        code: Joi.string().required(),
        zone: Joi.object({
            code: Joi.string().required(),
            name: Joi.string().required()
        }).required(),
        region: Joi.object({
            code: Joi.string().required(),
            name: Joi.string().required()
        }).required(),
        province: Joi.object({
            code: Joi.string().required(),
            name: Joi.string().required()
        }).required(),
        provinceCode: Joi.string().required(),
        belfioreCode: Joi.string().required(),
        postalCodes: Joi.array().items(Joi.string()).required(),
        population: Joi.number().required()
    });

    const italianLocationSchema = Joi.object({
        city: italianCitySchema.required(),
        address: Joi.string().required(),
        zipCode: Joi.string().required()
    });

    const italianPersonSchema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        gender: Joi.string().valid(Gender.Male, Gender.Female).required(),
        birthDate: Joi.date().required(),
        birthPlace: italianCitySchema.required(),
        fiscalCode: Joi.string().required()
    });

    it('should validate RawItalianCity', () => {
        const validData: RawItalianCity = {
            nome: 'Milano',
            codice: '015146',
            zona: {
                codice: '1',
                nome: 'Nord-ovest'
            },
            regione: {
                codice: '03',
                nome: 'Lombardia'
            },
            provincia: {
                codice: '015',
                nome: 'Milano'
            },
            sigla: 'MI',
            codiceCatastale: 'F205',
            cap: ['20121', '20122', '20123'],
            popolazione: 1352000
        };

        const { error } = rawItalianCitySchema.validate(validData);
        expect(error).toBeUndefined();
    });

    it('should validate ItalianCity', () => {
        const validData: ItalianCity = {
            name: 'Milano',
            code: '015146',
            zone: {
                code: '1',
                name: 'Nord-ovest'
            },
            region: {
                code: '03',
                name: 'Lombardia'
            },
            province: {
                code: '015',
                name: 'Milano'
            },
            provinceCode: 'MI',
            belfioreCode: 'F205',
            postalCodes: ['20121', '20122', '20123'],
            population: 1352000
        };

        const { error } = italianCitySchema.validate(validData);
        expect(error).toBeUndefined();
    });

    it('should validate ItalianLocation', () => {
        const validData: ItalianLocation = {
            city: {
                name: 'Milano',
                code: '015146',
                zone: {
                    code: '1',
                    name: 'Nord-ovest'
                },
                region: {
                    code: '03',
                    name: 'Lombardia'
                },
                province: {
                    code: '015',
                    name: 'Milano'
                },
                provinceCode: 'MI',
                belfioreCode: 'F205',
                postalCodes: ['20121', '20122', '20123'],
                population: 1352000
            },
            address: 'Via Montenapoleone, 1',
            zipCode: '20121'
        };

        const { error } = italianLocationSchema.validate(validData);
        expect(error).toBeUndefined();
    });

    it('should validate ItalianPerson', () => {
        const validData: ItalianPerson = {
            firstName: 'Mario',
            lastName: 'Rossi',
            gender: Gender.Male,
            birthDate: new Date('1980-01-01'),
            birthPlace: {
                name: 'Milano',
                code: '015146',
                zone: {
                    code: '1',
                    name: 'Nord-ovest'
                },
                region: {
                    code: '03',
                    name: 'Lombardia'
                },
                province: {
                    code: '015',
                    name: 'Milano'
                },
                provinceCode: 'MI',
                belfioreCode: 'F205',
                postalCodes: ['20121', '20122', '20123'],
                population: 1352000
            },
            fiscalCode: 'RSSMRA80A01F205Z'
        };

        const { error } = italianPersonSchema.validate(validData);
        expect(error).toBeUndefined();
    });
});