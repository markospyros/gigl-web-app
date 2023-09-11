import moment from "moment";

export const formatElapsedTime = (timestamp) => {
  const now = moment();
  const then = moment(timestamp);

  const timeDifferenceInYears = now.diff(then, "years");
  const timeDifferenceInMonths = now.diff(then, "months") % 12; // Months excluding the years
  const timeDifferenceInDays = now.diff(then, "days") % 30; // Days excluding the months (assuming an average month)
  const timeDifferenceInHours = now.diff(then, "hours") % 24; // Hours excluding the days
  const timeDifferenceInMinutes = now.diff(then, "minutes") % 60; // Minutes excluding the hours
  const timeDifferenceInSeconds = now.diff(then, "seconds") % 60; // Seconds excluding the minutes

  let formattedTime;

  if (timeDifferenceInYears > 0) {
    formattedTime = `${timeDifferenceInYears}y`;
  } else if (timeDifferenceInMonths > 0) {
    formattedTime = `${timeDifferenceInMonths}mo`;
  } else if (timeDifferenceInDays > 0) {
    formattedTime = `${timeDifferenceInDays}d`;
  } else if (timeDifferenceInHours > 0) {
    formattedTime = `${timeDifferenceInHours}h`;
  } else if (timeDifferenceInMinutes > 0) {
    formattedTime = `${timeDifferenceInMinutes}m`;
  } else {
    formattedTime = `${timeDifferenceInSeconds}s`;
  }

  return formattedTime;
};
