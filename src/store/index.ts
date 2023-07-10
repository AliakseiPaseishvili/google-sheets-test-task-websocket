import { configureStore } from "@reduxjs/toolkit";
import spreadSheet from './slices/spreadsheet.sliсe';
import sheet from './slices/sheet.slice';

export const store = configureStore({
  reducer: {
    sheet,
    spreadSheet,
  },
});

export type RootState = ReturnType<typeof store.getState>;
