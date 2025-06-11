export default function Table({ nomer, waktu, gram }) {
  const convertTimestamptotime = (timestamp) => {
    timestamp = parseInt(timestamp, 10);
    timestamp = timestamp * 1000; // Convert to milliseconds
    const date = new Date(timestamp);
    const options = {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'UTC', // Use UTC
    };
    return date.toLocaleTimeString([], options);
  };

  return (
    <div className="flex justify-between space-x-2 py-1 min-w-xl px-4 max-md:min-w-xs rounded-xl bg-gray-100 shadow-md max-w-md max-md:px-3">
      <div className="py-1 px-4">
        <h1 className="text-lg p-2">{nomer}</h1>
      </div>
      <div className="py-1">
        <h1 className="text-lg text-center p-2">{convertTimestamptotime(waktu)}</h1>
      </div>
      <div className="py-1">
        <h1 className="text-lg p-2">{gram} gram</h1>
      </div>
    </div>
  );
}
