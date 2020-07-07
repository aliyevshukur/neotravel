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

const rootReducer = combineReducers({
  auth: authReducer,
  [hotelsModuleName]: hotelsReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

// export const persistor = persistStore(store);

export default store;
