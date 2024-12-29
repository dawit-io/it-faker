#!/usr/bin/env node

import { Command } from 'commander';
import { ItFaker } from '../dist/lib/index.mjs';

const faker = new ItFaker();

function parseInteger(value) {
    const parsedValue = Number.parseInt(value, 10);
    if (Number.isNaN(parsedValue)) {
        throw new Error('Value must be a number');
    }
    return parsedValue;
}

function formatOutput(data) {
    return JSON.stringify(data, null, 2);
}

const program = new Command();

program
    .name('it-faker')
    .description('Generate authentic Italian fake data')
    .version('0.1.2-alpha.0');

program.command('firstName')
    .description('Generate Italian first name')
    .option('-g, --gender <gender>', 'Specify gender (male/female)')
    .option('-p, --prefix', 'Include professional title')
    .option('-c, --count <number>', 'Number of names to generate', '1')
    .action(async (options) => {
        try {
            const count = parseInteger(options.count);

            if (count < 1) {
                console.error('Count must be greater than 0');
                process.exit(1);
            }

            const names = await Promise.all(
                Array(count).fill(null).map(() =>
                    faker.itFirstName.firstName({
                        gender: options.gender,
                        prefix: options.prefix
                    })
                )
            );

            console.log(formatOutput(count === 1 ? names[0] : names));
        } catch (error) {
            console.error('Error generating first name:', error.message);
            process.exit(1);
        }
    });

program.command('lastName')
    .description('Generate Italian last name')
    .option('-r, --region <region>', 'Specify Italian region')
    .option('-p, --province <province>', 'Specify Italian province')
    .option('-c, --count <number>', 'Number of surnames to generate', '1')
    .action(async (options) => {
        try {
            const count = parseInteger(options.count);

            if (count < 1) {
                console.error('Count must be greater than 0');
                process.exit(1);
            }

            const surnames = await Promise.all(
                Array(count).fill(null).map(() =>
                    faker.itLastName.lastName({
                        region: options.region,
                        province: options.province
                    })
                )
            );

            console.log(formatOutput(count === 1 ? surnames[0] : surnames));
        } catch (error) {
            console.error('Error generating last name:', error.message);
            process.exit(1);
        }
    });

program.command('person')
    .description('Generate Italian person data')
    .option('-r, --region <region>', 'Specify Italian region')
    .option('-p, --province <province>', 'Specify Italian province')
    .option('-g, --gender <gender>', 'Specify gender (male/female)')
    .option('-c, --count <number>', 'Number of persons to generate', '1')
    .option('--with-address', 'Include address')
    .action(async (options) => {
        try {
            const count = parseInteger(options.count);

            if (count < 1) {
                console.error('Count must be greater than 0');
                process.exit(1);
            }

            const persons = await Promise.all(
                Array(count).fill(null).map(async () => {
                    const person = await faker.itPerson.generatePerson({
                        gender: options.gender,
                        region: options.region,
                        province: options.province
                    });

                    if (options.withAddress) {
                        const address = await faker.itAddress.completeAddress({
                            region: options.region,
                            province: options.province
                        });
                        return { ...person, address };
                    }

                    return person;
                })
            );

            console.log(formatOutput(count === 1 ? persons[0] : persons));
        } catch (error) {
            console.error('Error generating person data:', error.message);
            process.exit(1);
        }
    });

program.command('address')
    .description('Generate Italian address')
    .option('-r, --region <region>', 'Specify Italian region')
    .option('-p, --province <province>', 'Specify Italian province')
    .option('-c, --count <number>', 'Number of addresses to generate', '1')
    .action(async (options) => {
        try {
            const count = parseInteger(options.count);

            if (count < 1) {
                console.error('Count must be greater than 0');
                process.exit(1);
            }

            const addresses = await Promise.all(
                Array(count).fill(null).map(() =>
                    faker.itAddress.completeAddress({
                        region: options.region,
                        province: options.province
                    })
                )
            );

            console.log(formatOutput(count === 1 ? addresses[0] : addresses));
        } catch (error) {
            console.error('Error generating address:', error.message);
            process.exit(1);
        }
    });

program.command('fiscal-code')
    .description('Generate Italian fiscal code')
    .option('-c, --count <number>', 'Number of fiscal codes to generate', '1')
    .action(async (options) => {
        try {
            const count = parseInteger(options.count);

            if (count < 1) {
                console.error('Count must be greater than 0');
                process.exit(1);
            }

            const codes = await Promise.all(
                Array(count).fill(null).map(() =>
                    faker.itFiscalCode.generate()
                )
            );

            console.log(formatOutput(count === 1 ? codes[0] : codes));
        } catch (error) {
            console.error('Error generating fiscal code:', error.message);
            process.exit(1);
        }
    });

// Mostra help se non vengono forniti argomenti
if (process.argv.length === 2) {
    program.help();
}

program.parse();