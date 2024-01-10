import { useEffect, useState } from "react";

export default function useTimeFormatter({ time, timezone }) {
  const [formattedTime, setFormattedTime] = useState(null);

  useEffect(() => {
    const times = new Date((time + timezone) * 1000);
    const hour = times.getUTCHours();
    const minute = times.getUTCMinutes().toString().padStart(2, 0);
    const period = hour >= 12 ? "PM" : "AM";

    setFormattedTime(`${hour % 12 || 12}:${minute} ${period}`);
  }, [time, timezone]);

  return formattedTime;
}
