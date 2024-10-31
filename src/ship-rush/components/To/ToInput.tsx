import { useState, useEffect } from "react";

interface Country {
  name: {
    common: string;
  };
}

export default function To() {
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
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
        To
      </h2>
      <div className="mt-3 grid grid-cols-1">
        {/* Company */}
        <div className="flex items-center mt-2">
          <label
            htmlFor="company"
            className="text-sm font-medium leading-6 text-gray-900 w-1/4"
          >
            Company
          </label>
          <input
            type="text"
            name="company"
            id="company"
            autoComplete="company"
            className="w-full block flex-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        {/* Name */}
        <div className="flex items-center mt-2">
          <label
            htmlFor="name"
            className="text-sm font-medium leading-6 text-gray-900 w-1/4"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="name"
            className="w-full block flex-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        {/* Phone */}
        <div className="flex items-center mt-2">
          <label
            htmlFor="phone"
            className="text-sm font-medium leading-6 text-gray-900 w-1/4"
          >
            Phone
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            autoComplete="phone"
            className="w-full block flex-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        {/* Address */}
        <div className="flex items-center mt-2">
          <label
            htmlFor="address"
            className="text-sm font-medium leading-6 text-gray-900 w-1/4"
          >
            Address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            autoComplete="address"
            className="w-full block flex-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        {/* City */}
        <div className="flex items-center mt-2">
          <label
            htmlFor="city"
            className="text-sm font-medium leading-6 text-gray-900 w-1/4"
          >
            City
          </label>
          <input
            type="text"
            name="city"
            id="city"
            autoComplete="city"
            className="w-full block flex-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        {/* Zip */}
        <div className="flex items-center mt-2">
          <label
            htmlFor="zip"
            className="text-sm font-medium leading-6 text-gray-900 w-1/4"
          >
            Zip
          </label>
          <input
            type="text"
            name="zip"
            id="zip"
            autoComplete="zip"
            className="w-full block flex-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        {/* Country */}
        <div className="flex items-center mt-2">
          <label
            htmlFor="country"
            className="w-1/4 text-sm  font-medium leading-6 text-gray-900"
          >
            Country
          </label>
          <select
            id="country"
            name="country"
            autoComplete="country-name"
            className="w-full block flex-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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

        {/* Residential */}
        <div className="flex items-center mt-2">
          <label
            htmlFor="residential"
            className="w-1/4 text-sm font-medium leading-6 text-gray-900"
          >
            Residential
          </label>
          <select
            id="residential"
            name="residential"
            autoComplete="residential"
            className="w-full block flex-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="">-- Choose --</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        {/* Tax-ID */}
        <div className="flex items-center mt-2">
          <label
            htmlFor="tax-id"
            className="text-sm font-medium leading-6 text-gray-900 w-1/4"
          >
            Tax-ID
          </label>
          <input
            type="text"
            name="tax-id"
            id="tax-id"
            autoComplete="tax-id"
            className="w-full block flex-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        {/* EORI Destination */}
        <div className="flex items-center mt-2">
          <label
            htmlFor="eori"
            className="text-sm font-medium leading-6 text-gray-900 w-1/4"
          >
            EORI Destination
          </label>
          <input
            type="text"
            name="eori"
            id="eori"
            autoComplete="eori"
            className="w-full block flex-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        {/* Email address */}
        <div className="flex items-center mt-2">
          <label
            htmlFor="email"
            className="text-sm font-medium leading-6 text-gray-900 w-1/4"
          >
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="w-full block flex-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </div>
  );
}
