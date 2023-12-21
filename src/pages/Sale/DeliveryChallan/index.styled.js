import { Form } from "antd";
import styled from "styled-components";

export const StyledMetaForm = styled(Form)`
  padding: 12px 12px 12px 12px;
  &.ant-form-horizontal .ant-form-item .ant-form-item-label > label {
    white-space: pre-line;
    height: unset;
  }
  & .ant-form-item {
    margin-bottom: 0px;
  }
`;
