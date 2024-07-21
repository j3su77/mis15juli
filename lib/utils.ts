import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const birthMonth = 8;
const birthDay = 23;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function birthDayFromNow(birthMonth: number, birthDay: number) {
  const now = new Date();
  let nextBirthday = new Date(now.getFullYear(), birthMonth - 1, birthDay);

  // Si el cumpleaños ya pasó este año, ajustamos al próximo año
  if (now > nextBirthday) {
    nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
  }

  return nextBirthday;
}

const nextBirthday = birthDayFromNow(birthMonth, birthDay);
const endTime = nextBirthday.getTime();

export function timeLeft() {
  const now = new Date();
  const remainingTime = endTime - now.getTime();

  const seconds = Math.floor((remainingTime / 1000) % 60);
  const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
  const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

  return { days, hours, minutes, seconds };
}
