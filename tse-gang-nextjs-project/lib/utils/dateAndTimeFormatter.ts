import {format} from 'date-fns';

//Functions to take a date and time, as string or date objects and convert them to local time

export function formatTournamentDate(dateString: string): string {
  // API sender f.eks. "Sun, 02 Nov 2025 04:00:00 GMT"
  const dateObj = new Date(dateString);
    
  return format(dateObj, 'dd-MM-yyyy');
}

export function formatTournamentTime(dateString: string): string {
  const dateObj = new Date(dateString);
  return format(dateObj, 'HH:mm');
}

// Hjælpe-funktion til at få både dato og tid
// lib/utils/dateAndTimeFormatter.ts

export function formatTournamentDateTime(dateString: string, locale?: string) {
  const date = new Date(dateString);

  const resolvedLocale =
    locale ??
    (typeof navigator !== "undefined" ? navigator.language : "en-US");

  const formatter = new Intl.DateTimeFormat(resolvedLocale, {
    dateStyle: "long",
    timeStyle: "short",
  });

  return {
    formatted: formatter.format(date),
    fullDateTime: date,
  };
}