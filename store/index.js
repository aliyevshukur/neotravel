import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { AsyncStorage } from "react-native";
import { persistStore, persistReducer } from "redux-persist";
AsyncStorage;

// import {
//   MODULE_NAME as chatsModuleName,
//   reducer as chatsReducer,
// } from "./chats";

import { reducer as authReducer } from "./auth";

const rootReducer = combineReducers({ auth: authReducer });

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
