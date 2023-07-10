import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SheetFullData } from "../../types";
import { zip } from "lodash";

interface ColumnsMap {
  [key: number]: string[];
}

interface SheetSlice {
  [key: string]: {
    values: string[][];
    arrayLength: number;
    columnsMap: ColumnsMap;
  };
}

const initialState: SheetSlice = {};

const sheetSlice = createSlice({
  name: "sheet",
  initialState,
  reducers: {
    saveSheetValues: (state, action: PayloadAction<SheetFullData>) => {
      const { title, values, arrayLength } = action.payload;
      const columns = zip(...values).reduce(
        (columnsMap: ColumnsMap, array: (string | undefined)[], index: number) => {
          columnsMap[index] = array.filter((item) => item) as string[];

          return columnsMap;
        },
        {}
      );

      state[title] = {
        values,
        arrayLength,
        columnsMap: columns,
      };
    },
  },
});

export const { saveSheetValues } = sheetSlice.actions;
export default sheetSlice.reducer;
