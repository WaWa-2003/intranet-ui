export default function ServiceTitle() {
  return (
    <div className="flex justify-between items-center shadow-sm ring-1 ring-inset ring-gray-300 p-2">
      <h3>Service</h3>

      <div className="flex gap-x-3">
        <select
          id="residential"
          name="residential"
          autoComplete="residential"
          className="w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        > 
          <option value="">-- Choose --</option>
          <option value="">Option 1 </option>
          <option value="">Option 2 </option>
        </select> 
      </div>
    </div>
  );
}
