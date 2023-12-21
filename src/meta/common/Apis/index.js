import {message} from 'antd';
import jwtAxios from 'meta/services/auth/jwt-api';

export const getData = async (route, setData) => {
  try {
    const response = await jwtAxios.get(route);
    console.log('response', response);
    setData(response.data.result);
  } catch (error) {
    if (error.response.data.success === false) {
      message.error(error.response.data.message);
    }
  }
};

export const postAndGetData = async (route, values, data, setData) => {
  try {
    const response = await jwtAxios.post(route, values);
    if (response.data.success) {
      setData([...data, response.data.result]);
      message.success(response.data.message);
    } else {
      message.error(response.data.message);
    }
  } catch (error) {
    if (error.response.data.success === false) {
      message.error(error.response.data.message);
    }
  }
};

export const postData = async (route, values) => {
  try {
    const response = await jwtAxios.post(route, values);
    if (response.data.success) {
      message.success(response.data.message);
    } else {
      message.error(response.data.message);
    }
  } catch (error) {
    if (error.response.data.success === false) {
      message.error(error.response.data.message);
    }
  }
};
