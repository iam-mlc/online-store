export default function toName(str: string): string {
    const newString = str.trim().replace(/-/g, ' ')
    return newString.charAt(0).toUpperCase() + newString.trim().slice(1);
}
