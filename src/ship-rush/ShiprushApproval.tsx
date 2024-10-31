import { useState } from "react";
import FromTitle from "./components/From/FromTitle";
// import From from "./components/From/FromInput";
import To from "./components/To/ToInput";
import Package from "./components/Package/PackageTitle";
import PackageInput from "./components/Package/PackageInput";
import SizeInput from "./components/Size/SizeInput";
import SpecialMaterialTitle from "./components/SpecialMaterial/SpecialMaterialTitle";
import ServiceTitle from "./components/Service/ServiceTitle";
import PaymentTitle from "./components/Payment/PaymentTitle";
import InternationalGoodTitle from "./components/InternationalGood/InternationalGoodTitle";
import FromDataShow from "./components/From/FromDataShow";
import { fromInputData } from "./data/FromInputData";

function ShiprushApproval() {
  const [selectedNickname, setSelectedNickname] = useState<string | null>(null);

  // Find data based on selected nickname
  const selectedData = fromInputData.find((data) => data.nickname === selectedNickname);

  return (
    <div className="flex justify-center space-x-4 p-5">
      <div className="border-b border-gray-900/10 p-5 w-1/3">
        <div className="border-b border-gray-900/10 pb-3">
          <FromTitle onSelect={(nickname) => setSelectedNickname(nickname)} />
        </div>
        {/* <div className="border-b border-gray-900/10 pb-3">
          <From />
        </div> */}
        {selectedData && (
          <div className="border-b border-gray-900/10 pb-3">
            <FromDataShow data={selectedData} />
          </div>
        )}
        <div className="border-b border-gray-900/10 pb-3">
          <To />
        </div>
        <div className="border-b border-gray-900/10 pb-3">
          <ServiceTitle />
        </div>
        <div className="border-b border-gray-900/10 pb-3">
          <PaymentTitle />
        </div>
        <div className="border-b border-gray-900/10 pb-3">
          <InternationalGoodTitle />
        </div>
      </div>
      <div className="border-b border-gray-900/10 p-5 w-1/3">
        <div className="border-b border-gray-900/10 pb-3">
          <Package />
          <PackageInput />
        </div>
        <div className="border-b border-gray-900/10 py-3">
          <SizeInput />
        </div>
        <div className="border-b border-gray-900/10 py-3">
          <SpecialMaterialTitle />
        </div>
      </div>
    </div>
  );
}

export default ShiprushApproval;
