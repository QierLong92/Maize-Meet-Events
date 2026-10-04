import { getEvents } from '../db/database';

function wait(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export async function refreshEvents() {
  await wait(800);
  if (Math.random() < 0.35) {
    throw new Error('Campus events service is unavailable.');
  }
  return getEvents();
}
