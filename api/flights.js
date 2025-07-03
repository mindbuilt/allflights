export default async function handler(req, res) {
  const { airport, type } = req.query;

  if (!airport || !type) {
    return res.status(400).json({ error: "Missing 'airport' or 'type' query parameter" });
  }

  const url = `https://aeroapi.flightaware.com/aeroapi/airports/${airport}/flights/${type}`;

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
