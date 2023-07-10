import React, { FC, useMemo } from "react";
import { Row as RNRow } from "react-native-reanimated-table";
import { RStyleSheet } from "../../../components/Stylesheet";
import { COLORS } from "../../../constants/colors";
import { ROW_HEIGHT } from "../constants";

export type RowProps = {
  data: string[];
  arrayLength: number;
  widthArr: number[];
};

export const Row: FC<RowProps> = ({ data, arrayLength, widthArr }) => {
  const rowData = useMemo(() => {
    const arrayDiff = arrayLength - data.length;
    if (arrayDiff) {
      return [...data, ...new Array(arrayLength - data.length).fill("")];
    } else {
      return data;
    }
  }, [data, arrayLength]);
  return (
    <RNRow
      data={rowData}
      widthArr={widthArr}
      style={styles.rowStyle}
      textStyle={styles.textStyle}
      borderStyle={styles.borderStyle}
    />
  );
};

const styles = RStyleSheet.create({
  rowStyle: {
    height: ROW_HEIGHT,
  },
  textStyle: {
    textAlign: "center",
    backgroundColor: "red",
    fontSize: 14,
  },
  borderStyle: { borderWidth: 1, borderColor: COLORS.border },
});
