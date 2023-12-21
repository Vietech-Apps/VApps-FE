import { ProTable } from "@ant-design/pro-components";
import { Col, Dropdown, Form, Steps, Table, Tabs } from "antd";
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
export const StyledTable = styled(ProTable)`
  width: 100%;
  border-collapse: collapse;
  .ant-table-container table tbody tr.ant-table-placeholder {
    td {
      padding: 0px !important;
      border-bottom: 0px;
    }
    .ant-select-selection-item {
      font-size: 11px;
    }
  }
`;
export const StyledListCard = styled.div`
  padding: 0px;
`;
export const StyledOrderId = styled.span`
  text-decoration: underline;
  color: ${({ theme }) => theme.palette.primary.main};
`;

export const StyledProTable = styled(ProTable)`
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
`;

export const StyledList = styled.div`
  width: 100%;
  padding: 12px 12px;
  background-color: #fcfcfc;
  border-radius: 8px;
  min-height: 75px;
  border: 1px solid #e0e0e0;
  border-left: 5px solid #b5b5b5;
  display: flex;
  flex-direction: column;
  gap: 6px;
  box-shadow: rgba(0, 0, 0, 0.04) 2px 3px 3px;
`;
export const StyledListItem = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const StyledFindTransaction = styled.div`
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.04) 2px 3px;
`;

export const StyledDropDown = styled(Dropdown)`
  .ant-space-item {
    font-size: 1.25rem !important;
  }
`;
export const StyledCardTabs = styled(Tabs)`
  &.tabs-card {
    & .ant-tabs-nav {
      margin-bottom: 16px;
      & .ant-tabs-nav-wrap {
        & .ant-tabs-nav-list {
          & .ant-tabs-tab {
            border-radius: 0px;
            background: transparent !important;
          }
          & .ant-tabs-tab + .ant-tabs-tab {
            margin-left: 20px;
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

export const StyledDashedCard = styled.div`
  padding: 10px 10px;
  border-radius: 4px;
  background: #eaeaea !important;
  text-align: center;
  border: 1px dashed #b9b9b9;
`;

export const StyledCol = styled(Col)`
  height: 100%;
  border-left: 1px solid #cccccc;
`;
export const StyledMainHeader = styled.div`
  font-size: 22px;
  text-decoration-color: #cccccc;
  background: #e4e6eb;
  padding: 6px 18px;
  border-radius: 8px;
  font-weight: 700;
  margin: 10px 0px;
`;
export const StyledHeader = styled.div`
  font-weight: bold;
  font-size: 13px;
  text-transfrom: Capitalize;
`;
export const StyledSubHeader = styled.div`
  font-weight: normal;
  font-size: 13px;
  text-transfrom: Capitalize;
  margin-bottom: 10px;
  color: #7b7b7b;
`;
