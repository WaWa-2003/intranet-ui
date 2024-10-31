export default function PackageInput() {
  return (
    <div className="gap-y-3">
      <div className="flex gap-x-3 py-1">
        <label className="flex w-32 items-center py-1">Packaging</label>
        <input
          type="text"
          name="packaging"
          id="packaging"
          autoComplete="packaging"
          className="flex-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>

      <div className="flex gap-x-3 py-1">
        <label className="flex w-32 items-center py-1">Weight (kg)</label>
        <input
          type="number"
          name="weight"
          id="weight"
          autoComplete="weight"
          className="w-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>

      <div className="flex gap-x-3 py-1">
        <label className="flex w-32 items-center py-1">Declared Value</label>
        <input
          type="number"
          name="declared_value"
          id="declared_value"
          autoComplete="declared_value"
          className="w-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <select
          id="currency"
          name="currency"
          autoComplete="currency"
          className="w-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option value="">-- Choose --</option>
          <option value="USD">USD</option>
          <option value="THB">THB</option>
        </select>
      </div>
    </div>
  );
}
