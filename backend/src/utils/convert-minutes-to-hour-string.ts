export const convertMinutesToHourString = (minutes: number) => {
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;

  const hourString = String(hour).padStart(2, '0');
  const minuteString = String(minute).padStart(2, '0');

  return `${hourString}:${minuteString}`;
}