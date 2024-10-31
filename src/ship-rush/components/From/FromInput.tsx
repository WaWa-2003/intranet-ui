import { useState, useEffect } from "react";

interface Country {
  name: {
    common: string;
  };
}

export default function Form() {
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    // Fetch the list of countries from the API
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data: Country[] = await response.json();
        const countryNames = data
          .map((country) => country.name.common)
          .sort((a, b) => a.localeCompare(b));
        setCountries(countryNames);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  return (
    <div className="border-b border-gray-900/10">
      <h2 className="text-base font-semibold leading-7 text-white bg-slate-500 h-10 content-center text-center">
        From
      </h2>

      <div className="mt-3 grid grid-cols-1 gap-y-4">
        {/* Nickname */}
        <div className="flex items-center gap-x-4">
          <label htmlFor="nick-name" className="w-1/4 text-sm font-medium text-gray-900">
            Nickname
          </label>
          <input
            type="text"
            name="nick-name"
            id="nick-name"
            autoComplete="nickname"
            className="flex-grow rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
          />
        </div>

        {/* Company */}
        <div className="flex items-center gap-x-4">
          <label htmlFor="company" className="w-1/4 text-sm font-medium text-gray-900">
            Company
          </label>
          <input
            type="text"
            name="company"
            id="company"
            autoComplete="organization"
            className="flex-grow rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
          />
        </div>

        {/* Name */}
        <div className="flex items-center gap-x-4">
          <label htmlFor="name" className="w-1/4 text-sm font-medium text-gray-900">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="name"
            className="flex-grow rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
          />
        </div>

        {/* Phone */}
        <div className="flex items-center gap-x-4">
          <label htmlFor="phone" className="w-1/4 text-sm font-medium text-gray-900">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            autoComplete="tel"
            className="flex-grow rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
          />
        </div>

        {/* Email address */}
        <div className="flex items-center gap-x-4">
          <label htmlFor="email" className="w-1/4 text-sm font-medium text-gray-900">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="flex-grow rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
          />
        </div>

        {/* Address */}
        <div className="flex items-center gap-x-4">
          <label htmlFor="address" className="w-1/4 text-sm font-medium text-gray-900">
            Address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            autoComplete="street-address"
            className="flex-grow rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
          />
        </div>

        {/* City */}
        <div className="flex items-center gap-x-4">
          <label htmlFor="city" className="w-1/4 text-sm font-medium text-gray-900">
            City
          </label>
          <input
            type="text"
            name="city"
            id="city"
            autoComplete="address-level2"
            className="flex-grow rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
          />
        </div>

        {/* Zip */}
        <div className="flex items-center gap-x-4">
          <label htmlFor="zip" className="w-1/4 text-sm font-medium text-gray-900">
            Zip
          </label>
          <input
            type="text"
            name="zip"
            id="zip"
            autoComplete="postal-code"
            className="flex-grow rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
          />
        </div>

        {/* Country */}
        <div className="flex items-center gap-x-4">
          <label htmlFor="country" className="w-1/4 text-sm font-medium text-gray-900">
            Country
          </label>
          <select
            id="country"
            name="country"
            autoComplete="country-name"
            className="flex-grow rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
          >
            {countries.length > 0 ? (
              countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))
            ) : (
              <option>Loading countries...</option>
            )}
          </select>
        </div>

        {/* Tax-ID */}
        <div className="flex items-center gap-x-4">
          <label htmlFor="tax-id" className="w-1/4 text-sm font-medium text-gray-900">
            Tax-ID
          </label>
          <input
            type="text"
            name="tax-id"
            id="tax-id"
            autoComplete="tax-id"
            className="flex-grow rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
}
