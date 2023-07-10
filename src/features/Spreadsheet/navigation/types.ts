import { ROUTES } from "../../../constants/routes";

export type RootStackParamList = {
  [ROUTES.SPREADSHEETS.MAIN]: undefined;
  [ROUTES.SPREADSHEETS.SHEET]: { title: string; sheetId: string };
  [ROUTES.SPREADSHEETS.PIE]: { title: string; index: number };
};
