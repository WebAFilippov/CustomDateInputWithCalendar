import { Calendar, X } from 'lucide-react'
import { NumberSlot } from './number-slot'
import { FC, useEffect, useRef, useState } from 'react'

export type ControlProps = 'next' | 'prev' | null

interface DateInputProps {
  placeholder: string
  dateFrom: string
  onChangeFrom: (value: string) => void
}

export const DateInput: FC<DateInputProps> = ({
  placeholder,
  dateFrom,
  onChangeFrom,
}) => {
  const [dayValue, setDayValue] = useState(dateFrom.slice(0, 2))
  const [monthValue, setMonthValue] = useState(dateFrom.slice(3, 5))
  const [yearValue, setYearValue] = useState(dateFrom.slice(6, 10))
  const [control, setControl] = useState<ControlProps>()
  const [isFocused, setIsFocused] = useState(false)

  const dayRef = useRef<HTMLButtonElement>(null)
  const monthRef = useRef<HTMLButtonElement>(null)
  const yearRef = useRef<HTMLButtonElement>(null)
  const clearBtnRef = useRef<HTMLButtonElement>(null)
  const calendarBtnRef = useRef<HTMLButtonElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const isAllEmpty = !dayValue && !monthValue && !yearValue

  // Показываем плейсхолдер, если все поля пустые И нет фокуса
  const showPlaceholder = isAllEmpty && !isFocused

  // Отслеживание фокуса через события focusin/focusout
  useEffect(() => {
    const handleFocusIn = () => {
      const activeElement = document.activeElement
      if (
        activeElement === dayRef.current ||
        activeElement === monthRef.current ||
        activeElement === yearRef.current ||
        activeElement === clearBtnRef.current ||
        activeElement === calendarBtnRef.current
      ) {
        setIsFocused(true)
      }
    }

    const handleFocusOut = () => {
      // Проверяем, остался ли фокус внутри компонента
      setTimeout(() => {
        const activeElement = document.activeElement
        if (
          activeElement !== dayRef.current &&
          activeElement !== monthRef.current &&
          activeElement !== yearRef.current &&
          activeElement !== clearBtnRef.current &&
          activeElement !== calendarBtnRef.current
        ) {
          setIsFocused(false)
        }
      }, 0) // Задержка для корректной обработки перехода фокуса
    }

    const container = containerRef.current
    container?.addEventListener('focusin', handleFocusIn)
    container?.addEventListener('focusout', handleFocusOut)

    return () => {
      container?.removeEventListener('focusin', handleFocusIn)
      container?.removeEventListener('focusout', handleFocusOut)
    }
  }, [])

  useEffect(() => {
    const focusedElement = document.activeElement
    if (control === 'prev') {
      if (focusedElement === monthRef.current) dayRef.current?.focus()
      if (focusedElement === yearRef.current) monthRef.current?.focus()
    }
    if (control === 'next') {
      if (focusedElement === dayRef.current) monthRef.current?.focus()
      if (focusedElement === monthRef.current) yearRef.current?.focus()
    }
    setControl(null)
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
    <div
      ref={containerRef}
      className="flex relative gap-1 border border-border rounded-md px-3 py-2 bg-card"
    >
      {showPlaceholder && (
        <div
          className="absolute z-10 bg-card"
          onClick={() => {
            setIsFocused(true)
            setTimeout(() => dayRef.current?.focus(), 0)
          }}
        >
          {placeholder}
        </div>
      )}
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
            ref={clearBtnRef}
            className="absolute right-5"
            onClick={() => {
              setDayValue('')
              setMonthValue('')
              setYearValue('')
              setTimeout(() => dayRef.current?.focus(), 0)
            }}
          >
            <X className="w-4 h-4 opacity-50 scale-95 hover:scale-100 hover:opacity-100 cursor-pointer" />
          </button>
        )}
        <button ref={calendarBtnRef}>
          <Calendar className="w-4 h-4 opacity-50 scale-95 hover:scale-100 hover:opacity-100 cursor-pointer" />
        </button>
      </div>
    </div>
  )
}
