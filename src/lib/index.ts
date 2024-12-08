import { Faker, it } from '@faker-js/faker';
import { PersonModule } from './modules/person.module';
import { PlacesModule } from './modules/places.module';
import { AddressModule } from './modules/addresses.module';
import { FiscalCodeModule } from './modules/fiscalCode.module';
import { LastNameModule } from './modules/lastName.module';

export class ItFaker extends Faker{
  itPerson: PersonModule;
  itPlace: PlacesModule;
  itAddress: AddressModule;
  itFiscalCode: FiscalCodeModule;
  itLastName: LastNameModule;
  itFirstName: LastNameModule;


  constructor()  {
    super({ locale: [it] });
    this.itPerson = new PersonModule(this);
    this.itPlace = new PlacesModule(this);
    this.itAddress = new AddressModule(this);
    this.itFiscalCode = new FiscalCodeModule(this);
    this.itLastName = new LastNameModule(this);
    this.itFirstName = new LastNameModule(this);
  }

}

export default ItFaker;