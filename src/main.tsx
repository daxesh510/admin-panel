import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css"; // Import the centralized CSS
import App from "./App.tsx";
import 'antd/dist/reset.css'; // Import Ant Design reset styles

import { I18nextProvider } from "react-i18next";
import i18n from "./i18n.ts";
import store from "./store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
         <App/>
      </I18nextProvider>
    </Provider>
  </StrictMode>
);
