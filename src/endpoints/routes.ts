import { ROUTE_MAP } from "../types";

export const ROUTES: ROUTE_MAP = {
  getSheet: {
    url: 'https://sheets.googleapis.com/v4/spreadsheets/:sheetId',
    method: 'get',
  },
  getSheetData: {
    url: 'https://sheets.googleapis.com/v4/spreadsheets/:sheetId/values/:sheetName',
    method: 'get',
  },
};
