import React from 'react';

const FlightBoard = ({ flights, type }) => {
  const formatTime = (isoString) => {
    if (!isoString) return '-';
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-AU', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getAirportName = (airport) => {
    if (!airport) return 'Unknown';
    return (
      airport.code_iata ||
      airport.city ||
      (airport.code?.startsWith('L ') ? '' : airport.code) ||
      'Unknown'
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {type === 'arrivals' ? 'Arrivals' : 'Departures'} – Sydney (YSSY)
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {flights && flights.length > 0 ? (
          flights.map((flight, index) => {
            const time =
              type === 'arrivals'
                ? formatTime(flight.actual_on || flight.predicted_on)
                : formatTime(flight.actual_off || flight.predicted_off);

            const origin = getAirportName(flight.origin);
            const destination = getAirportName(flight.destination);

            return (
              <div
                key={index}
                className="bg-white border border-gray-200 shadow-md rounded-xl p-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-semibold">{flight.ident}</span>
                  <span className="text-sm text-gray-500">{time}</span>
                </div>
                <div className="text-gray-800 text-sm mb-1">
                  {type === 'arrivals' ? `${origin} → Sydney` : `Sydney → ${destination}`}
                </div>
                <div className="text-gray-500 text-xs">
                  {flight.ident_iata || 'Unknown flight'} • {flight.aircraft_type || 'Aircraft unknown'}
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No flights found.
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightBoard;
