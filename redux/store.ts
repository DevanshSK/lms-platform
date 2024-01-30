import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/auth/authApiSlice";
import { userApi } from "./features/user/userApiSlice";
import { courseApi } from "./features/courses/courseApiSlice";
import authReducer from './features/auth/authSlice';
import userReducer from "./features/user/userSlice";

// Redux persist
import { 
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER 
} from 'redux-persist';
import { combineReducers } from "@reduxjs/toolkit";

// Custom Storage object
/**
 * The above code is creating a persisted reducer using Redux Persist and combining multiple reducers
 * into one.
 * @returns The code is returning a persisted reducer.
 */
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window === "undefined" ? createNoopStorage() : createWebStorage("local");


const persistConfig = {
    key: "root",
    version: 1,
    storage,
    whitelist: ['auth', 'userSlice'],
};

const combinedReducer = combineReducers({
    auth: authReducer,
    userState: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
})

const persistedReducer = persistReducer(persistConfig, combinedReducer);



/**
 * The function `makeStore` creates a Redux store with a persisted reducer and additional middleware
 * for authentication and user APIs.
 * @returns The function `makeStore` is returning the result of calling `configureStore` with the
 * provided configuration options.
 */
export const makeStore = () => {

    return configureStore({
        reducer: persistedReducer,
        middleware: buildGetDefaultMiddleWare => buildGetDefaultMiddleWare({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        }).concat([authApi.middleware, userApi.middleware, courseApi.middleware]),
        devTools: true
    })
}

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']