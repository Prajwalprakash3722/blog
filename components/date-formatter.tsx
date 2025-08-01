import { format, parseISO } from "date-fns";

type Props = {
  dateString: string;
  short?: boolean;
};

const diffDays = (date_1: Date, date_2: Date) => {
  const localDate1 = new Date(date_1.getFullYear(), date_1.getMonth(), date_1.getDate());
  const localDate2 = new Date(date_2.getFullYear(), date_2.getMonth(), date_2.getDate());
  const difference = localDate1.getTime() - localDate2.getTime();
  return Math.floor(difference / (1000 * 60 * 60 * 24));
};

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const DateFormatter = ({ dateString, short }: Props) => {
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString} className="text-slate-100 font-medium">
      {short ? (
        <span>
          {days[date.getDay()]} {date.getDate()}{" "}
          {date.toLocaleString("default", { month: "short" })}
        </span>
      ) : (
        <span>
          {days[date.getDay()]}, {format(date, "LLLL d, yyyy")} -{" "}
          {(() => {
            const daysDiff = diffDays(new Date(), date);
            if (daysDiff === 0) return "Today";
            if (daysDiff === 1) return "(1 day ago)";
            if (daysDiff > 1) return `(${daysDiff} days ago)`;
            return "Today";
          })()}
        </span>
      )}
    </time>
  );
};

export default DateFormatter;
