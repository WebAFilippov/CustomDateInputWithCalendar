import { FC } from 'react';
import { DatePicker } from './date-picker';

interface DateProps {
  type: 'data';
  dateFrom: string;
  onChangeDateFrom: (value: string) => void;
  dateTo?: never;
  onChangeDateTo?: never;
}

interface DateTimeProps {
  type: 'datatime';
  dateFrom: string;
  onChangeDateFrom: (value: string) => void;
  dateTo?: never;
  onChangeDateTo?: never;
}

interface PeriodProps {
  type: 'period';
  dateFrom: string;
  onChangeDateFrom: (value: string) => void;
  dateTo: string;
  onChangeDateTo: (value: string) => void;
}

interface PeriodTimeProps {
  type: 'periodtime';
  dateFrom: string;
  onChangeDateFrom: (value: string) => void;
  dateTo: string;
  onChangeDateTo: (value: string) => void;
}

type DatePickerInputProps =
  | DateProps
  | DateTimeProps
  | PeriodProps
  | PeriodTimeProps;

export const DataPickerInputBadVariant: FC<DatePickerInputProps> = ({
  type,
  dateFrom,
  dateTo,
  onChangeDateFrom,
  onChangeDateTo,
}) => {
  if (type === 'data') {
    return (
      <DatePicker dateFrom={dateFrom} onChangeDateFrom={onChangeDateFrom} />
    );
  }

  if (type === 'datatime') {
    return null;
  }

  if (type === 'period' || type === 'periodtime') {
    return null;
  }
};
