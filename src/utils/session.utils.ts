import { LocalizedStringKey } from '@/models/localization'
import useSessionStore from '@/stores/session'
import useGameStore from '@/stores/game'
import { localizedString, dynamicLocalizedString } from '@/services/localization'
import { dateLocaleString } from './date.utils'

export const sessionDateLocaleString = (): string => {
  return dateLocaleString(useSessionStore().date, useGameStore().preferredLanguage)
}

export const currentDailyHistoryTitle = (): string => {
  const session = useSessionStore()
  
  if (session.terms?.length == 0) {
    return localizedString(LocalizedStringKey.Title_HistoryOfToday)
  }
  
  return dynamicLocalizedString(
    LocalizedStringKey.Title_HistoryOfToday, 
    (new Date()).getDaysFrom(session.date),
    session.date
  )
}
