import {message} from 'antd';
export const success = (title) => {
  message.success(title);
};

export const error = (title) => {
  message.error(title);
};

export const warning = (title) => {
  message.warning(title);
};
