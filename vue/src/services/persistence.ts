export enum LocalStorageItem {
  DailyHistory = 'daily-history'
}

export function save<T>(item: LocalStorageItem, value: T) {
  localStorage.setItem(item, JSON.stringify(value))
}

export function retrieve<T>(item: LocalStorageItem): T | undefined {
  const rawValue = localStorage.getItem(item)
  if (!rawValue) {
    return undefined
  }
  
  return JSON.parse(rawValue) as T
}
