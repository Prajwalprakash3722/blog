import { format, parseISO } from "date-fns";

type Props = {
  dateString: string;
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

const DateFormatter = ({ dateString }: Props) => {
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString} className="text-slate-100 font-medium">
      {days[new Date(date).getDay()]}, {format(date, "LLLL	d, yyyy")} -{" "}
      {diffDays(new Date(), date) !== 0
        ? `(${diffDays(new Date(), date)} days ago)`
        : "Today"}
    </time>
  );
};

export default DateFormatter;
