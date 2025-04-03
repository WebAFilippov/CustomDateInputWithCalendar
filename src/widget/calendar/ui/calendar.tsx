import {
  $month,
  $selectedMonth,
  CalendarWrapper,
  setSelectedMonth,
} from '@entities/calendar';

import { SelectOption } from '@features/select-option';
import { useUnit } from 'effector-react';

export const Calendar = () => {
  const [month, selectedMonth, handleSetSelectedMonth] = useUnit([
    $month,
    $selectedMonth,
    setSelectedMonth,
  ]);

  return (
    <CalendarWrapper
      slotMonth={
        <SelectOption
          options={month}
          isSwipe={true}
          selectedOption={selectedMonth}
          onSelect={handleSetSelectedMonth}
        />
      }
      slotYear={
        <SelectOption
          options={month}
          isSwipe={true}
          selectedOption={selectedMonth}
          onSelect={handleSetSelectedMonth}
        />
      }
    />
  );
};
