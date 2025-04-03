export const formatDate = (value: string) => {
  if (!value) return ''

  const reg = /[^0-9]/g
  const formatedValue = value.replace(reg, '')

  if (!formatedValue) return ''

  let day = formatedValue.slice(0, 2)
  let month = formatedValue.slice(2, 4)
  let year = formatedValue.slice(4, 8)

  if (day) {
    day = parseInt(day) > 31 ? '31' : day
  }
  if (month) {
    month = parseInt(month) > 12 ? '12' : month
  }

  if (formatedValue.length <= 2) return day
  if (formatedValue.length <= 4) return `${day}.${month}`
  return `${day}.${month}.${year}`
}
