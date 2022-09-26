import { format, parseISO } from "date-fns";

type Props = {
  dateString: string;
  short?: boolean;
};

const diffDays = (date_1: Date, date_2: Date) => {
  let difference = date_1.getTime() - date_2.getTime();
  let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
  return TotalDays;
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
          {days[new Date(date).getDay()]}, {format(date, "LLLL	d, yyyy")} -{" "}
          {diffDays(new Date(), date) !== 0
            ? `(${diffDays(new Date(), date)} days ago)`
            : "Today"}
        </span>
      )}
    </time>
  );
};

export default DateFormatter;
