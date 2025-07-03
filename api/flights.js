export default async function handler(req, res) {
  try {
    const response = await fetch(
      'https://aeroapi.flightaware.com/aeroapi/flights/search/advanced?origin=YSSY+OR+destination=YSSY',
      {
        headers: {
          'x-apikey': process.env.AEROAPI_KEY,
          'Accept': 'application/json',
        },
      }
    );

    const text = await response.text();
    console.log("API raw response:", text);

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'API call failed',
        details: text
      });
    }

    const data = JSON.parse(text);
    return res.status(200).json(data);
  } catch (err) {
    console.error("Function error:", err);
    return res.status(500).json({
      error: "Function crashed",
      message: err.message
    });
  }
}
