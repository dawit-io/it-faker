import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Faker } from '@faker-js/faker'
import { FirstNameModule } from '../../../src/lib/modules/firstName.module'
import { Gender } from '../../../src/lib/types/types'
import { firstValueFrom } from 'rxjs/internal/firstValueFrom'

describe('FirstNameModule', () => {
    let faker: Faker
    let module: FirstNameModule

    beforeEach(() => {
        faker = {
            helpers: {
                arrayElement: vi.fn()
            }
        } as unknown as Faker

        module = new FirstNameModule(faker)
    })

    describe('prefix', () => {
        it('returns neutral prefix when no gender specified', async () => {
            vi.mocked(faker.helpers.arrayElement).mockReturnValue('Ing.')
            const prefix = await module.prefix()
            expect(prefix).toBe('Ing.')
        })

        it('returns male prefix when male gender specified', async () => {
            vi.mocked(faker.helpers.arrayElement).mockReturnValue('Dott.')
            const prefix = await module.prefix(Gender.Male)
            expect(prefix).toBe('Dott.')
        })

        it('returns female prefix when female gender specified', async () => {
            vi.mocked(faker.helpers.arrayElement).mockReturnValue('Dott.ssa')
            const prefix = await module.prefix(Gender.Female)
            expect(prefix).toBe('Dott.ssa')
        })
    })

    describe('firstName', () => {
        it('loads data and generates male name', async () => {
            vi.mocked(faker.helpers.arrayElement).mockReturnValue(Gender.Male)
            const name = await module.firstName()
            expect(name).toBeTruthy()
        })

        it('adds prefix when requested', async () => {
            vi.mocked(faker.helpers.arrayElement)
                .mockReturnValueOnce(Gender.Male)
                .mockReturnValueOnce('Dott.')

            const name = await module.firstName({ prefix: true })
            expect(name).toMatch(/^Dott\. /)
        })
    })

    describe('firstName$', () => {
        it('loads data and generates male name', async () => {
            vi.mocked(faker.helpers.arrayElement).mockReturnValue(Gender.Male)
            const name = await firstValueFrom(module.firstName$())
            expect(name).toBeTruthy()
        })

        it('adds prefix when requested', async () => {
            vi.mocked(faker.helpers.arrayElement)
                .mockReturnValueOnce(Gender.Male)
                .mockReturnValueOnce('Dott.')

            const name = await firstValueFrom(module.firstName$({ prefix: true }))
            expect(name).toMatch(/^Dott\. /)
        })
    })

    describe('clearCache', () => {
        it('clears loaded data', async () => {
            await module.preloadData()
            module.clearCache()
            // Verify data reloads on next request
            const name = await module.firstName()
            expect(name).toBeTruthy()
        })
    })
})