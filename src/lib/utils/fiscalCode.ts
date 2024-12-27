import { ItalianPerson } from "../types/person";
import { Gender } from "../types/types";

export class FiscalCodeGenerator {
  private static MONTH_CODES = ['A', 'B', 'C', 'D', 'E', 'H', 'L', 'M', 'P', 'R', 'S', 'T'];

  private static ODD_CHARS: { [key: string]: number } = {
    '0': 1, '1': 0, '2': 5, '3': 7, '4': 9, '5': 13, '6': 15, '7': 17, '8': 19,
    '9': 21, 'A': 1, 'B': 0, 'C': 5, 'D': 7, 'E': 9, 'F': 13, 'G': 15, 'H': 17,
    'I': 19, 'J': 21, 'K': 2, 'L': 4, 'M': 18, 'N': 20, 'O': 11, 'P': 3, 'Q': 6,
    'R': 8, 'S': 12, 'T': 14, 'U': 16, 'V': 10, 'W': 22, 'X': 25, 'Y': 24, 'Z': 23
  };

  private static EVEN_CHARS: { [key: string]: number } = {
    '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8,
    '9': 9, 'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7,
    'I': 8, 'J': 9, 'K': 10, 'L': 11, 'M': 12, 'N': 13, 'O': 14, 'P': 15, 'Q': 16,
    'R': 17, 'S': 18, 'T': 19, 'U': 20, 'V': 21, 'W': 22, 'X': 23, 'Y': 24, 'Z': 25
  };

  private static REMAINDER_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  static generate(person: Omit<ItalianPerson, 'fiscalCode'>): string {
    const surname = this.processSurname(person.lastName);
    const name = this.processName(person.firstName);
    const dateCode = this.processDate(person.birthDate, person.gender);
    const cityCode = person.birthPlace.belfioreCode;

    const baseCode = surname + name + dateCode + cityCode;
    const controlChar = this.calculateControlChar(baseCode);

    return baseCode + controlChar;
  }

  private static processSurname(surname: string): string {
    const consonants = surname.toUpperCase().replace(/[^BCDFGHJKLMNPQRSTVWXYZ]/g, '');
    const vowels = surname.toUpperCase().replace(/[^AEIOU]/g, '');
    const combined = consonants + vowels + 'XXX';
    return combined.slice(0, 3);
  }

  private static processName(name: string): string {
    const consonants = name.toUpperCase().replace(/[^BCDFGHJKLMNPQRSTVWXYZ]/g, '');
    if (consonants.length > 3) {
      return consonants[0] + consonants[2] + consonants[3];
    }
    const vowels = name.toUpperCase().replace(/[^AEIOU]/g, '');
    const combined = consonants + vowels + 'XXX';
    return combined.slice(0, 3);
  }

  private static processDate(date: Date, gender: Gender): string {
    const year = date.getFullYear().toString().slice(-2);
    const month = this.MONTH_CODES[date.getMonth()];
    let day = date.getDate().toString().padStart(2, '0');
    if (gender === Gender.Female) {
      day = (parseInt(day) + 40).toString();
    }
    return year + month + day;
  }

  public static calculateControlChar(code: string): string {
    if (code.length !== 15) {
      throw new Error('Base code must be exactly 15 characters long');
    }

    let sum = 0;

    // Process characters in odd positions (1-based index)
    for (let i = 0; i < code.length; i += 2) {
      const char = code[i];
      const value = this.ODD_CHARS[char];
      if (value === undefined) {
        throw new Error(`Invalid character in odd position: ${char}`);
      }
      sum += value;
    }

    // Process characters in even positions (1-based index)
    for (let i = 1; i < code.length; i += 2) {
      const char = code[i];
      const value = this.EVEN_CHARS[char];
      if (value === undefined) {
        throw new Error(`Invalid character in even position: ${char}`);
      }
      sum += value;
    }

    // Calculate remainder and get corresponding letter
    const remainder = sum % 26;
    return this.REMAINDER_CHARS.charAt(remainder);
  }
}