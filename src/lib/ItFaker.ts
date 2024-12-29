import { Faker, it } from '@faker-js/faker';
import { PersonModule } from './modules/person.module';
import { PlacesModule } from './modules/places.module';
import { AddressModule } from './modules/addresses.module';
import { FiscalCodeModule } from './modules/fiscalCode.module';
import { LastNameModule } from './modules/lastName.module';
import { FirstNameModule } from './modules/firstName.module';

export class ItFaker extends Faker {
    private _itPerson?: PersonModule;
    private _itPlace?: PlacesModule;
    private _itAddress?: AddressModule;
    private _itFiscalCode?: FiscalCodeModule;
    private _itLastName?: LastNameModule;
    private _itFirstName?: FirstNameModule;

    constructor() {
        super({ locale: [it] });
    }

    get itPerson(): PersonModule {
        if (!this._itPerson) {
            this._itPerson = new PersonModule(this);
        }
        return this._itPerson;
    }

    get itPlace(): PlacesModule {
        if (!this._itPlace) {
            this._itPlace = new PlacesModule(this);
        }
        return this._itPlace;
    }

    get itAddress(): AddressModule {
        if (!this._itAddress) {
            this._itAddress = new AddressModule(this);
        }
        return this._itAddress;
    }

    get itFiscalCode(): FiscalCodeModule {
        if (!this._itFiscalCode) {
            this._itFiscalCode = new FiscalCodeModule(this);
        }
        return this._itFiscalCode;
    }

    get itLastName(): LastNameModule {
        if (!this._itLastName) {
            this._itLastName = new LastNameModule(this);
        }
        return this._itLastName;
    }

    get itFirstName(): FirstNameModule {
        if (!this._itFirstName) {
            this._itFirstName = new FirstNameModule(this);
        }
        return this._itFirstName;
    }
}