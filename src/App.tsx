import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SpreadSheetStack } from "./features/Spreadsheet";
import { Provider } from "react-redux";
import { store } from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SpreadSheetStack />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
