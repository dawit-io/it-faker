
export interface ItalianPersonContactsDto {
    phone: string;
    landline?: string;
    email: string;
    pec: string;
}

export interface ItalianAddressDto {
    street: string;
    apartmentDetails?: string;
    postalCode: string;
    city: string;
    province: string;
    region: string;
}

export interface ItalianBirthPlaceDto {
    city: string;
    province: string;
    region: string;
}

export interface ItalianPersonDto {
    fullName: string;
    firstName: string;
    lastName: string;
    gender: string;
    birthDate: Date;
    fiscalCode: string;
    prefix?: string;
    contacts: ItalianPersonContactsDto;
    address: string;
    birthPlace: ItalianBirthPlaceDto;
}