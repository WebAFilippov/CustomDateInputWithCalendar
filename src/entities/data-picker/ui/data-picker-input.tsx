import { FC } from 'react'
import { DateInput } from './date-input'

interface DateProps {
  type: 'data'
  placeholder: string
  dateFrom: string
  onChangeFrom: (value: string) => void
  dateTo?: never
  onChangeTo?: never
}

interface PeriodProps {
  type: 'period'
  placeholder: string
  dateFrom: string
  onChangeFrom: (value: string) => void
  dateTo: string
  onChangeTo: (value: string) => void
}

type DatePickerInputProps = DateProps | PeriodProps

export const DataPickerInput: FC<DatePickerInputProps> = ({
  type,
  placeholder,
  dateFrom,
  dateTo,
  onChangeFrom,
  onChangeTo,
}) => {
  if (type === 'data') {
    return (
      <DateInput
        placeholder={placeholder}
        dateFrom={dateFrom}
        onChangeFrom={onChangeFrom}
      />
    )
  }

  return null
}
