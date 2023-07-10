import React, { FC } from "react";
import { RStyleSheet } from "../../../components/Stylesheet";
import { COLORS } from "../../../constants/colors";
import { Button } from "../../../components/Button";
import { TRANSLATIONS } from "../../../constants/translations";
import { View } from "react-native";
import { RootState } from "../../../store";
import { shallowEqual, useSelector } from "react-redux";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../../constants/routes";
import { RootStackParamList } from "../navigation/types";
import { ROW_HEIGHT } from "../constants";

interface TableHeaderProps {
  title: string;
}

const mapStateToPropsHeaderArray = (title: string) => (store: RootState) => {
  const { sheet } = store;

  const { arrayLength } = sheet[title] || {};

  return arrayLength
    ? new Array(arrayLength).fill("").map((_, index) => index)
    : [];
};

const mapStateToPropsCollumnsMap = (title: string) => (store: RootState) => {
  const { sheet } = store;

  const { columnsMap } = sheet[title] || {};

  return columnsMap;
};

export const TableHeader: FC<TableHeaderProps> = ({ title }) => {
  const headerArray = useSelector(
    mapStateToPropsHeaderArray(title),
    shallowEqual
  );
  const columnsMap = useSelector(
    mapStateToPropsCollumnsMap(title),
    shallowEqual
  );

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={styles.rowStyle}>
      {headerArray.map((index) => (
        <View style={styles.cell} key={`${columnsMap[0]}_${index}`}>
          {columnsMap[index].length ? (
            <Button
              onPress={() =>
                navigation.navigate(ROUTES.SPREADSHEETS.PIE, { title, index })
              }
              style={styles.button}
              textStyle={styles.buttonText}
              text={TRANSLATIONS.SHEET_SHOW_PIE}
            />
          ) : null}
        </View>
      ))}
    </View>
  );
};

const styles = RStyleSheet.create({
  rowStyle: {
    flexDirection: "row",
  },
  cell: {
    height: ROW_HEIGHT,
    width: 80,
    borderRightWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: COLORS.backgroundAlternative,
    padding: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: COLORS.textAlternative,
    fontSize: 10,
  },
});
