import {
  ChangeEvent,
  InputHTMLAttributes,
  MouseEvent,
  forwardRef,
  useRef,
  useCallback,
  KeyboardEvent,
} from 'react'
import { ControlProps } from './date-picker'

interface NumberSlotProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  onChangeInput: (value: string) => void
  setControl: (obk: ControlProps) => void
}

export const NumberSlot = forwardRef<HTMLInputElement, NumberSlotProps>(
  ({ name, onChangeInput, setControl, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const setRefs = useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node
        if (typeof ref === 'function') {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
      },
      [ref]
    )

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChangeInput(e.target.value)
      if (inputRef.current) {
        inputRef.current.select()
      }
    }
    const handleFocus = () => {
      if (inputRef.current) {
        inputRef.current.select()
      }
    }
    const handleMouseDown = (e: MouseEvent<HTMLInputElement>) => {
      e.preventDefault()
      if (inputRef.current) {
        inputRef.current.focus()
        setTimeout(() => inputRef.current?.select(), 0)
      }
    }
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (!inputRef.current) return

      console.log(e.key)

      if (e.key === 'ArrowUp') {
        e.preventDefault()
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
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
        if (name === 'day') {
          onChangeInput('дд')
          inputRef.current.focus()
          setTimeout(() => inputRef.current?.select(), 0)
        }
        if (name === 'month') {
          onChangeInput('мм')
          inputRef.current.focus()
          setTimeout(() => inputRef.current?.select(), 0)
        }
        if (name === 'year') {
          onChangeInput('гггг')
          inputRef.current.focus()
          setTimeout(() => inputRef.current?.select(), 0)
        }
      }
    }

    return (
      <input
        ref={setRefs}
        {...props}
        onChange={handleChange}
        onFocus={handleFocus}
        onMouseDown={handleMouseDown}
        onKeyDown={handleKeyDown}
      />
    )
  }
)

NumberSlot.displayName = 'NumberSlot'
