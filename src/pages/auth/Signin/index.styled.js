import { Button, Form } from "antd";
import { darken } from "polished";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledFormItem = styled(Form.Item)`
  .ant-input-number,
  .ant-select-selector,
  .ant-input-affix-wrapper {
    border: 0px !important;
    height: 35px !important;
    background: #e8f0fe !important;
  }
  .captcha {
    > div > div > div {
      margin: auto;
    }
  }
  .set-text-field {
    height: 35px !important;
    border-radius: 0.183rem;
  }
  input[type="text"],
  input[type="password"] {
    background: #e8f0fe !important;
  }
`;
export const StyledSign = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const StyledSignContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const StyledSignBtn = styled(Button)`
  border-radius: ${({ theme }) => theme.sizes.borderRadius.base};
  width: 10rem;
  font-weight: ${({ theme }) => theme.font.weight.regular};
  font-size: ${({ theme }) => theme.font.size.base};
  text-transform: uppercase;
  line-height: 1;
`;

export const StyledSignBtnFull = styled(Button)`
  border-radius: ${({ theme }) => theme.sizes.borderRadius.base};
  width: 10rem;
  font-weight: ${({ theme }) => theme.font.weight.regular};
  font-size: ${({ theme }) => theme.font.size.base};
  text-transform: uppercase;
  line-height: 1;
  width: 100%;
`;

export const StyledSignForm = styled(Form)`
  flex: 1;
  display: flex;
  flex-direction: column;

  & .form-field {
    margin-bottom: 20px;
  }

  & .form-btn-field {
    position: relative;
    margin-bottom: 16px;
  }

  & .form-field-action {
    font-size: ${({ theme }) => theme.font.size.base};
    color: ${({ theme }) => theme.palette.text.secondary};
    margin-top: auto;

    & span {
      margin-right: 8px;
      display: inline-block;

      [dir="rtl"] & {
        margin-right: 0;
        margin-left: 8px;
      }
    }
  }
`;

export const StyledRememberMe = styled.div`
  position: relative;

  & label {
    margin-bottom: 7px;
  }
`;

export const StyledSignLink = styled.span`
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: ${({ theme }) => theme.font.size.base};
  cursor: pointer;
  margin-bottom: 10px;
  text-align: right;
  display: block;

  [dir="rtl"] & {
    text-align: left;
  }
`;

export const StyledSignTextGrey = styled.span`
  color: ${({ theme }) => theme.palette.text.disabled};
`;

export const StyledSignLinkTag = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.palette.primary.main};
`;

export const StyledSignFooter = styled.div`
  background-color: ${({ theme }) => theme.palette.background.default};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 24px;
  margin: 12px -24px -24px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    padding-left: 20px;
    padding-right: 20px;
    margin-left: -20px;
    margin-right: -20px;
    margin-bottom: -20px;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}px) {
    padding-left: 40px;
    padding-right: 40px;
    margin-left: -40px;
    margin-right: -40px;
    margin-bottom: -40px;
  }

  & .signup-btn {
    text-transform: capitalize;
  }
`;

export const StyledSignedText = styled.span`
  font-size: ${({ theme }) => theme.font.size.base};
  color: ${({ theme }) => theme.palette.text.disabled};
  margin-right: 10px;

  [dir="rtl"] & {
    margin-right: 0;
    margin-left: 10px;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    margin-right: 16px;

    [dir="rtl"] & {
      margin-right: 0;
      margin-left: 16px;
    }
  }
`;

export const StyledSignSocialLink = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledSignIconBtn = styled(Button)`
  color: ${({ theme }) => theme.palette.text.secondary};
  padding: 6px 4px 4px;
  border: 0 none;
  box-shadow: none;
  background-color: transparent;
  width: 26px;
  min-width: 26px;
  height: 26px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    width: 36px;
    min-width: 36px;
    height: 36px;
    padding: 8px 6px 6px;
  }

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.palette.primary.main};
    background-color: transparent;
  }

  & .anticon {
    font-size: ${({ theme }) => theme.font.size.base};

    @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}px) {
      font-size: ${({ theme }) => theme.font.size.lg};
    }

    & svg {
      display: block;
    }
  }

  &.ant-btn-icon-only > * {
    font-size: ${({ theme }) => theme.font.size.base};

    @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}px) {
      font-size: ${({ theme }) => theme.font.size.lg};
    }
  }
`;

export const SignInButton = styled(Button)`
  width: 10rem;
  font-size: ${({ theme }) => theme.font.size.base};
  font-weight: ${({ theme }) => theme.font.weight.regular};
  text-transform: uppercase;
  line-height: 1;
  background: linear-gradient(
    to right,
    #07414b,
    ${({ theme }) => theme.palette.primary.main}
  ) !important;
  border: 0px;
  color: white;
  transition: all 0.4s ease-in;
  &:hover,
  &:focus {
    background: linear-gradient(
      to left,
      #07414b,
      ${({ theme }) => theme.palette.primary.main}
    ) !important;
    color: white !important;
  }
`;
