import { FC } from 'react'
import { DateInput } from './date-input'

interface DateProps {
  type: 'data'
  dateFrom: string
  onChangeFrom: (value: string) => void
  dateTo?: never
  onChangeTo?: never
}

interface PeriodProps {
  type: 'period'
  dateFrom: string
  onChangeFrom: (value: string) => void
  dateTo: string
  onChangeTo: (value: string) => void
}

type DatePickerInputProps = DateProps | PeriodProps

export const DataPickerInput: FC<DatePickerInputProps> = ({
  type,
  dateFrom,
  dateTo,
  onChangeFrom,
  onChangeTo,
}) => {
  if (type === 'data') {
    return <DateInput dateFrom={dateFrom} onChangeFrom={onChangeFrom} />
  }

  return null
}
