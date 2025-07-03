import { DateTime } from "luxon";
import { useEffect, useState } from "react";

export default function SydneyClock() {
  const [time, setTime] = useState(
    DateTime.now().setZone("Australia/Sydney").toFormat("HH:mm:ss")
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        DateTime.now().setZone("Australia/Sydney").toFormat("HH:mm:ss")
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center text-sm text-gray-600 mb-2">
      Sydney Local Time: <span className="font-mono">{time}</span>
    </div>
  );
}
