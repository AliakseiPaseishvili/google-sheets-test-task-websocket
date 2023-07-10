import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainScreen } from "./screens/Main.screen";
import { ROUTES } from "../../../constants/routes";
import { SheetScreen } from "./screens/Sheet.screen";
import { RootStackParamList } from "./types";
import { TRANSLATIONS } from "../../../constants/translations";
import { CulumnPieScreen } from "./screens/ColumnPie.screen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const SpreadSheetStack = () => (
  <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
    <Stack.Screen
      name={ROUTES.SPREADSHEETS.MAIN}
      component={MainScreen}
      options={{
        title: TRANSLATIONS.SPREADSHEET_MAIN,
      }}
    />
    <Stack.Screen
      name={ROUTES.SPREADSHEETS.SHEET}
      component={SheetScreen}
      options={({ route }) => ({
        title: route.params.title,
      })}
    />
    <Stack.Screen name={ROUTES.SPREADSHEETS.PIE} component={CulumnPieScreen} options={{
      title: TRANSLATIONS.PIE_CHART,
    }} />
  </Stack.Navigator>
);
