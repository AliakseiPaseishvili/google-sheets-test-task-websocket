import React, { FC } from "react";
import { FlatList } from "react-native";
import { ListItem } from "../../../../components/ListItem";
import { RStyleSheet } from "../../../../components/Stylesheet";
import { COLORS } from "../../../../constants/colors";
import { ROUTES } from "../../../../constants/routes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { useGetSpreadsheetData } from "../../hooks/useGetSpreadsheetData";
import { Placeholder } from "../../../../components/Placeholder";
import { Loader } from "../../../../components/Loader";

export const MainScreen: FC<
  NativeStackScreenProps<RootStackParamList, "SPREADSHEETS_MAIN">
> = ({ navigation }) => {
  const { spreadsheetId, sheets } = useGetSpreadsheetData();

  return (
    <FlatList
      style={styles.wrapper}
      data={sheets}
      keyExtractor={({ properties: { title } }) => title}
      renderItem={({
        item: {
          properties: { title },
        },
      }) => (
        <ListItem
          text={title}
          onPress={() =>
            navigation.navigate(ROUTES.SPREADSHEETS.SHEET, {
              title,
              sheetId: spreadsheetId,
            })
          }
        />
      )}
      ListEmptyComponent={() => !sheets.length && <Loader />}
      ListFooterComponent={<Placeholder />}
    />
  );
};

const styles = RStyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
