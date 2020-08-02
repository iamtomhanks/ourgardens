export enum RequestStatus {
    NOT_STARTED = 'not_started',
    STARTED = 'started',
    SUCCESS = 'success',
    FAILURE = 'failure',
}

export interface RequestState {
    status: RequestStatus;
    error: unknown;
}

export interface AxiosResponse {
    data: unknown;
    status: number;
    statusText: string;
}

export const initRequestState = {
  status: RequestStatus.NOT_STARTED,
  error: null,
};

export enum APIRoute {
    // GET_STATE_NODES = 'GET_STATE_NODES',
}

export const APIRouteURLs = {
//   [APIRoute.GET_CATEGORY_LINE]: `${process.env.REACT_APP_API_GET_CATEGORY_LINE}`,
};
