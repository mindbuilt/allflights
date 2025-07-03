import React, { useEffect, useState } from "react";
import FlightBoard from "./FlightBoard";

export default function App() {
  const [viewType, setViewType] = useState("arrivals");
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const airport = "YSSY";

  const filterFlights = (rawFlights) => {
    const now = new Date();
    const sydneyNow = new Date(
      now.toLocaleString("en-US", { timeZone: "Australia/Sydney" })
    );

    const threeHoursBefore = new Date(sydneyNow.getTime() - 3 * 60 * 60 * 1000);
    const threeHoursAfter = new Date(sydneyNow.getTime() + 3 * 60 * 60 * 1000);

    return rawFlights.filter((flight) => {
      const timeStr =
        viewType === "arrivals"
          ? flight.estimated_in || flight.scheduled_in
          : flight.estimated_out || flight.scheduled_out;

      if (!timeStr) return false;

      const utcFlightTime = new Date(timeStr);
      const localFlightTime = new Date(
        utcFlightTime.toLocaleString("en-US", { timeZone: "Australia/Sydney" })
      );

      return (
        localFlightTime >= threeHoursBefore &&
        localFlightTime <= threeHoursAfter
      );
    });
  };

  const fetchFlights = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(`/api/flights?airport=${airport}&type=${viewType}`);
      const data = await response.json();
      console.log("API raw response:", data);

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
      <h1 className="text-3xl font-bold mb-2 text-center">AllFlights: {airport}</h1>
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

      <FlightBoard flights={flights} type={viewType} loading={loading} error={error} />
    </div>
  );
}
