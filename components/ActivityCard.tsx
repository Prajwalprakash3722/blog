import moment from "moment";

const ActivityCard = ({ activity }: any) => {
  const { name, distance, movingTime, activityType, start_date_local } =
    activity;

  return (
    <div className="bg-white rounded-md shadow-md p-4">
      <div className="flex flex-row items-center">
        <div className="flex items-center">
          <h2 className="font-semibold text-xl mb-4 text-blue-400">{name}</h2>
        </div>
        <div className="ml-auto">
          <img
            src="https://d3o5xota0a1fcr.cloudfront.net/v6/maps/ICDMKHRAJJD6X5O6JMXAVLAS72RSRD3OJLN7T4G6RX7V47NTQOJ5KSACYGTT72OVVOUUWM7URTZ5OMF45EQRIGW3HRI2O4VA"
            alt="Activity icon"
            className="h-8 w-8"
          />
        </div>
      </div>
      <p className="text-gray-700 mb-2">{distance / 1000} km</p>
      <p className="text-gray-700 mb-4">
        {moment.duration(movingTime, "seconds").humanize()}
      </p>
      <div className="flex justify-between items-center border-t border-strava-gray pt-4">
        <p className="text-sm font-semibold text-strava-blue">{activityType}</p>
        <p className="text-sm font-semibold text-strava-blue">
          {moment(start_date_local).format("MMM D, YYYY")}
        </p>
      </div>
    </div>
  );
};

export default ActivityCard;
