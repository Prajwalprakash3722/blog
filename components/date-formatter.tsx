import { format, parseISO } from "date-fns";

type Props = {
  dateString: string;
  short?: boolean;
};

const DateFormatter = ({ dateString, short }: Props) => {
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString} className="font-mono text-text-muted">
      {short ? (
        <span>
          {format(date, "dd MMM")}
        </span>
      ) : (
        <span>
          {format(date, "EEEE, LLLL d, yyyy")}
        </span>
      )}
    </time>
  );
};

export default DateFormatter;
