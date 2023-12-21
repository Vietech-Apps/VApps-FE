import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Button, Form, Input, notification } from "antd";
import ReCAPTCHA from "react-google-recaptcha";
import IntlMessages from "meta/utility/IntlMessages";
import { useAuthMethod } from "meta/utility/AuthHooks";
import axios from "axios";

const SignInJwtAuth = () => {
  const [captcha, setCaptcha] = useState(true);
  const { signInUser } = useAuthMethod();
  const [ip, setIp] = useState();
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onGoToForgetPassword = () => {
    notification.info({ message: "Contact your System Administrator" });
  };

  const { messages } = useIntl();

  useEffect(function () {
    async function getArticles() {
      try {
        const response = await axios.get(`https://api.ipify.org?format=json`);
        // console.log('My IP', response.data.ip);
        setIp(response.data.ip);
      } catch (error) {
        console.log("error", error);
      }
    }
    getArticles();
  }, []);

  const onFinish = (values) => {
    values.ipAddress = ip;
    signInUser(values);
  };

  
  return (
    <div className="sign">
      <div className="sign-content">
        <Form
          className="sign-form"
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="email"
            className="form-field"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input placeholder={messages["common.email"]} />
          </Form.Item>
          <Form.Item
            name="password"
            className="form-field"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password placeholder={messages["common.password"]} />
          </Form.Item>
          
          <div className="rememberMe">
            <span className="sign-link" onClick={onGoToForgetPassword}>
              <IntlMessages id="common.forgetPassword" />
            </span>
          </div>
          {/* disabled={!captcha} */}
          <div className="form-btn-field">
            <Button
              type="primary"
              htmlType="submit"
              className="sign-btn-full"
            >
              <IntlMessages id="common.login" />
            </Button>
          </div>
          <div className="form-field-action"></div>
        </Form>
      </div>
    </div>
  );
};

export default SignInJwtAuth;
