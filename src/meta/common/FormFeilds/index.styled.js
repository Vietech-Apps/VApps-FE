import AppScrollbar from "meta/core/AppScrollbar";
import { Select, Form, Input, Modal, Col, Row, Tabs, Table } from "antd";
import styled from "styled-components";
import { darken } from "polished";
import { ProTable } from "@ant-design/pro-components";

export const StyledRow = styled(Row)``;

export const StyledMetaInput = styled(Input)`
  border-radius: 0 !important;
`;

export const StyledMetaSelect = styled(Select)`
  & .ant-select-selector {
    border-radius: 0 !important;
  }
`;
export const StyledProductProTable = styled(ProTable)`
  .editable-row {
    transition: background-color 0.3s ease;
    ${(props) =>
      props.groupColors &&
      props.groupColors.map(
        (color, index) => `
        &.group-${index + 1} {
          background-color: ${color};
        }
      `
      )}
  }
  .ant-table-wrapper .ant-table-footer {
    background: transparent;
  }
  & thead > tr {
    *:first-child,
    *:last-child {
      border-start-start-radius: 0px !important;
      border-start-end-radius: 0px !important;
    }
  }
  & .ant-table-wrapper .ant-table table {
    tbody {
      background: white;
    }
    tbody tr .ant-table-cell,
    thead tr .ant-table-cell {
      padding: 8px 12px;
    }
    tr.ant-table-row:hover > td {
      background: transparent;
    }
  }
  .ant-table-cell input {
    outline: none;
  }
  .editable-cell-value-wrap {
    height: 32px;
    display: flex;
    align-items: center;
  }
  & .ant-input,
  .ant-input-number-input {
    padding-left: 0px;
    border: 0px;
    border-bottom: 1px solid #cecee0;
    border-radius: 0px;
  }
  & .ant-input-number,
  .ant-select .ant-select-selector,
  .ant-input-affix-wrapper,
  .ant-input-sm {
    padding-left: 0px;
    padding-right: 0px;
    background: transparent;
    outline: 0px;
    border: 0px !important ;
    border-bottom: 1px solid #cecee0 !important;
    border-radius: 0px !important;
  }
`;
export const StyledProductTable = styled(Table)`
  .editable-row {
    transition: background-color 0.3s ease;
    ${(props) =>
      props.groupColors &&
      props.groupColors.map(
        (color, index) => `
        &.group-${index + 1} {
          background-color: ${color};
        }
      `
      )}
  }
  .ant-table-wrapper .ant-table-footer {
    background: transparent;
  }
  & thead > tr {
    *:first-child,
    *:last-child {
      border-start-start-radius: 0px !important;
      border-start-end-radius: 0px !important;
    }
  }
  & .ant-table-wrapper .ant-table table {
    tbody {
      background: white;
    }
    tbody tr .ant-table-cell,
    thead tr .ant-table-cell {
      padding: 8px 12px;
    }
    tr.ant-table-row:hover > td {
      background: transparent;
    }
  }
  .ant-table-cell input {
    outline: none;
  }
  .editable-cell-value-wrap {
    height: 32px;
    display: flex;
    align-items: center;
  }
  & .ant-input,
  .ant-input-number-input {
    padding-left: 0px;
    border: 0px;
    border-bottom: 1px solid #cecee0;
    border-radius: 0px;
  }
  & .ant-input-number,
  .ant-select .ant-select-selector,
  .ant-input-affix-wrapper,
  .ant-input-sm {
    padding-left: 0px;
    padding-right: 0px;
    background: transparent;
    outline: 0px;
    border: 0px !important ;
    border-bottom: 1px solid #cecee0 !important;
    border-radius: 0px !important;
  }
`;
export const StyledCol = styled(Col)`
  margin-bottom: -15px !important;
`;

export const StyledBox = styled.div`
  display: flex;
`;

export const StyledMetaForm = styled(Form)`
  padding: 24px 24px 12px 24px;
  &.ant-form-horizontal .ant-form-item .ant-form-item-label > label {
    white-space: pre-line;
    height: unset;
  }
  & .ant-form-item {
    margin-bottom: 12px;
  }
  &.py-0 {
    padding-top: 0px;
    padding-bottom: 0px;
  }
  & .ant-divider {
    &.ant-divider-with-text-left::after,
    &.ant-divider-with-text-left::before {
      border-block-start-color: #bcbcbc;
    }
    & .ant-divider-inner-text {
      font-size: 13px;
    }
    & .ant-row{
      margin-bottom:0px;
    }
  
  `;
