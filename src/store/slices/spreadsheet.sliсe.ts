import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Spreadsheets } from "../../types";

const initialState: Spreadsheets = {
  sheets: [],
  spreadsheetId: "",
};

const spreadSheetSlice = createSlice({
  name: "spreadSheet",
  initialState,
  reducers: {
    setSheetsList: (state, action: PayloadAction<Spreadsheets>) => {
      state.spreadsheetId = action.payload.spreadsheetId;
      state.sheets = action.payload.sheets;
    },
  },
});

export const { setSheetsList } = spreadSheetSlice.actions;
export default spreadSheetSlice.reducer;
