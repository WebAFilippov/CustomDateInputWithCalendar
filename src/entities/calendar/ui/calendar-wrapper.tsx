import { FC, ReactNode } from 'react';
import { DAYS } from '../config/contants';

interface CalendarWrapperProps {
  slotMonth: ReactNode;
  slotYear: ReactNode;

  slotCalendar: ReactNode;
  slotApply: ReactNode;
  slotCancel: ReactNode;
}

export const CalendarWrapper: FC<CalendarWrapperProps> = ({
  slotMonth,
  slotYear,
  slotCalendar,
  slotApply,
  slotCancel,
}) => {
  return (
    <div className="bg-card text-card-foreground h-80 w-72 border-border border flex flex-col">
      <div className="flex border-border border-b h-12 justify-between items-center divide-x">
        {slotMonth}
        {slotYear}
      </div>

      <div className="p-4 flex flex-1 flex-col gap-4">
        <div className="grid grid-cols-7 grid-rows-1 select-none">
          {DAYS.map((day) => (
            <div>{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {slotCalendar}
          {Array(31)
            .fill(null)
            .map((_, index) => (
              <div>{index}</div>
            ))}
        </div>
      </div>

      <div className="flex justify-between items-center h-12 bg-blue-400">
        <div>{slotApply}</div>
        <div>{slotCancel}</div>
      </div>
    </div>
  );
};
