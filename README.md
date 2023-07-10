# Goolge spreadsheets integration to react-native app.

## Description.
This is simple react-native application that gets informataion from sheets in google spreadsheets with real time updates and pie charts for each column of selected sheet.

Link with video example: https://www.youtube.com/watch?v=o2RFdhnMXBM

Link with spreadsheets: https://docs.google.com/spreadsheets/d/17FXJ_St91eMQ7Fc3zO4YMMhfzixG5g2wq0a3Mk77XsE/edit#gid=0

# Installation and running.

Before installation we need to create google api key.
1. Open: https://console.cloud.google.com/
2. Create new project by pressing button in header of the page. Give the name to the project and write organization where you work. you can also see the ID_OF_PROJECT.
3. After creation you need to go to this page https://console.cloud.google.com/apis/library?project=ID_OF_PROJECT. It will open library page. Here you need to activate `google sheets api`.
4. After activation of google sheets api. you need to open this page.
https://console.cloud.google.com/apis/credentials?project=ID_OF_PROJECT. Here you press on '+ create credentials' -> API Key.

Installation:
1. Download the repository.
2. write `npm i` in console in root folder.
3. add google api key to `API_KEY` in `.env` file in root folder. Create`.env` file if it doesn't exist  .
3. Go to ios folder with command `pod install`. 
   1. For android will be fine to run 'npx react-native run-android' in root folder.
4. Open Xcode and open `GoogleSheetsTask.xcworkspace` in it.
5. Start the build.

# Project structure.

* src
* * components
* * * [componentName]
* * * * [componentName].tsx
* * * * index.tsx
* * constants
* * endpoints
* * helpers
* * types
* * store
* * * slices
* * * * [name].slice.tsx
* * * index.ts
* * features
* * * components
* * * hooks
* * * navigation
* * * * screens
* * * * * [screenName].screen.tsx
* * * * stack.tsx
* * * * types.ts
* * * constants.ts
* * * index.ts
* * App.ts

## Explanantion
1. components in src folder contain all common and shared components.
2. store has slices folder with all reducers that we can have in the app.
3. feautres contain all components, hooks and screens related to this feature. It is better to split all features in sepparate folder. Some features can have their own stack for navigation.

# Architecture.

For forming connection with backend side of goolge spreadsheet I created map with all requests and methods.

```
export const ROUTES: ROUTE_MAP = {
  getSheet: {
    url: 'https://sheets.googleapis.com/v4/spreadsheets/:sheetId',
    method: 'get',
  },
  getSheetData: {
    url: 'https://sheets.googleapis.com/v4/spreadsheets/:sheetId/values/:sheetName',
    method: 'get',
  },
};
```

After it I create map objects with functions that call axios with current method types and urls. (you can find it in `src/endpoints/index.ts`).

NOTE: to make calls work you need to have `API_KEY` in .env folder.
 
It is easy to use such calls in different parts of the app.

For navigation we are using `React-navigation` library. We use `Native Stack Navigator` as it work via native navigation.

For rendering data with better performance we are using `FlatList`, we also know height for each row, so to make less calculations in change of content we define `getItemLayout` and define `keyExtractor`.
```
      <FlatList
        style={styles.flatList}
        data={sheetData}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<TableHeader title={title} />}
        keyExtractor={(item, index) =>
          item.reduce(
            (finalSting: string, string: string) => finalSting + string,
            ""
          ) + index
        }
        renderItem={({ item }) => (
          <Row widthArr={widthArr} data={item} arrayLength={arrayLength} />
        )}
        ListEmptyComponent={() => !sheetData && <ActivityIndicator />}
        initialNumToRender={18}
        getItemLayout={(data, index) => ({
          length: px2dp(ROW_HEIGHT),
          offset: px2dp(ROW_HEIGHT) * index,
          index,
        })}
        ListFooterComponent={<Placeholder />}
      />
```

For having real-time updates I used the simpliest solution:
We just added setInterval for our request with getting infomration about sheet data. Why there is no websocket? Because google-spreadsheets doesn't have the api for it. I spent time on investigation about it and thought that we can use App Google script and onEdit method, but it is just impossible to do it with this functionality. 

Is corrent funcionality is well optimized? No, it is not. We are limitted by google sheets API.

```
export const useGetSheetData = (sheetId: string | undefined, title: string) => {
  const { values, arrayLength } = useSelector(mapStateToProps(title), shallowEqual);
  const dispatch = useDispatch();
  useEffect(() => {
    const getSheetData = async () => {
      try {
        if (sheetId) {
          const result = await endpoints.getSheetData({
            urlKeys: {
              sheetId,
              sheetName: title,
            },
          });
          const { values } = result.data;
          const arrayLength = Math.max(...values.map((array) => array.length));

          dispatch(
            saveSheetValues({
              values,
              arrayLength,
              title,
            })
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    const interval = setInterval(async () => getSheetData(), 10000);
    
    return () => clearInterval(interval);
  }, [sheetId]);
```

For showing pie chart I used `victory-native` library. It uses svg inside.

For responsive size I used `react-native-pixel-perfect`.

For data managment I used `redux-toolkit`. As we need to draw pie chart and it is placed on another screen from sheet, I thought that it will be good idea to store sheet information in redux reducers.
