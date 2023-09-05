/**
 * Converts a string to camel case.
 *
 * @param {string} string - The string to convert.
 * @returns {string} The camel case version of the string.
 */
const toCamelCase = (string: string) => {
  return string
    .trim()
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""))
    .replace(/^(.)/, (m, c) => c.toLowerCase());
};

export default toCamelCase;
