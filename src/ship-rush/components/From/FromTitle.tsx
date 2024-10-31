import { fromInputData, FromInputData } from '../../data/FromInputData';

interface FromTitleProps {
  onSelect: (nickname: string) => void;
}

export default function FromTitle({ onSelect }: FromTitleProps) {
  return (
    <div className="flex justify-between items-center shadow-sm ring-1 ring-inset ring-gray-300 p-2">
      <h3 className="w-1/2">From</h3>
      <div className="flex gap-x-3">
        <select
          id="residential"
          name="residential"
          onChange={(e) => onSelect(e.target.value)}
          className="w-full block flex-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option value="">-- Choose --</option>
          {fromInputData.map((item: FromInputData) => (
            <option key={item.id} value={item.nickname}>
              {item.nickname}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
