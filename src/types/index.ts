import { AxiosResponse } from "axios";
import { SetStateAction } from "react";

export enum RequestTypes { GET_SHEET = 'getSheet',
GET_SHEET_DATA = 'getSheetData',
}

export type ROUTE_NAME = RequestTypes.GET_SHEET | RequestTypes.GET_SHEET_DATA;
export type METHOD = "get";

export type ROUTE_MAP = {
  [key in ROUTE_NAME]: {
    url: string;
    method: METHOD;
  };
};

type EndpointsProps = {
  urlKeys: {
    sheetId: string;
    sheetName?: string;
  };
};

export type SpreadsheetsItem = {
  properties: {
    title: string;
  }
}

export interface Spreadsheets {
 sheets: SpreadsheetsItem[],
 spreadsheetId: string;
}

export type SheetData = {
  values: string[][]
};

export type ENDPOINTS_MAP = {
  [RequestTypes.GET_SHEET]: (props: EndpointsProps) => Promise<AxiosResponse<Spreadsheets>>;
  [RequestTypes.GET_SHEET_DATA]: (props: EndpointsProps) => Promise<AxiosResponse<SheetData>>;
};

export interface SheetFullData extends SheetData {
  title: string;
  arrayLength: number;
};
