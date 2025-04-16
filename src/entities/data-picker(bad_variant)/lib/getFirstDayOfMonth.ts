import { Temporal } from '@js-temporal/polyfill';

export const getFirstDayOfMonth = (year: number, month: number) => {
  // Создаём дату для первого числа месяца
  const date = Temporal.PlainDate.from({ year, month, day: 1 });

  // Получаем день недели (1 — понедельник, 7 — воскресенье)
  const dayOfWeek = date.dayOfWeek;

  // Для удобства добавим названия дней недели
  const dayNames = [
    'Понедельник', // 1
    'Вторник', // 2
    'Среда', // 3
    'Четверг', // 4
    'Пятница', // 5
    'Суббота', // 6
    'Воскресенье', // 7
  ];

  return {
    dayOfWeek, // Числовое значение (1-7)
    dayName: dayNames[dayOfWeek - 1], // Название дня
  };
};
