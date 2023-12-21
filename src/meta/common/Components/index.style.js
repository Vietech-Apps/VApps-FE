import { Col, Form } from "antd";
import styled from "styled-components";

export const StyledContentDiv = styled.div`
  border: 2px dashed #000000;
  cursor: url("/static/img/pencil30_32x32.png") 1 30, crosshair;
`;

export const StyleForm = styled(Form)`
  margin-top: 5px;
  padding-top: 5px;
  padding-left: 40px;
  padding-rigth: 80px !important;
  padding-bottom: 15px;
  background-color: #ffffff !important;
  border: 1px #e9e9e9;
  border-radius: 0px;

  & .ant-form-item-label > label {
    font-weight: 500 !important;
  }

  & .ant-select-selector {
    border-radius: 0 !important;
  }
  & .ant-input {
    border-radius: 0 !important;
  }
  & .ant-form-item {
    border-radius: 0px !important;
    padding-bottom: 0px;
  }
  & .ant-col {
    padding-bottom: 0px;
  }
`;
export const StyledCol = styled(Col)`
  margin-bottom: 15px !important;
`;
export const StyledCol2 = styled(Col)`
  margin-bottom: 30px !important;
`;
