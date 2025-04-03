import { Calendar, X } from 'lucide-react'
import { FC, HTMLAttributes, MouseEvent, useRef, useState } from 'react'
import { NumberSlot } from './number-slot'

interface DatePickerProps extends HTMLAttributes<HTMLDivElement> {
  placeholder: string
}

export const DatePicker: FC<DatePickerProps> = ({ ...props }) => {
  const [years, setYears] = useState('гггг')

  const yearRef = useRef<HTMLInputElement>(null)

  const onChangeYearInput = (value: string) => {
    if (yearRef.current) {
      setYears(value)
      yearRef.current.select()
    }
  }
  const handleFocus = () => {
    if (yearRef.current) {
      yearRef.current.select()
    }
  }
  const handleClick = () => {
    if (yearRef.current) {
      yearRef.current.select()
    }
  }
  const handleMouseDown = (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (yearRef.current) {
      yearRef.current.focus()
      setTimeout(() => yearRef.current?.select(), 0)
    }
  }

  return (
    <div
      className="flex relative gap-1 border border-border rounded-md px-3 py-2"
      {...props}
    >
      <div className="w-24">
        <NumberSlot
          className="w-9 select-none outline-none"
          ref={yearRef}
          value={years}
          onChangeInput={onChangeYearInput}
          onFocus={handleFocus}
          onClick={handleClick}
          onMouseDown={handleMouseDown}
          min={1900}
          max={2100}
          maxLength={4}
          minLength={4}
          tabIndex={3}
          autoComplete="false"
        />
      </div>
      <div className="flex justify-center items-center gap-1">
        {<X className="w-4 h-4 opacity-50 hover:opacity-100 cursor-pointer" />}
        <Calendar className="w-4 h-4 opacity-50" />
      </div>
    </div>
  )
}
