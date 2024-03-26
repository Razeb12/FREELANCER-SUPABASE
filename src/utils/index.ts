import moment from 'moment';

interface Item {
  startDate?: string;
  endDate?: string;
}

interface Formatted {
  [key: string]: {
    selected: boolean;
    selectedColor: string;
    selectedTextColor: string;
  };
}

function getDates(startDate: Date, endDate: Date): Date[] {
  const dates: Date[] = [];
  let currentDate: Date = startDate;
  const addDays = function (this: any, days: number): Date {
    const date: Date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };
  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = addDays.call(currentDate, 1);
  }
  return dates;
}

export const transformDates = (formattedData: Item[]): Formatted => {
  let newFormatted: Formatted = {};
  formattedData.map((item: Item) => {
    if (item.startDate && item.endDate) {
      const dates = getDates(
        new Date(item.startDate),
        new Date(item.endDate)
      );
      dates.map((i: Date) => {
        const formattedDate = moment(i).format("YYYY-MM-DD");
        newFormatted[formattedDate] = {
          selected: true,
          selectedColor: "#D6FFEB",
          selectedTextColor: "#000",
        };
      });
    }
  });
  return newFormatted;
};
