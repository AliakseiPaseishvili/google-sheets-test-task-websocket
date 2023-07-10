import { useEffect } from "react";
import endpoints from "../../../endpoints";
import { GOOGLE_SHEET_ID } from "../../../constants/googlesheet";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setSheetsList } from "../../../store/slices/spreadsheet.sliсe";
import { RootState } from "../../../store";

const mapStateToProps = (state: RootState) => {
  const { spreadSheet: { spreadsheetId, sheets }} = state;

  return { spreadsheetId, sheets};
}

export const useGetSpreadsheetData = () => {
  const { spreadsheetId, sheets } = useSelector(mapStateToProps, shallowEqual);
  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      try {
        const result = await endpoints.getSheet({
          urlKeys: {
            sheetId: GOOGLE_SHEET_ID,
          },
        });

        dispatch(setSheetsList(result.data));
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  return {spreadsheetId, sheets };
};
