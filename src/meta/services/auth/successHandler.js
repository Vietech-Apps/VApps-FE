import { notification } from "antd";

import codeMessage from "./codeMessage";

const successHandler = (response, typeNotification = {}) => {
  if (!(response.data.result || response.data.data)) {
    const { status } = response;
    let errorText = "No data found";

    if (status === 203) {
      errorText = "Documents are empty";
    }

    response = {
      ...response,
      status: 404,
      url: null,
      data: {
        success: false,
        result: null,
      },
    };

    notification.config({
      duration: 5,
      placement: "bottomRight",
    });

    notification.warning({
      message: `Request error ${status}`,
      description: errorText,
    });
  } else {
    const { data } = response;
    const message = data && data.message;
    const successText = message || codeMessage[response.status];
    const { status } = response;

    notification.config({
      duration: 5,
      placement: "bottomRight",
    });

    notification.success({
      message: `Request success`,
      description: successText,
    });

    return data;
  }
};


export default successHandler;
