export function replaceSpacesWithHyphens(str: string): string {
    return str.trim().replace(/\s+/g, '-');
}