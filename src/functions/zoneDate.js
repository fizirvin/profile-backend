import { toDate } from 'date-fns-tz'

function zoneDate(date) {
  return toDate(date, { timeZone: 'America/Mexico_City' })
}

export default zoneDate
