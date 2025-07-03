export default async function handler(req, res) {
  const { airport, type } = req.query;

  if (!airport || !type) {
    return res.status(400).json({ error: "Missing 'airport' or 'type' query parameter" });
  }

  const url = `https://aeroapi.flightaware.com/aeroapi/flights/airport/${airport}/${type}?max_pages=1`;

  try {
    const response = await fetch(url, {
      headers: {
        'x-apikey': process.env.AEROAPI_KEY,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: "API call failed", details: data });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
}
