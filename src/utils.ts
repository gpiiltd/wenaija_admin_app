export function formatNumberWithCommas(
  value: number | string
): string | undefined {
  const num = Number(value)
  if (isNaN(num)) return String(value)
  return num.toLocaleString('en-US')
}
export function formatToTitleCase(value: string): string | undefined {
  if (!value) return ''
  return value
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

export function formatTime(time: string): string | undefined {
  return time?.split(':').slice(0, 2).join(':') || ''
}
