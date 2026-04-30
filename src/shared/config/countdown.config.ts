

export interface CountdownRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
}

export interface CountdownState {
  enabled: boolean;
  endTime: Date | null;
  isComplete: boolean;
}

export function isCountdownEnabled(): boolean {
  const val = import.meta.env.PUBLIC_COUNTDOWN_ENABLED;
  return val === "true" || val === true;
}

export function getCountdownEndTime(): Date | null {
  const date = import.meta.env.PUBLIC_COUNTDOWN_START_DATE;
  const time = import.meta.env.PUBLIC_COUNTDOWN_START_TIME;
  const gmt = import.meta.env.PUBLIC_COUNTDOWN_START_GMT;
  const durationMinutes = Number(import.meta.env.PUBLIC_COUNTDOWN_DURATION_MINUTES);

  if (!date || !time || !gmt || isNaN(durationMinutes)) return null;

  const isoString = `${date}T${time}${gmt}`;
  const start = new Date(isoString);
  if (isNaN(start.getTime())) return null;

  return new Date(start.getTime() + durationMinutes * 60 * 1000);
}

export function isCountdownComplete(now: Date = new Date()): boolean {
  if (!isCountdownEnabled()) return true;
  const end = getCountdownEndTime();
  if (!end) return true;
  return now.getTime() >= end.getTime();
}

export function getRemainingTime(now: Date = new Date()): CountdownRemaining {
  const end = getCountdownEndTime();
  if (!end) return { days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0 };

  const totalMs = Math.max(0, end.getTime() - now.getTime());

  const days = Math.floor(totalMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((totalMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((totalMs % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, totalMs };
}

export function getCountdownState(now: Date = new Date()): CountdownState {
  return {
    enabled: isCountdownEnabled(),
    endTime: getCountdownEndTime(),
    isComplete: isCountdownComplete(now),
  };
}
