export default function getFirstLetters(input: string): string {
    const words = input.split(/\s+/); // Split on one or more spaces
    const firstLetters = words
        .filter(word => /^[a-zA-Z]/.test(word)) // Filter out words that do not start with an alphabetic character
        .map(word => word.charAt(0).toUpperCase()); // Extract the first letter and convert it to uppercase
    return firstLetters.join('');
}
