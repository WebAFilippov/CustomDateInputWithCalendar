import { Calendar, X } from 'lucide-react'
import { NumberSlot } from './number-slot'
import { FC, useEffect, useRef, useState } from 'react'

export type ControlProps = {
  field?: string
  command?: 'next' | 'prev'
}

interface DateInputProps {
  dateFrom: string
  onChangeFrom: (value: string) => void
}

export const DateInput: FC<DateInputProps> = ({ dateFrom, onChangeFrom }) => {
  const [dayValue, setDayValue] = useState(dateFrom.slice(0, 2))
  const [monthValue, setMonthValue] = useState(dateFrom.slice(3, 5))
  const [yearValue, setYearValue] = useState(dateFrom.slice(6, 10))
  const [control, setControl] = useState<ControlProps>()

  const dayRef = useRef<HTMLButtonElement>(null)
  const monthRef = useRef<HTMLButtonElement>(null)
  const yearRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (control?.field && control.command) {
      if (control.command === 'next') {
        if (control.field === 'day') {
          monthRef.current?.focus()
        }
        if (control.field === 'month') {
          yearRef.current?.focus()
        }
      }

      if (control.command === 'prev') {
        if (control.field === 'year') {
          monthRef.current?.focus()
        }
        if (control.field === 'month') {
          dayRef.current?.focus()
        }
      }
    }
  }, [control])

  useEffect(() => {
    if (dayValue && monthValue && yearValue) {
      onChangeFrom([dayValue, monthValue, yearValue].join('-'))
    } else {
      onChangeFrom('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayValue, monthValue, yearValue])

  return (
    <div className="flex relative gap-1 border border-border rounded-md px-3 py-2">
      <div className="min-w-28">
        <NumberSlot
          ref={dayRef}
          name="day"
          placeholder="дд"
          value={dayValue}
          onChangeInput={setDayValue}
          setControl={setControl}
          min={1}
          max={31}
          tabIndex={1}
        />
        <span className="select-none">.</span>
        <NumberSlot
          ref={monthRef}
          name="month"
          placeholder="мм"
          value={monthValue}
          onChangeInput={setMonthValue}
          setControl={setControl}
          min={1}
          max={12}
          tabIndex={2}
        />
        <span className="select-none">.</span>
        <NumberSlot
          ref={yearRef}
          name="year"
          placeholder="гггг"
          value={yearValue}
          onChangeInput={setYearValue}
          setControl={setControl}
          min={1900}
          max={2100}
          tabIndex={3}
        />
      </div>
      <div className="flex justify-center items-center gap-1 relative">
        {(dayValue || monthValue || yearValue) && (
          <button
            className="absolute right-5"
            onClick={() => {
              setDayValue('')
              setMonthValue('')
              setYearValue('')
            }}
          >
            <X className="w-4 h-4 opacity-50 scale-95 hover:scale-100 hover:opacity-100 cursor-pointer" />
          </button>
        )}
        <button>
          <Calendar className="w-4 h-4 opacity-50 scale-95 hover:scale-100 hover:opacity-100 cursor-pointer" />
        </button>
      </div>
    </div>
  )
}
