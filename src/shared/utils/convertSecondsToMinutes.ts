const SECONDS_IN_MINUTE = 60;

export const convertSecondsToMinutes = (time: number): string => {
  if (!Number.isFinite(time)) {
    return '0:00';
  }

  const minutes = Math.floor(time / SECONDS_IN_MINUTE);
  const seconds = time % SECONDS_IN_MINUTE;

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};