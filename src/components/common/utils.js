export function dateParse(date) {
    if (!date) return 'no date'
    const [d, m, y] = date.split('.')
    return new Date (y, m-1, d )
}