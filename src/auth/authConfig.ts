import { Configuration, PopupRequest } from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
    clientId: "36d9aced-9fb4-42a4-a31c-5dfa8832c6b2",  
    authority: "https://login.microsoftonline.com/b8c84464-86e7-4d3a-8c4d-d5b1acce5b88",  
    // redirectUri: "https://192.168.68.11/" 
    redirectUri: "http://localhost:5173/"      
  },
  cache: {
    cacheLocation: "localStorage", 
    storeAuthStateInCookie: false ,
  }
};

export const loginRequest: PopupRequest = {
  scopes: ["User.Read", "User.ReadBasic.All", "profile", "email", "openid"]
};

