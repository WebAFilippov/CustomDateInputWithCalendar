import { forwardRef } from 'react'

export const NumberSlot = forwardRef<HTMLInputElement>(({ ...props }, ref) => {
  return (
    <input
      ref={ref}
      className="w-[0.65rem] text-center select-none outline-none bg-transparent"
      type="text"
      maxLength={1}
      tabIndex={-1}
      {...props}
    />
  )
})

NumberSlot.displayName = 'NumberSlot'
