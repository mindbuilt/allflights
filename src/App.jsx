import React, { useEffect, useState } from "react";
import FlightBoard from "./FlightBoard";
import { DateTime } from "luxon";
import SydneyClock from "./SydneyClock";

export default function App() {
  const [viewType, setViewType] = useState("arrivals");
  const [regionFilter, setRegionFilter] = useState("all");
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const airport = "YSSY";

  const filterFlights = (rawFlights) => {
  const nowSydney = DateTime.now().setZone("Australia/Sydney");
  const threeHoursBefore = nowSydney.minus({ hours: 3 });
  const threeHoursAfter = nowSydney.plus({ hours: 3 });

  return rawFlights.filter((flight) => {
    const timeStr =
      viewType === "arrivals"
        ? flight.scheduled_in || flight.estimated_in || flight.actual_in
        : flight.scheduled_out || flight.estimated_out || flight.actual_out;

    if (!timeStr) {
      console.warn("Skipped flight (no usable time):", flight.ident);
      return false;
    }

    const flightTime = DateTime.fromISO(timeStr, { zone: "utc" }).setZone("Australia/Sydney");

    return flightTime >= threeHoursBefore && flightTime <= threeHoursAfter;
  });
};

  const fetchFlights = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(`/api/flights?airport=${airport}&type=${viewType}`);
      const data = await response.json();
      const raw = data.arrivals || data.departures || [];
      const filtered = filterFlights(raw);
      setFlights(filtered);
    } catch (err) {
      console.error("Error fetching flights:", err);
      setError(true);
      setFlights([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFlights();
    const interval = setInterval(fetchFlights, 60000);
    return () => clearInterval(interval);
  }, [viewType]);

  return (
    <div className="min-h-screen bg-white text-black p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-1 text-center">AllFlights: {airport}</h1>
      <SydneyClock />
      <p className="text-center text-sm text-gray-500 mb-6">
        Showing flights scheduled ±3 hours from current time (Sydney)
      </p>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setViewType("arrivals")}
          className={`px-4 py-2 rounded ${
            viewType === "arrivals" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Arrivals
        </button>
        <button
          onClick={() => setViewType("departures")}
          className={`px-4 py-2 rounded ${
            viewType === "departures" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Departures
        </button>
      </div>

      <div className="flex gap-2 justify-center my-4 text-yellow-300 font-mono text-sm">
        <button
          className={`px-3 py-1 border rounded ${
            regionFilter === "all" ? "bg-yellow-600 text-black" : "bg-black border-yellow-500"
          }`}
          onClick={() => setRegionFilter("all")}
        >
          All
        </button>
        <button
          className={`px-3 py-1 border rounded ${
            regionFilter === "domestic" ? "bg-yellow-600 text-black" : "bg-black border-yellow-500"
          }`}
          onClick={() => setRegionFilter("domestic")}
        >
          Domestic
        </button>
        <button
          className={`px-3 py-1 border rounded ${
            regionFilter === "international" ? "bg-yellow-600 text-black" : "bg-black border-yellow-500"
          }`}
          onClick={() => setRegionFilter("international")}
        >
          ✈️ International
        </button>
      </div>

      <FlightBoard
        flights={flights}
        type={viewType}
        loading={loading}
        error={error}
        regionFilter={regionFilter}
      />
    </div>
  );
}
