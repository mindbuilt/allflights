export default async function handler(req, res) {
  const { airport, type } = req.query;

  if (!airport || !type) {
    return res.status(400).json({ error: "Missing 'airport' or 'type' query parameter" });
  }

  if (type !== 'arrivals' && type !== 'departures') {
    return res.status(400).json({ error: "Invalid 'type' parameter. Must be 'arrivals' or 'departures'." });
  }

  const url = `https://aeroapi.flightaware.com/aeroapi/flights/airport/${type}?airport_code=${airport}`;

  try {
    const response = await fetch(url, {
      headers: {
        'x-apikey': process.env.AEROAPI_KEY,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json({ error: "API call failed", details: error });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Unexpected error", details: err.message });
  }
}
