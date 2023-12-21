import React from "react";
import IntlMessages from "meta/utility/IntlMessages";
import AppAnimate from "meta/core/AppAnimate";
import { Col, Form, Input } from "antd";
import { useIntl } from "react-intl";
import AppRowContainer from "meta/core/AppRowContainer";
import AppPageMetadata from "meta/core/AppPageMetadata";
import { ReactComponent as Logo } from "assets/user/reset-password.svg";
import {
  StyledUserCardHeader,
  StyledUserCardLg,
  StyledUserContainer,
  StyledUserForm,
  StyledUserFormBtn,
  StyledUserPages,
  StyledUserStyledImgAuto,
  StyledUserStyledResetImgCol,
} from "../index.styled";

const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const ResetPassword = () => {
  const { messages } = useIntl();

  return (
    <StyledUserPages>
      <AppPageMetadata title="Reset Password" />
      <AppAnimate animation="transition.slideUpIn" delay={200}>
        <StyledUserContainer key="a">
          <StyledUserCardLg>
            <AppRowContainer>
              <StyledUserStyledResetImgCol xs={24} md={12}>
                <StyledUserStyledImgAuto className="user-styled-img">
                  <Logo />
                </StyledUserStyledImgAuto>
              </StyledUserStyledResetImgCol>

              <Col xs={24} md={12}>
                <StyledUserCardHeader>
                  <h3>
                    <IntlMessages id="common.resetPassword" />
                  </h3>
                </StyledUserCardHeader>

                <StyledUserForm
                  className="mb-0"
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    name="oldPassword"
                    className="form-field"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Old Password!",
                      },
                    ]}
                  >
                    <Input
                      type="password"
                      placeholder={messages["common.oldPassword"]}
                    />
                  </Form.Item>

                  <Form.Item
                    name="newPassword"
                    className="form-field"
                    rules={[
                      {
                        required: true,
                        message: "Please input your New Password!",
                      },
                    ]}
                  >
                    <Input
                      type="password"
                      placeholder={messages["common.newPassword"]}
                    />
                  </Form.Item>

                  <Form.Item
                    name="confirmPassword"
                    className="form-field"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Retype Password!",
                      },
                    ]}
                  >
                    <Input
                      type="password"
                      placeholder={messages["common.retypePassword"]}
                    />
                  </Form.Item>

                  <StyledUserFormBtn type="primary" htmlType="submit">
                    <IntlMessages id="common.resetMyPassword" />
                  </StyledUserFormBtn>
                </StyledUserForm>
              </Col>
            </AppRowContainer>
          </StyledUserCardLg>
        </StyledUserContainer>
      </AppAnimate>
    </StyledUserPages>
  );
};

export default ResetPassword;
