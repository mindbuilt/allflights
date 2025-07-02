import { useEffect, useState } from "react";
import { mockFlights } from "./flights";

export default function FlightBoard() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const statusColor = {
    "On Time": "text-green-400",
    "Delayed": "text-yellow-400",
    "Boarding": "text-blue-400",
  };

  const columns = ["Flight", "Airline", "From", "To", "Time", "Status"];

  return (
    <div className="w-full max-w-5xl mx-auto mt-10 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold tracking-widest text-white">ALLFLIGHTS</h1>
        <div className="text-white text-xl font-mono">{formatTime(time)}</div>
      </div>

      <div className="rounded-xl shadow-xl border border-gray-700 bg-gray-950">
        {/* Header row */}
        <div className="grid grid-cols-6 gap-4 bg-gray-800 text-gray-400 uppercase text-sm px-4 py-3">
          {columns.map((col) => (
            <div key={col}>{col}</div>
          ))}
        </div>

        {/* Flight rows */}
        <div className="divide-y divide-gray-700">
          {mockFlights.map((flight) => (
            <div
              key={flight.id}
              className="grid grid-cols-6 gap-4 px-4 py-3 text-white text-sm font-mono hover:bg-gray-900 transition"
            >
              <div className="flip-cell">{flight.id}</div>
              <div className="flip-cell">{flight.airline}</div>
              <div className="flip-cell">{flight.origin}</div>
              <div className="flip-cell">{flight.destination}</div>
              <div className="flip-cell">{flight.scheduled}</div>
              <div className={`font-bold flip-cell ${statusColor[flight.status]}`}>
                {flight.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
