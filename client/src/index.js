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
        domain= "dev-xva3bwyqfub0c5sf.us.auth0.com"//{process.env.AUTH_DOMAIN}
        clientId= "7CEAotFZme2gstjkZWCwTzoKfM9f1OrV"//{process.env.AUTH_CLIENT_ID}
        authorizationParams={{
            redirect_uri: window.location.origin
        }}
        audience= "https://dev-xva3bwyqfub0c5sf.us.auth0.com/api/v2/" //{process.env.AUTH_AUDIENCE}
        scope={"read:current_user update:current_user_metadata"}
      >
        <App />
      </Auth0Provider>
    </Provider>
  </React.StrictMode>,
);
