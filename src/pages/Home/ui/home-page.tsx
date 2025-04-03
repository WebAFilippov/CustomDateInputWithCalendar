import { DataPickerInput } from '@entities/data-picker'

import { useState } from 'react'

export const HomePage = () => {
  const [dateFrom, setDateFrom] = useState('')

  return (
    <div className="flex w-screen h-screen flex-col gap-10 justify-center items-center">
      <DataPickerInput
        type="data"
        dateFrom={dateFrom}
        onChangeDateFrom={setDateFrom}
      />

      <input type="date" name="" id="" />
    </div>
  )
}
