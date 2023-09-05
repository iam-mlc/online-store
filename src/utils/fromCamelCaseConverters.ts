export const fromCamelCaseToSpaces = (string: string) => {
  return string.trim().replace(/([a-z])([A-Z])/g, "$1 $2");
};

export const fromCamelCaseToUnderscores = (string: string) => {
  return string.trim().replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
};

export const fromCamelCaseToHyphens = (string : string) => {
    return string.trim().replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};