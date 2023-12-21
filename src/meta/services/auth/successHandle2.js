import { notification, message } from "antd";

import codeMessage from "./codeMessage";

const successHandler2 = (response, typeNotification = {}) => {
  if (!response.data.result) {
    response = {
      ...response,
      status: 404,
      url: null,
      data: {
        success: false,
        result: null,
      },
    };
  }
  const { data } = response;
  if (data.success === false) {
    const message = data && data.message;
    const errorText = message || codeMessage[response.status];
    const { status } = response;
    notification.config({
      duration: 5,
      placement: "bottomRight",
    });
    notification.error({
      message: `Request error ${status}`,
      description: errorText,
    });
  } else {
    const messages = data && data.message;
    const successText = messages || codeMessage[response.status];
    notification.success({
      message: `Request success`,
      description: successText,
    });
  }

  return data;
};

export default successHandler2;
