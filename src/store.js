import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userReducer from "./features/user/userSlice"
import cartReducer from "./features/cart/cartSlice"
import { persistStore, persistReducer } from "redux-persist"
import thunk from "redux-thunk"
import storage from "redux-persist/lib/storage"


const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
  });
const persistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
})
export const persistor = persistStore(store);