// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import type {
//     BaseQueryFn,
//     FetchArgs,
//     FetchBaseQueryError,
// } from "@reduxjs/toolkit/query";
// import { setToken, clearToken, selectToken, AuthState } from "../features/auth/authSlice";
// import { Mutex } from "async-mutex";
// import { RootState } from "../store";
// import { IRefreshResponse } from "../types";

// /* The code snippet is defining an interface `IRefreshResponse` which represents the shape of the
// response object received when refreshing the access token. It has two properties: `access_token` of
// type string and `token_type` of type string. */


// // create a new mutex
// const mutex = new Mutex();
// const baseQuery = fetchBaseQuery({
//     baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
//     credentials: "include",
    
//     // credentials: "same-origin",
//     prepareHeaders: (headers, { getState }) => {
//         const token = selectToken(getState() as RootState);
//         headers.set("Content-Type", "application/json");
//         if (token) {
//             headers.set('Authorization', `Bearer ${token}`);
//         }
//         return headers;
//     },
// });

// /**
//  * The above function is a TypeScript implementation of a base query function that handles
//  * reauthentication if the initial request returns a 401 unauthorized error.
//  * @param args - The `args` parameter represents the arguments passed to the base query function. It
//  * can be either a string or an object of type `FetchArgs`.
//  * @param api - The `api` parameter is an object that contains methods for making HTTP requests. It
//  * typically includes methods like `api.get`, `api.post`, `api.put`, etc., which can be used to send
//  * HTTP requests to a server.
//  * @param extraOptions - The `extraOptions` parameter is an optional object that can contain additional
//  * options for the base query function. It can be used to customize the behavior of the base query
//  * function, such as setting headers, configuring timeouts, or providing authentication tokens.
//  * @returns The function `baseQueryWithReauth` returns a promise that resolves to the result of the
//  * `baseQuery` function.
//  */
// const baseQueryWithReauth: BaseQueryFn<
//     FetchArgs,
//     unknown,
//     FetchBaseQueryError
// > = async (args, api, extraOptions) => {

//     if (args.body instanceof FormData) {
//         // Manually serialize FormData
//         const serializedFormData = Array.from(args.body.entries()).reduce(
//           (acc, [key, value]) => {
//             acc.append(key, value);
//             return acc;
//           },
//           new FormData()
//         );
  
//         args.body = serializedFormData;
//       } else if (args.body && typeof args.body === 'object') {
//         // Convert JSON object to string
//         args.body = JSON.stringify(args.body);
//       }

//     // Wait till the mutex is available without locking it.
//     await mutex.waitForUnlock();
//     let result = await baseQuery(args, api, extraOptions);
//     if (result.error && result.error.status === 401) {
//         // Check if the mutex is locked
//         if (!mutex.isLocked()) {
//             const release = await mutex.acquire();
//             try {
//                 const refreshResult = await baseQuery("/refresh", api, extraOptions);
//                 if (refreshResult?.data) {
//                     // Update the access token
//                     api.dispatch(setToken(
//                         (refreshResult.data as IRefreshResponse).access_token
//                     ));
//                     localStorage.setItem('accessToken', (refreshResult.data as IRefreshResponse).access_token)
//                 }
//                 else {
//                     // Logout
//                     api.dispatch(clearToken());
//                     // localStorage.removeItem('accessToken')
//                 }
//             } finally {
//                 release();
//             }
//         } else {
//             await mutex.waitForUnlock();
//             result = await baseQuery(args, api, extraOptions);
//         }
//     }
//     return result;
// };


// /* The code `export const apiSlice = createApi({ baseQuery: baseQueryWithReauth, endpoints: builder =>
// ({}) })` is creating an API slice using the `createApi` function from the
// `@reduxjs/toolkit/query/react` library. */
// export const apiSlice = createApi({
//     baseQuery: baseQueryWithReauth,
//     endpoints: builder => ({})
// })


// export default baseQueryWithReauth;