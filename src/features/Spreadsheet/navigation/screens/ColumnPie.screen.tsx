import React, { FC, useMemo } from "react";
import { RStyleSheet } from "../../../../components/Stylesheet";
import { Dimensions, View } from "react-native";
import { COLORS } from "../../../../constants/colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { RootState } from "../../../../store";
import { shallowEqual, useSelector } from "react-redux";
import { VictoryPie, VictoryTheme } from "victory-native";

type ColumnData = {
  title: string;
  index: number;
};

type ColumnMap = {
  [key: string]: number;
};

const mapStateToProps =
  ({ title, index }: ColumnData) =>
  (store: RootState) => {
    const { sheet } = store;
    const { columnsMap } = sheet[title];

    return columnsMap[index];
  };

export const CulumnPieScreen: FC<
  NativeStackScreenProps<RootStackParamList, "SPREADSHEETS_PIE">
> = ({
  route: {
    params: { title, index },
  },
}) => {
  const selectedColumn = useSelector(
    mapStateToProps({ title, index }),
    shallowEqual
  );

  const pieData = useMemo(() => {
    const columnDataArray = selectedColumn.reduce(
      (obj: ColumnMap, item: string) => {
        obj[item] = (obj[item] || 0) + 1;

        return obj;
      },
      {} as ColumnMap
    );

    return Object.entries(columnDataArray).map(([x, y]) => ({
      x,
      y,
    }));
  }, [selectedColumn]);

  return (
    <View style={styles.wrapper}>
      <VictoryPie
        data={pieData}
        labelPlacement="vertical"
        labelPosition="endAngle"
        labelRadius={Dimensions.get('window').width / 3 + 20}
        theme={VictoryTheme.material}
        style={{ labels: styles.label }}
      />
    </View>
  );
};

const styles = RStyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  label: {
    fontSize: 12,
  }
});
