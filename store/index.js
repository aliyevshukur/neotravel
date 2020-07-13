import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { AsyncStorage } from "react-native";
import { persistStore, persistReducer } from "redux-persist";
AsyncStorage;

import { reducer as authReducer } from "./auth";
import {
  reducer as hotelsReducer,
  MODULE_NAME as hotelsModuleName,
} from "./hotels";
import {
  reducer as favoritesReducer,
  MODULE_NAME as favoriteModuleName,
} from "./favorites";
import {
  reducer as userReducer,
  MODULE_NAME as userModuleName,
} from "./user";

import { reducer as navReducer } from "./navReducer";
import { reducer as themeReducer } from "./theme";
import { reducer as reservationReducer } from "./reservation";

const rootReducer = combineReducers({
  auth: authReducer,
  [hotelsModuleName]: hotelsReducer,
  navReducer,
  themeReducer,
  reservationReducer,
  [favoriteModuleName]: favoritesReducer,
  [userModuleName]: userReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store);

export default store;
