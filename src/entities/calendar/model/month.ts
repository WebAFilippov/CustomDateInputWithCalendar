import { createEvent, createStore, sample } from 'effector';
import { MONTH } from '../config/contants';
import { Temporal } from '@js-temporal/polyfill';

const setSelectedMonth = createEvent<string>();

const $month = createStore(MONTH);
const $selectedMonth = createStore<string>(
  MONTH[Temporal.Now.plainDateISO().month - 1]
);

sample({
  clock: setSelectedMonth,
  target: $selectedMonth,
});

export { $month, $selectedMonth, setSelectedMonth };

$month.watch((state) => console.log(`#month: ${state}`));
$selectedMonth.watch((state) => console.log(`#selectedMonth: ${state}`));
