import type { BirthPlace } from "../modules/fiscalCode.module";
import type { Gender } from "./types";

export interface ItalianPerson {
  firstName: string;
  lastName: string;
  gender: Gender;
  birthDate: Date;
  birthPlace: BirthPlace;
  fiscalCode: string;
}