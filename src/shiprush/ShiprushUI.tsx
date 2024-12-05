import { MsalProvider } from "@azure/msal-react";
import ShipRushUIContent from "./components/ShiprushUIContent";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "../auth/authConfig";
import { UserInfoProvider } from "../auth/UserInfoContext"; 

const msalInstance = new PublicClientApplication(msalConfig);

function ShipRushUI() {
  return (
    <MsalProvider instance={msalInstance}>
      <UserInfoProvider>
        <ShipRushUIContent />
      </UserInfoProvider>
    </MsalProvider>
  );
}

export default ShipRushUI;
