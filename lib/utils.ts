import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNaira(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      dateStyle: "medium",
      timeZone: "Africa/Lagos",
    }).format(d);
  } catch {
    return dateString;
  }
}

export function generateGoogleCalendarUrl(event: {
  title: string;
  description: string;
  location: string;
  startDate: string; // ISO string e.g. "2026-11-19T10:00:00+01:00"
  endDate: string; // ISO string e.g. "2026-11-19T18:00:00+01:00"
}): string {
  const start = new Date(event.startDate).toISOString().replace(/-|:|\.\d\d\d/g, "");
  const end = new Date(event.endDate).toISOString().replace(/-|:|\.\d\d\d/g, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    details: event.description,
    location: event.location,
    dates: `${start}/${end}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function generateICSContent(event: {
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
}): string {
  const formatICSDate = (dateStr: string) => {
    return new Date(dateStr)
      .toISOString()
      .replace(/-|:|\.\d\d\d/g, "")
      .replace(/Z$/, "");
  };

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Kehinde & Victor Wedding//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description.replace(/\n/g, "\\n")}`,
    `LOCATION:${event.location}`,
    `DTSTART:${formatICSDate(event.startDate)}`,
    `DTEND:${formatICSDate(event.endDate)}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
