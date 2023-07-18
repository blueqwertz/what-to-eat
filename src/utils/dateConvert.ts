export const DateToUTC = (date: Date) => {
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0)
  );
};

export const convertToUTC = (date: Date): Date => {
  const offsetMinutes = date.getTimezoneOffset();
  const offsetMilliseconds = offsetMinutes * 60 * 1000;
  const utcDate = new Date(date.getTime() + offsetMilliseconds);

  return utcDate;
};
