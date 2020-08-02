// Modules
import axios from 'axios';

// Interfaces
import { APIRoute, APIRouteURLs, AxiosResponse } from 'Interfaces/Requests';

type Params = {[key: string]: unknown};

const API = {
  get: async (route: APIRoute, params: Params): Promise<AxiosResponse> => {
    const response: AxiosResponse = await axios.get(
      APIRouteURLs[route],
      {
        params,
        auth: {
          username: process.env.REACT_APP_API_USERNAME as string,
          password: process.env.REACT_APP_API_PASSWORD as string,
        },
      },
    );
    return response;
  },

  post: async (route: APIRoute, params: Params): Promise<AxiosResponse> => {
    const response: AxiosResponse = await axios.post(
      APIRouteURLs[route],
      params,
      {
        auth: {
          username: process.env.REACT_APP_API_USERNAME as string,
          password: process.env.REACT_APP_API_PASSWORD as string,
        },
      },
    );
    return response;
  },
};

export {
  API,
};
