export const today = new Date();
export const day = today.getDate();
export const year = today.getFullYear();
export const month = today.getMonth();


export function timeStamp(locale: string) {
    const timeStamp = new Date(Date.now());
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return timeStamp.toLocaleString(locale, options);
  }
