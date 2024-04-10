import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./styles/global.css";
import store from "./app/store";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth0Provider
        domain="dev-xva3bwyqfub0c5sf.us.auth0.com" //The domain, clientID, and audience are all public information, as long as secret is hidden
        clientId="7CEAotFZme2gstjkZWCwTzoKfM9f1OrV"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
        audience="https://dev-xva3bwyqfub0c5sf.us.auth0.com/api/v2/"
        scope={"read:current_user update:current_user_metadata"}
        useRefreshTokens={true}
        cacheLocation="localstorage"
      >
        <App />
      </Auth0Provider>
    </Provider>
  </React.StrictMode>,
);
