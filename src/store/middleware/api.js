import axios from 'axios';
import * as actions from '../api';

const baseURL = 'https://yalantis-react-school-api.yalantis.com/api/task0';

const api =
  ({ dispatch }) =>
  next =>
  async action => {
    if (action.type !== actions.apiCallBegan.type) return next(action);

    const { url, method, data, onStart, onSuccess, onError } = action.payload;

    if (onStart) dispatch({ type: onStart });
    next(action);

    try {
      const response = await axios.request({
        baseURL,
        url,
        method,
        data,
      });
      // General
      dispatch(actions.apiCallSuccess(response.data));
      // Specific
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
      // For general scenario
      dispatch(actions.apiCallFailed(error.message));
      // For specific scenario
      if (onError) dispatch({ type: onError, payload: error.message });
    }
  };

export default api;