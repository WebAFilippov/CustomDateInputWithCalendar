import { InputHTMLAttributes, forwardRef } from 'react'

interface NumberSlotProps extends InputHTMLAttributes<HTMLInputElement> {
  onChangeInput: (value: string) => void
}

export const NumberSlot = forwardRef<HTMLInputElement, NumberSlotProps>(
  ({ onChangeInput, ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        onChange={(e) => onChangeInput(e.target.value)}
      />
    )
  }
)

NumberSlot.displayName = 'NumberSlot'
