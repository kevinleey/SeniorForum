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
        domain={process.env.AUTH_DOMAIN}
        clientId={process.env.AUTH_CLIENT_ID}
        redirectUri={window.location.origin}
        audience={process.env.AUTH_AUDIENCE}
        scope={"read:current_user update:current_user_metadata"}
      >
        <App />
      </Auth0Provider>
    </Provider>
  </React.StrictMode>,
);
