export default function Table({ nomer, waktu, gram }) {
  return (
    <div className="flex justify-between space-x-2 py-1 min-w-xl px-4 max-md:min-w-xs rounded-xl bg-gray-100 shadow-md max-w-md max-md:px-3">
      <div className="py-1 px-4">
        <h1 className="text-lg p-2">{nomer}</h1>
      </div>
      <div className="py-1">
        <h1 className="text-lg text-center p-2">{waktu}</h1>
      </div>
      <div className="py-1">
        <h1 className="text-lg p-2">{gram} gram</h1>
      </div>
    </div>
  );
}
