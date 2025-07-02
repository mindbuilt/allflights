export default function handler(req, res) {
  res.status(200).json({
    flights: [
      {
        ident: 'QF101',
        airline_iata: 'QF',
        origin: { city: 'Sydney', code: 'SYD' },
        destination: { city: 'Melbourne', code: 'MEL' },
        scheduled_out: new Date().toISOString(),
        status: 'On Time',
      },
    ],
  });
}
