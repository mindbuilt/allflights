// /api/flights.js

export default async function handler(req, res) {
  const { airport = "YSSY", type = "arrivals" } = req.query;

  // Validate type input
  if (!["arrivals", "departures"].includes(type)) {
    return res.status(400).json({ error: "Invalid type. Must be 'arrivals' or 'departures'" });
  }

  const apiKey = process.env.FLIGHTAWARE_API_KEY;
  const endpoint = `https://aeroapi.flightaware.com/aeroapi/airports/${airport}/flights/${type}`;

  try {
    const response = await fetch(endpoint, {
      headers: {
        "x-apikey": apiKey,
      },
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      return res.status(response.status).json({
        error: "API call failed",
        details: errorDetails,
      });
    }

    const data = await response.json();
    res.status(200).json({ flights: data.flights || [] });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
}
