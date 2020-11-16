import { utcToZonedTime, format } from 'date-fns-tz'

function stringDate(date) {
  const mexDate = utcToZonedTime(date, 'America/Mexico_City')
  return format(mexDate, 'yyyy-MM-dd', {
    timeZone: 'America/Mexico_City'
  })
}

export default stringDate
