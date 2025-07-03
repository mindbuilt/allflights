// /api/flights.js

export default async function handler(req, res) {
  const { airport, type } = req.query;

  if (!airport || !type) {
    return res.status(400).json({ error: "Missing 'airport' or 'type' query parameter" });
  }

  const url = `https://aeroapi.flightaware.com/aeroapi/flights/${type}?airport_code=${airport}&max_pages=1`;

  try {
    const response = await fetch(url, {
      headers: {
        "x-apikey": process.env.AEROAPI_KEY,
      },
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      return res.status(response.status).json({ error: "API call failed", details: errorDetails });
    }

    const data = await response.json();
    return res.status(200).json({ flights: data.flights || [] });
  } catch (error) {
    return res.status(500).json({ error: "API call error", details: error.toString() });
  }
}
