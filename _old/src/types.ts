export enum LogPeriodSpan {
  Day = 'DAY',
  Month = 'MONTH'
}

export class LogPeriod {
  date: Date
  span: LogPeriodSpan
  
  constructor(date: Date, span: LogPeriodSpan) {
    this.date = date
    this.span = span
  }
  
  get key(): string {
    const yearShorthand = ((this.date.getFullYear() / 100) % 1).toFixed(2).substring(2)
    return `${this.date.getDate()}.${this.date.getMonth()+1}.${yearShorthand}`
  }
}
