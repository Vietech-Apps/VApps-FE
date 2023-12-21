import { Collapse, Form } from "antd";
import styled from "styled-components";
import { ProTable } from "@ant-design/pro-components";

export const EstFooterForm = styled(Form)`
  padding-top: 2rem;
  & .ant-form-item-label > label {
    font-weight: 500 !important;
  }
  & .ant-select-selector {
    border-radius: 0 !important;
  }
  & .ant-input {
    border-radius: 0 !important;
    background-color: #f4f6f6 !important;
  }
  & .ant-form-item {
    border-radius: 0px !important;
    padding-bottom: 0px;
    margin-bottom: 0.6rem;
  }
  & .ant-col {
    padding-bottom: 0px;
    text-align: left;
  }
  .bold-item {
    font-weight: 670;
    font-size: 1.2rem;
  }
  .mb-2 {
    margin-bottom: 10px;
  }
  .p-0 {
    padding: 0px;
  }
  .px-3 {
    padding: 0px 12px;
  }
`;

export const StyledCollapse = styled(Collapse.Panel)`
  border-radius: 0px !important;

  .ant-collapse-content .ant-collapse-content-box {
    margin-top: 15px;
    padding: 0px 0px 0px 0px;
  }
  & .ant-row > .ant-col {
    margin-bottom: -8px !important;
    font-weight: 500;
    text-align: left;
    text-transform: capitalize;
  }

  &.ant-collapse-item > .ant-collapse-header {
    background-color: #ebf5fb !important;
  }
`;
export const StyledCollapse0 = styled(Collapse.Panel)`
  border-radius: 0px !important;

  &.ant-collapse-item > .ant-collapse-header {
    background-color: #fbeee6 !important;
  }
`;
export const StyledCollapse1 = styled(Collapse.Panel)`
  border-radius: 0px !important;

  &.ant-collapse-item > .ant-collapse-header {
    background-color: #e5e7e9 !important;
  }
`;
export const StyledCollapse2 = styled(Collapse.Panel)`
  border-radius: 0px !important;

  &.ant-collapse-item > .ant-collapse-header {
    background-color: #e8daef !important;
  }
`;
export const StyledCollapse3 = styled(Collapse.Panel)`
  border-radius: 0px !important;

  &.ant-collapse-item > .ant-collapse-header {
    background-color: #aed6f1 !important;
  }
`;
export const StyledCollapse4 = styled(Collapse.Panel)`
  border-radius: 0px !important;

  &.ant-collapse-item > .ant-collapse-header {
    background-color: #d4efdf !important;
  }
`;
export const StyledCollapse5 = styled(Collapse.Panel)`
  border-radius: 0px !important;

  &.ant-collapse-item > .ant-collapse-header {
    background-color: #e5e7e9 !important;
  }
`;
export const StyledForm = styled(Form)`
  margin-top: 10px;
  padding-top: 10px;
  padding-bottom: 15px;
  background-color: #ffffff !important;
  border: 1px dashed #e9e9e9;
  border-radius: 2px;

  & .form-field {
    margin-bottom: 0px;
  }
`;

export const StyledContentDiv = styled.div`
  margin-top: 10px;
  padding-top: 10px;
  padding-bottom: 15px;
  background-color: #ffffff !important;
  border: 1px dashed #e9e9e9;
  border-radius: 2px;
`;
export const StyledTable = styled(ProTable)`
  & .table-row-light {
    background-color: #ffffff;
  }
  
  .row-color-0 {
    background-color: #fafafa;
  }

  .row-color-1 {
    background-color: #f6f8f9;
  }
  .row-color-notsaved {
    background-color: #c7c3c3;
  }
  & .data-row-active-row {
    background-color: #ffffff;
  }
  & .data-row-active-row-section {
    background-color: #d9d9d9;
  }
  & .drag-handle {
    cursor: move !important;
  }
`;

export const Styledestimationcontainer = styled.div`
  margin-left: 8px;
  margin-right: 8px;
  background-color: #f6f8f9;
`;
