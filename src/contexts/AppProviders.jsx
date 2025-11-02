
import React from "react";
import { ThemeProvider } from "./ThemeContext";
import StoreContextProvider from "./StoreContext";

const AppProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <StoreContextProvider>{children}</StoreContextProvider>
    </ThemeProvider>
  );
};

export default AppProviders;
