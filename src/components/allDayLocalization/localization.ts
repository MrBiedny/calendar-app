const allDayLocalizationMessages: Record<Locale, AllDayMessages> = {
  "en-US": {
    allDay: "All Day",
  },
  "pl-PL": {
    allDay: "Cały dzień",
  },
};

export const getAllDayMessages = (locale: Locale): AllDayMessages =>
  allDayLocalizationMessages[locale];
