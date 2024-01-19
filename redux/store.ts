import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/auth/authApiSlice";
import { userApi } from "./features/user/userApiSlice";
import authReducer from './features/auth/authSlice';
import userReducer from "./features/user/userSlice";

// Redux persist
import storage from "redux-persist/lib/storage";
// import storageSession from "redux-persist/lib/storage/session";
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


const persistConfig = {
    key: "root",
    version: 1,
    storage,
    whitelist: ['auth'],
};

const reducer = combineReducers({
    auth: authReducer,
    userState: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
})

const persistedReducer = persistReducer(persistConfig, reducer);


export const makeStore = () => {

    return configureStore({
        reducer: persistedReducer,
        middleware: buildGetDefaultMiddleWare => buildGetDefaultMiddleWare({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        }).concat([authApi.middleware, userApi.middleware]),
        devTools: true
    })
    // return configureStore({
    //     reducer: persistReducer,
    //     middleware: buildGetDefaultMiddleware => buildGetDefaultMiddleware().concat([
    //         authApi.middleware,
    //         userApi.middleware
    //     ]),
    //     devTools: true
    // })
    // return configureStore({
    //     reducer: {
    //         [authApi.reducerPath]: authApi.reducer,
    //         [userApi.reducerPath]: userApi.reducer,
    //         auth: authReducer,
    //         userState: userReducer,
    //     },
    //     middleware: buildGetDefaultMiddleware => buildGetDefaultMiddleware().concat([
    //         authApi.middleware,
    //         userApi.middleware
    //     ]),
    //     devTools: true
    // })
}

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']