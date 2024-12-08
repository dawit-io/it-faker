export class NameUtils {

    /**
 * Formats an Italian name to capitalize the first letter of each word
 * @param fullName The full name to format
 * @returns The formatted name
 */
    static formatItalianName(fullName: string): string {
        return fullName.toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
}