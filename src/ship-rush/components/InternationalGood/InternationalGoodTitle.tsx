export default function InternationalGoodTitle() {
  return (
    <div className="flex justify-between items-center shadow-sm ring-1 ring-inset ring-gray-300 p-2">
      <h3>International Goods (Commodities)</h3>

      <div className="flex gap-x-3">
        <button
          type="button"
          className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          Add Commodity
        </button>
      </div>
    </div>
  );
}
