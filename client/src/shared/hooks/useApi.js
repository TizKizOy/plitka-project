import { useState } from "react";
import api from "./useAxios"; 

export const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (method, endpoint, data = null, config = {}) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.request({
        method,
        url: endpoint,
        data,
        ...config,
      });
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Произошла ошибка при запросе.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getData = (endpoint, config) => request("get", endpoint, null, config);
  const postData = (endpoint, data, config) =>
    request("post", endpoint, data, config);
  const putData = (endpoint, data, config) =>
    request("put", endpoint, data, config);
  const deleteData = (endpoint, config) =>
    request("delete", endpoint, null, config);

  return { isLoading, error, getData, postData, putData, deleteData };
};
