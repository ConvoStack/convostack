export const unixTimestamp = (date?: Date) => {
  if (!date) {
    date = new Date();
  }
  return Math.floor(date.getTime() / 1000);
};

export const addSecondsToDate = (date: Date, seconds: number) => {
  const newUnixTimestamp = unixTimestamp(date) + seconds;
  return new Date(newUnixTimestamp * 1000);
};
