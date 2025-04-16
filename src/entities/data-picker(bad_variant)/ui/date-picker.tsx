import { Calendar, X } from 'lucide-react'
import { FC, HTMLAttributes, useEffect, useRef, useState } from 'react'
import { NumberSlot } from './number-slot'

export type ControlProps = {
  field?: string
  command?: 'next' | 'prev'
}

interface DatePickerProps extends HTMLAttributes<HTMLDivElement> {
  placeholder?: string
}

export const DatePicker: FC<DatePickerProps> = ({ ...props }) => {
  const [days, setDays] = useState('дд')
  const [months, setMonths] = useState('мм')
  const [years, setYears] = useState('гггг')
  const [control, setControl] = useState<ControlProps>()

  const dayRef = useRef<HTMLInputElement>(null)
  const monthRef = useRef<HTMLInputElement>(null)
  const yearRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (control?.field && control.command) {
      if (control.command === 'next') {
        if (control.field === 'day') {
          monthRef.current?.focus()
          setTimeout(() => monthRef.current?.select(), 0)
        }
        if (control.field === 'month') {
          yearRef.current?.focus()
          setTimeout(() => yearRef.current?.select(), 0)
        }
      }

      if (control.command === 'prev') {
        console.log(control)
        if (control.field === 'year') {
          monthRef.current?.focus()
          setTimeout(() => monthRef.current?.select(), 0)
        }
        if (control.field === 'month') {
          dayRef.current?.focus()
          setTimeout(() => dayRef.current?.select(), 0)
        }
      }
    }
  }, [control])

  return (
    <div
      className="flex relative gap-1 border border-border rounded-md px-3 py-2"
      {...props}
    >
      <div className="w-24">
        <NumberSlot
          className="w-5 select-none outline-none"
          ref={dayRef}
          name="day"
          value={days}
          onChangeInput={setDays}
          setControl={setControl}
          min={1}
          max={31}
          maxLength={2}
          minLength={2}
          tabIndex={1}
          autoComplete="off"
        />
        <NumberSlot
          className="w-5 select-none outline-none"
          ref={monthRef}
          name="month"
          value={months}
          onChangeInput={setMonths}
          setControl={setControl}
          min={1}
          max={12}
          maxLength={2}
          minLength={2}
          tabIndex={2}
          autoComplete="off"
        />
        <NumberSlot
          className="w-9 select-none outline-none"
          ref={yearRef}
          name="year"
          value={years}
          onChangeInput={setYears}
          setControl={setControl}
          min={1900}
          max={2100}
          maxLength={4}
          minLength={4}
          tabIndex={3}
          autoComplete="off"
        />
      </div>
      <div className="flex justify-center items-center gap-1">
        <X className="w-4 h-4 opacity-50 scale-95 hover:scale-100 hover:opacity-100 cursor-pointer" />
        <Calendar className="w-4 h-4 opacity-50 scale-95 hover:scale-100 hover:opacity-100 cursor-pointer" />
      </div>
    </div>
  )
}
