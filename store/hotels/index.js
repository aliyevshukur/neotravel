import { combineReducers } from "redux";

import {
  MODULE_NAME as searchAndFilterModuleName,
  reducer as searchAndFilterReducer,
} from "./searchAndFilter";
import {
  MODULE_NAME as recommendedHotelsModuleName,
  reducer as recommendedHotelsReducer,
} from "./recommendedHotels";
import {
  MODULE_NAME as hotelOnDealsModulename,
  reducer as hotelsOnDealsReducer,
} from "./hotelsOnDeals";
import {
  MODULE_NAME as hotelListModuleName,
  reducer as hotelListReducer,
} from "./hotelList";

export const MODULE_NAME = "hotels";

export const hotelsReducer = combineReducers({
  [searchAndFilterModuleName]: searchAndFilterReducer,
  [recommendedHotelsModuleName]: recommendedHotelsReducer,
  [hotelOnDealsModulename]: hotelsOnDealsReducer,
  [hotelListModuleName]: hotelListReducer,
});
