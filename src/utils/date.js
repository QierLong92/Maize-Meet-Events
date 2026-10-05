const CAMPUS_TIME_ZONE = 'America/Detroit';

export function formatEventDate(startsAt) {
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: CAMPUS_TIME_ZONE,
  }).format(new Date(startsAt));
}

export function formatEventTime(startsAt, endsAt) {
  const formatter = new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: CAMPUS_TIME_ZONE,
  });
  return `${formatter.format(new Date(startsAt))} - ${formatter.format(new Date(endsAt))}`;
}

export function formatFullEventDate(startsAt, endsAt) {
  return `${formatEventDate(startsAt)} · ${formatEventTime(startsAt, endsAt)}`;
}
