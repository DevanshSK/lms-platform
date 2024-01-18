import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/auth/authApiSlice";
import { userApi } from "./features/user/userApiSlice";
import authReducer, {initialState as authInitialState} from './features/auth/authSlice';
import userReducer, {initialState as userInitialState} from "./features/user/userSlice";


export const makeStore = () => {
    // const userToken = localStorage.getItem('userToken');

    // const initialState = {
    //     userState: {
    //         ...userInitialState,
    //     },
    //     auth: {
    //         ...authInitialState,
    //         token: userToken,
    //         isAuthenticated: !!userToken,            
    //     }
    // }

    return configureStore({
        reducer: {
            [authApi.reducerPath]: authApi.reducer,
            [userApi.reducerPath]: userApi.reducer,
            auth: authReducer,
            userState: userReducer,
        },
        middleware: buildGetDefaultMiddleware => buildGetDefaultMiddleware().concat([
            authApi.middleware,
            userApi.middleware
        ]),
        devTools: true
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']