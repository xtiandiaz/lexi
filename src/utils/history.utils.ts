import { type DailyHistory } from '@/models/history'
import { LocalizedStringKey } from '@/models/localization'
import useHistoryStore from '@/stores/history'
import useGameStore from '@/stores/game'
import { localizedString, dynamicLocalizedString } from "@/services/localization"
import { dateLocaleString } from './date.utils'
import '@/assets/tungsten/extensions/date.extensions'

export const dailyHistoryCurrentDaysFrom = (dailyHistory: DailyHistory): number => {
  return (new Date()).getDaysFrom(dailyHistory.date)
}

export const isDailyHistoryStale = (dailyHistory: DailyHistory): boolean  => {
  return dailyHistoryCurrentDaysFrom(dailyHistory) >= 1
}

export const dailyHistoryDateLocaleString = (dailyHistory: DailyHistory): string => {
  return dateLocaleString(dailyHistory.date, useGameStore().preferredLanguage)
}

export const currentDailyHistoryTitle = (): string => {
  const history = useHistoryStore()
  
  if (!history.dailyHistory) {
    return localizedString(LocalizedStringKey.Title_HistoryOfToday)
  }
  
  return dynamicLocalizedString(
    LocalizedStringKey.Title_HistoryOfToday, 
    dailyHistoryCurrentDaysFrom(history.dailyHistory),
    history.dailyHistory.date
  )
}
