import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Checkbox, Form, Input, notification } from "antd";
import IntlMessages from "meta/utility/IntlMessages";
import { useAuthMethod } from "meta/utility/AuthHooks";
import ReCAPTCHA from "react-google-recaptcha";
import {
  SignInButton,
  StyledRememberMe,
  StyledSign,
  StyledSignContent,
  StyledSignForm,
  StyledSignLink,
  StyledFormItem,
  StyledSignTextGrey,
} from "./index.styled";
import axios from "axios";
import { MdLockOutline, MdOutlineEmail } from "react-icons/md";

const SignInJwtAuth = () => {
  const { signInUser } = useAuthMethod();
  const [captcha, setCaptcha] = useState(true);
  const [ip, setIp] = useState();

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = (values) => {
    values.ipAddress = ip;
    signInUser(values);
  };

  
  const onGoToForgetPassword = () => {
    notification.info({ message: "Contact your System Administrator" });
  };
  function onRememberMe(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  const { messages } = useIntl();
  useEffect(() => {
    async function getArticles() {
      try {
        const response = await axios.get(`https://api.ipify.org?format=json`);
        setIp(response.data.ip);
      } catch (error) {
        console.log("error", error);
      }
    }
    getArticles();
  }, []);
  return (
    <StyledSign>
      <StyledSignContent>
        <StyledSignForm
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="flex justify-center"
        >
          <h1 className="text-center mt-0">Login</h1>
          <StyledFormItem
            name="email"
            className="form-field"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              prefix={<MdOutlineEmail />}
              className="border-0 set-text-field"
              placeholder={messages["common.email"]}
            />
          </StyledFormItem>
          <StyledFormItem
            name="password"
            className="form-field"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<MdLockOutline />}
              className="border-0"
              placeholder={messages["common.password"]}
            />
          </StyledFormItem>
          

          <StyledRememberMe className="flex justify-between">
            <Checkbox onChange={onRememberMe}>
              <IntlMessages id="common.rememberMe" />
            </Checkbox>

            <StyledSignLink onClick={onGoToForgetPassword}>
              <IntlMessages id="common.forgetPassword" />
            </StyledSignLink>
          </StyledRememberMe>
          <div className="form-btn-field flex justify-center">
            <SignInButton type="secondary" htmlType="submit">
              <IntlMessages id="common.login" />
            </SignInButton>
          </div>

          {/* <div className="form-field-action">
            <StyledSignTextGrey onClick={onGoToForgetPassword}>
              <IntlMessages id="common.dontHaveAccount" />
            </StyledSignTextGrey>
          </div> */}
        </StyledSignForm>
      </StyledSignContent>
    </StyledSign>
  );
};

export default SignInJwtAuth;