export const StyledTabForm = styled(Form)`
  padding: 24px 24px 0px 24px;
  &.ant-form-horizontal .ant-form-item .ant-form-item-label > label {
    white-space: pre-line;
    height: unset;
  }
  & .ant-form-item {
    margin-bottom: 12px;
  }

  & .ant-divider {
    &.ant-divider-with-text-left::after,
    &.ant-divider-with-text-left::before {
      border-block-start-color: #bcbcbc;
    }
    & .ant-divider-inner-text {
      font-size: 13px;
    }
  }
`;
export const StyledAccountStatement = styled.div``;

export const StyledTabs = styled(Tabs)`
  &.ant-tabs-card {
    & .ant-tabs-nav {
      margin: 0px;
      &:before {
        display: none;
      }

      & .ant-tabs-nav-wrap {
        & .ant-tabs-nav-list {
          & .ant-tabs-tab {
            border-radius: 0.1875rem 0.1875rem 0rem 0rem;
            margin-left: 0px;
            border: 0px;
            background: #dcdcdc;
            transition: opacity 0.3s ease-out;
            & .ant-tabs-tab-btn {
              color: black !important;
            }
            &:hover,
            &:focus {
              background: ${darken(0.03, "#d4d4d4")};
            }
          }
          & .ant-tabs-tab.ant-tabs-tab-active {
            background: white;

            &:hover,
            &:focus {
              background: ${darken(0.02, "white")};
            }
          }
        }
      }
    }
  }
  & .ant-tabs-content {
    background: white;
    padding: 24px;
  }
`;
export const StyledCardTabs = styled(Tabs)`
  &.tabs-card {
    & .ant-tabs-nav {
      border: 1px solid #cecee0 !important;
      border-radius: 6px;
      padding: 0px 4px;
      &:before {
        display: none;
      }
      & .ant-tabs-nav-wrap {
        & .ant-tabs-nav-list {
          padding: 4px 10px 4px 0px;
          border-top-left-radius: 6px;
          border-top-right-radius: 6px;
          & .ant-tabs-tab {
            &:hover {
              background: #eaeaea !important;
            }
          }
          & .ant-tabs-tab + .ant-tabs-tab {
            margin-left: 0px;
          }
          & .ant-tabs-tab.ant-tabs-tab-active {
            background: transparent;
            & .ant-tabs-tab-btn {
              color: initial !important;
            }
          }
        }
      }
    }
  }
`;
export const StyledWrapModal = styled.div`
  .wrap-set {
    display: flex;
    align-items: center;
  }
`;
export const StyledModal = styled(Modal)`
  &.ant-modal{ .ant-modal-header {
    padding-bottom: 6px;
}
.ant-modal-close{
      background: rgba(0,0,0,0.3);
    border-radius: 50%;
}
  .ant-modal-footer {
    margin-top: 24px;
  }
}
}
 .wrap-set {
    display: flex;
    align-items: center;
  }
  .link-btn{
    color: rgb(248 248 248);
    background: #66a8f3;
    border: 0px!important;
    height:23px;
    font-size:13px;
    width:25px;
    &:hover{
          background: #4f88c9!important;
             color: #f2f2f2;

    }
  }
`;
export const StyledEstForm = styled(Form)`
  border: 1px #e9e9e9;
  border-radius: 2px;

  & .form-field {
    margin-bottom: 0px;
  }
`;
export const StyledContentDiv = styled.div`
  padding-top: 10px;
  padding-bottom: 15px;
  background-color: #ffffff !important;
  border: 1px #e9e9e9;
  border-radius: 0px;
`;

export const StyledTodoInput = styled(Input)`
  width: 100%;
  font-weight: ${({ theme }) => theme.font.weight.light};
`;

export const StyledSelectRow = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledTodoModalScrollbar = styled(AppScrollbar)`
  min-height: 320px;
  padding-top: 4px;
`;
