import {
  ButtonHTMLAttributes,
  forwardRef,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { ControlProps } from './date-input'
import { cn } from '@shared/lib'

interface NumberSlotProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: 'day' | 'month' | 'year'
  placeholder: string
  value: string
  min: number
  max: number
  onChangeInput: (value: string) => void
  setControl: (obk: ControlProps) => void
}

export const NumberSlot = forwardRef<HTMLButtonElement, NumberSlotProps>(
  (
    { name, placeholder, value, min, max, onChangeInput, setControl, ...props },
    ref
  ) => {
    const [valueSlot, setValueSlot] = useState(value || placeholder)
    const slotRef = useRef<HTMLButtonElement>(null)

    const lenght = String(max).length

    const setRefs = useCallback(
      (node: HTMLButtonElement | null) => {
        slotRef.current = node
        if (typeof ref === 'function') {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
      },
      [ref]
    )

    useEffect(() => {
      setValueSlot(value || placeholder)
    }, [value, placeholder])

    const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
      console.log(e.key)

      if (e.key === 'ArrowUp') {
        e.preventDefault()
        let delta
        const date = new Date()
        if (name === 'day' && valueSlot === placeholder) {
          delta = date.getDate()
          onChangeInput(String(delta).padStart(lenght, '0'))
          return
        }
        if (name === 'month' && valueSlot === placeholder) {
          delta = date.getMonth() + 1
          onChangeInput(String(delta).padStart(lenght, '0'))
          return
        }
        if (name === 'year' && valueSlot === placeholder) {
          delta = date.getFullYear()
          onChangeInput(String(delta).padStart(lenght, '0'))
          return
        }

        const value = parseInt(valueSlot, 10)
        const newValue = value + 1 > max ? min : value + 1
        onChangeInput(String(newValue).padStart(lenght, '0'))
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        let delta
        const date = new Date()
        if (name === 'day' && valueSlot === placeholder) {
          delta = date.getDate()
          onChangeInput(String(delta).padStart(lenght, '0'))
          return
        }
        if (name === 'month' && valueSlot === placeholder) {
          delta = date.getMonth() + 1
          onChangeInput(String(delta).padStart(lenght, '0'))
          return
        }
        if (name === 'year' && valueSlot === placeholder) {
          delta = date.getFullYear()
          onChangeInput(String(delta).padStart(lenght, '0'))
          return
        }

        const value = parseInt(valueSlot, 10)
        const newValue = value - 1 < min ? max : value - 1
        onChangeInput(String(newValue).padStart(lenght, '0'))
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        setControl({ field: name, command: 'next' })
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setControl({ field: name, command: 'prev' })
      }
      if (e.key === 'Backspace' || e.key === 'Delete') {
        e.preventDefault()
        setValueSlot(placeholder)
        onChangeInput('')
      }
    }

    return (
      <button
        ref={setRefs}
        className={cn(
          'px-[0.05rem] select-none outline-none focus:bg-blue-500 focus:text-white cursor-default',
          props.className
        )}
        name={name}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {valueSlot}
      </button>
    )
  }
)
