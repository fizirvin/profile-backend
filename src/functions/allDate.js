import { utcToZonedTime, format } from 'date-fns-tz'

function allDate(date) {
  const mexDate = utcToZonedTime(date, 'America/Mexico_City')
  return {
    y: format(mexDate, 'yyyy', { timeZone: 'America/Mexico_City' }),
    m: format(mexDate, 'MM', { timeZone: 'America/Mexico_City' }),
    dm: format(mexDate, 'dd', { timeZone: 'America/Mexico_City' }),
    dw: format(mexDate, 'i', { timeZone: 'America/Mexico_City' }),
    w: format(mexDate, 'ww', { timeZone: 'America/Mexico_City' }),
    dy: format(mexDate, 'DDD', { timeZone: 'America/Mexico_City' }),
    q: format(mexDate, 'q', { timeZone: 'America/Mexico_City' })
  }
}

export default allDate
