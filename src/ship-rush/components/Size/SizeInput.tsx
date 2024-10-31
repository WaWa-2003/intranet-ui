export default function SizeInput() {
  return (
    <div className="flex gap-x-3">
      <label className="flex w-32 items-center py-1">Size</label>
      <input
        type="number"
        name="weight"
        id="weight"
        autoComplete="weight"
        className="w-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      <label className="flex w-32 items-center justify-center py-1">x</label>
      <input
        type="number"
        name="weight"
        id="weight"
        autoComplete="weight"
        className="w-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      <label className="flex w-32 items-center justify-center py-1">x</label>
      <input
        type="number"
        name="weight"
        id="weight"
        autoComplete="weight"
        className="w-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      <label className="flex w-32 items-center py-1">cm</label>
    </div>
  );
}
