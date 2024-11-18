import * as readline from 'readline'
import fs from 'fs'
import { LogPeriod, LogPeriodSpan } from './types'

const rli = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function askForInput<T>(query: string, convert: (input: string) => T): Promise<T> {
  return new Promise((resolve, reject) => {
    rli.question(query, (input) => {
      try {
        resolve(convert(input))
      } catch(error) {
        reject(error)
      }
    })
  })
}

function convertKeyToPeriod(dateKey: string): LogPeriod {
  let parts = dateKey.split('.')
  if (parts.length < 1 || parts[0].length < 1) {
    throw new Error('Malformed date-key')
  }
  const today = new Date()
  let dayOfMonth = (() => {
    let n = Number(parts[0])
    if (Number.isNaN(n)) { return today.getDate() }
    else if (n < 1) { return 1 }
    else if (n > 31) { return 31 }
    return n
  })()
  let monthIndex = (() => {
    let i = Number(parts[1]) - 1
    if (Number.isNaN(i)) { return today.getMonth() }
    else if (i < 0) { return 0 }
    else if (i > 11) { return 11 }
    return i
  })()
  let year = (() => {
    let n = Number(parts[2])
    const currentYear = today.getFullYear()
    if (Number.isNaN(n) || n < 2023 || n > currentYear) { return currentYear }
    return n
  })()
  return new LogPeriod(
    new Date(year, monthIndex, dayOfMonth),
    parts[0] === '*' ? LogPeriodSpan.Month : LogPeriodSpan.Day
  )
}

async function askForPeriod(): Promise<LogPeriod> {
  return await askForInput(
    'Which Lexilog? ((DD|*).MM(.YY)?): ',
    convertKeyToPeriod
  )
}

(async () => {
  let period: LogPeriod|undefined
  while(period === undefined) {
    try {
      period = await askForPeriod()
      console.log(period.key, period.date)
    } catch(error) {
      console.log(`Error: ${error.message}`)
    }
  }
  
  rli.close()
})()
