export default function sanitizeInput(input : string) {
    // Replace special characters with their escaped versions
    const sanitizedInput = input.replace(/[*?~^():!]/g, '\\$&');
    return sanitizedInput;
  }
  