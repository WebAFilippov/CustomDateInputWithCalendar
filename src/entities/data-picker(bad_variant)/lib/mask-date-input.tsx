export const ApplyMask = (value: string) => {
  if (!value) return ''

  const reg = /[^0-9]/g
  const formatedValue = value.replace(reg, '')

  if (!formatedValue) return ''

  if (formatedValue.length <= 2) return value
  if (formatedValue.length <= 4)
    return `${formatedValue.slice(0, 2)}.${formatedValue.slice(2, 4)}`
  return `${formatedValue.slice(0, 2)}.${formatedValue.slice(2, 4)}.${formatedValue.slice(4, 8)}`
}

export const ParseMask = (value: string) => {
  if (!value) return ''

  const formatedValue = value.replace('.', '')

  if (!formatedValue) return ''
}
