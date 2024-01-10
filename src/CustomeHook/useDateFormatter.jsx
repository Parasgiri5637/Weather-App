import { useState, useEffect } from "react";

export const weekDayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function useDateFormatter({ date, timezone }) {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const dates = new Date((date + timezone) * 1000);
    const weekDayName = weekDayNames[dates.getUTCDay()];
    const monthName = monthNames[dates.getUTCMonth()];

    const date_Formate = `${weekDayName} ${dates.getUTCDate()}, ${monthName}`;
    setFormattedDate(date_Formate);
  }, [date, timezone]);

  return formattedDate;
}
