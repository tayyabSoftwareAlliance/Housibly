import {ENDPOINTS, HTTP_CLIENT} from '../exporter';

export const getActivity = () => {
  return HTTP_CLIENT.get(`${ENDPOINTS.ACTIVITY}/activities`);
};

export const getFilteredActivity = params => {
  return HTTP_CLIENT.get(
    `${ENDPOINTS.ACTIVITY}/activities_filter?scope=${params}`,
  );
};
