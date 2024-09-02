import axios from "axios";
import { baseUrl } from "./apisConsts";

const axiosInstance = axios.create({
  baseURL: baseUrl
});

export const request = ({
  url,
  method,
  data,
  params,
  headers
}) => {
    return new Promise(async (resolve, reject) => {
      const axios_obj = {
        url,
        method,
        ...(data && {
          data,
        }),
        ...(params && {
          params: {
            ...params,
          },
        }),
        headers: {
        ...(headers && {
            ...headers,
          })
        },
      };
      try {
        const res = await axiosInstance(axios_obj);
        resolve(res);
      } catch (e) {
        reject(e);
      }
    });
  };