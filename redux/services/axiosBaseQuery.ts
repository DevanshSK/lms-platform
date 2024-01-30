import type { BaseQueryFn } from "@reduxjs/toolkit/dist/query/react";
import axios from "axios";
import type { AxiosRequestConfig, AxiosError } from "axios";
import { selectToken } from "../features/auth/authSlice";
import { store } from "../store";

const axiosInstance = axios.create();

const axiosQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string
      method: AxiosRequestConfig['method']
      data?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params']
      headers?: AxiosRequestConfig['headers']
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const token = selectToken(store.getState());
      // const axiosInstance = axios.create();

      axiosInstance.interceptors.request.use((config) => {
        console.log("USER TOKEN", token)
        if(token){
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      }, (error) => {
        return Promise.reject(error);
      })

      

      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      })
      return { data: result.data }
    } catch (axiosError) {
      const err = axiosError as AxiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  }




export const axiosBaseQuery = axiosQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
})