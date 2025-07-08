// api/flights.js

export default async function handler(req, res) {
  const { type = "arrival" } = req.query;

  // Use 'query=' not 'origin=' or 'destination='
  const queryParam = type === "arrival" ? "destination YSSY" : "origin YSSY";

  try {
    const response = await fetch(
      `https://aeroapi.flightaware.com/aeroapi/flights/search?query=${encodeURIComponent(queryParam)}&max_pages=1`,
      {
        headers: {
          "x-apikey": process.env.AEROAPI_KEY,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();

    // Optional: filter out past flights
    const now = new Date();
    const upcomingFlights = data.flights.filter((flight) => {
      const scheduledTime =
        type === "arrival" ? flight.scheduled_in : flight.scheduled_out;
      return scheduledTime && new Date(scheduledTime) > now;
    });

    res.status(200).json({ flights: upcomingFlights });
  } catch (err) {
    console.error("API fetch failed:", err);
    res.status(500).json({ error: "Server error fetching flight data." });
  }
}
