import React from "react";
import ReactDOM from "react-dom/client";
///import App from "./App";
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
            domain={'dev-xva3bwyqfub0c5sf.us.auth0.com'}
            clientId={'7CEAotFZme2gstjkZWCwTzoKfM9f1OrV'}
            redirectUri={window.location.origin}>

            <App />
        </Auth0Provider>

    </Provider>
  </React.StrictMode>,
);

/*       <Auth0Provider
            domain={process.env.AUTH0_DOMAIN}
            clientId={process.env.CLIENT_ID}
            redirectUri={window.location.origin}>
        </Auth0Provider>    */

//Auth0Provider is a component that provides Auth0 authentication services to your application.
//It wraps your application and provides an authentication context to any component that requires it.