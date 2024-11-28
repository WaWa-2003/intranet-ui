import { MsalProvider } from "@azure/msal-react";
import ShipRushUIContent from "./components/ShiprushUIContent";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from '../auth/authConfig';

const msalInstance = new PublicClientApplication(msalConfig);

function ShipRushUI() {
  return (
    <MsalProvider instance={msalInstance}>
      <ShipRushUIContent />
    </MsalProvider>
  );
}

export default ShipRushUI;
