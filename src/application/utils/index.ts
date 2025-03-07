import { randomBytes } from 'crypto';

export const generateSixDigitCode = (): string => {
  const randomBuffer = randomBytes(3);
  const randomNumber = randomBuffer.readUIntBE(0, 3);
  const code = (randomNumber % 1000000).toString().padStart(6, '0');

  return code;
};

export const getWeekDay = (date: Date): string => {
  const daysOfWeek = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'];
  const dayIndex = date.getDay();

  return daysOfWeek[dayIndex];
};
