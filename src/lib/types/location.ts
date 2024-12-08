import { ItalianCity } from "./city";

  
  export interface ItalianLocation {
    city: ItalianCity;
    address: string;
    zipCode: string;
  }