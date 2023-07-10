import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { saveSheetValues } from "../../../store/slices/sheet.slice";
import { RootState } from "../../../store";
import { SheetData } from "../../../types";

const mapStateToProps = (title: string) => (store: RootState) => {
  const { sheet } = store;

  return sheet[title] ?? {};
};

export const useGetSheetData = (sheetId: string | undefined, title: string) => {
  const { values, arrayLength } = useSelector(mapStateToProps(title), shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:3000/${sheetId}/${title}`);
    let interval: NodeJS.Timer;

    ws.onopen = () => {
      ws.send('message');
      interval = setInterval(() => ws.send('message'), 10000)
    };

    ws.onmessage = (event) => {
      const data =JSON.parse(event.data)as SheetData;
      const { values } =  data;
      const lengthOfArrays = values.map((array) => array.length);
      const arrayLength = Math.max(...lengthOfArrays);

   

      dispatch(
        saveSheetValues({
          values,
          arrayLength,
          title,
        })
      );
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      clearInterval(interval);
    };

    return () => {
      ws.close();
    };
  },[title, sheetId])

  return { sheetData: values, arrayLength };
};
