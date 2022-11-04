interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number;
  compareInDays(start_date: Date, end_date: Date): number;
  convertToUTC(date: Date): string;
  dateNow(): Date;
  dateNowWithAdd(
    interval: number,
    unity: "year" | "month" | "day" | "hour" | "minute" | "second"
  );
  addInterval(
    date: Date,
    interval: number,
    unity: "year" | "month" | "day" | "hour" | "minute" | "second"
  );
  compareIfBefore(start_date: Date, end_date: Date): boolean;
}

export { IDateProvider };
