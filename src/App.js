import React from "react";

import "antd/dist/reset.css";
import {
  AppContextProvider,
  AppLayout,
  AppLocaleProvider,
  AppThemeProvider,
  AuthRoutes,
} from "meta";
import { BrowserRouter } from "react-router-dom";
import "./meta/services/index";
import JWTAuthAuthProvider from "./meta/services/auth/JWTAuthProvider";
import { GlobalStyles } from "./shared/styles/GlobalStyle";
import { Normalize } from "styled-normalize";
import ChatProvider from "meta/services/Context/ChatProvider";
import "./shared/styles/style.css";
const App = () => (
  <AppContextProvider>
    <AppThemeProvider>
      <AppLocaleProvider>
        <BrowserRouter>
          <JWTAuthAuthProvider>
            <ChatProvider>
              <AuthRoutes>
                <GlobalStyles />
                <Normalize />
                <AppLayout />
              </AuthRoutes>
            </ChatProvider>
          </JWTAuthAuthProvider>
        </BrowserRouter>
      </AppLocaleProvider>
    </AppThemeProvider>
  </AppContextProvider>
);

export default App;
