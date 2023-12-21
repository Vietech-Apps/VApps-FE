import { Form, Steps, Table } from "antd";
import ReactQuill from "react-quill";
import styled from "styled-components";
export const StyledStep = styled(Steps)`
  &.ant-steps {
    &.ant-steps-navigation {
      padding: 0px;
    }
    & .ant-steps-item {
      margin-left: 6px;
      padding: 0px;
    }
    & .ant-steps-item-container {
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4px 4px;
    }
    .ant-steps-item-title {
      font-size: 12px;
      line-height: unset;
    }
    .ant-steps-item-icon {
      font-size: 10px;
      width: 22px;
      height: 22px;
      line-height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    & .ant-steps-item-active {
      &.ant-steps-item::before {
        position: absolute;
        bottom: 0;
        inset-inline-start: 50%;
        display: inline-block;
        width: 100%;
        left: 0;
        height: 100%;
        background-color: #639f524d;
        transition: width 0.3s, inset-inline-start 0.3s;
        transition-timing-function: ease-out;
        content: "";
        clip-path: polygon(90% 0%, 100% 50%, 90% 100%, 0 100%, 0 0);
      }
      .ant-steps-item-icon {
        background: #639f52ab;

        .ant-steps-icon {
          color: white;
        }
        svg {
          fill: white;
        }
      }
    }
    & .ant-steps-item::after {
      display: none;
    }
  }
`;
export const StyledMailModalTextArea = styled(ReactQuill)`
  width: 100%;
  height: 700px;
`;
export const StyledTaxAndRoundOff = styled(Form)`
  & .justify-content-end {
    justify-content: flex-end;
  }
  & .align-items-center {
    align-items: center;
  }
  & .mb-0 {
    margin-bottom: 0 !important;
  }
  & .mb-3 {
    margin-bottom: 0.5rem !important;
  }
  & .white-nowrap {
    white-space: nowrap;
  }
  & .ant-row {
    & .ant-col:nth-child(1) {
      text-align: right;
    }
  }
  & .text-align-right {
    text-align: right;
  }
  & .ant-typography strong {
    font-weight: 700;
  }
`;
export const StyledQuotationPanelTable = styled(Table)`
  &.ant-table-wrapper table thead tr th {
    font-size: 15px;
    font-weight: 500;
    text-transform: capitalize;
    background: #daf7ff;
  }

  & tbody tr td {
    font-size: 15px;
    font-weight: 400;
    text-transform: capitalize;
  }
`;
export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  max-height: 200px;
  overflow-y: auto;

  th,
  td {
    padding: 8px;
    text-align: left !important;
    border-bottom: 1px solid #ddd;
  }

  th {
    font-weight: bold;
  }
`;
