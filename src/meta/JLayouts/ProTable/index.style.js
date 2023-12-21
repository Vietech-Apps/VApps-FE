import { ProTable } from "@ant-design/pro-components";
import { Table } from "antd";
import styled from "styled-components";

export const StyledTable = styled(Table)`
  & .ant-table-tbody > tr > td {
    border: 1px solid #f0f0f0 !important;
  }
`;

export const StyleProTable = styled(ProTable)`

  & .ant-tabs-nav-list {
    gap:8px;
    & .ant-tabs-ink-bar {
      background: #808080a8 !important;
    }
    & .ant-tabs-tab-btn {
      color: #666666;
      > span {
        background: #e4e6ebb0;
        padding: 4px 8px;
        display: flex;
        align-items: center;
        gap: 6px;
        border-radius: 7px;
        text-transform: capitalize;
        .ant-badge .ant-badge-count {
          box-shadow: unset;
        }
      }
    }
  }
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

  & .ant-tabs .ant-tabs-tab + .ant-tabs-tab {
    .ant-tag > .anticon + span {
      margin-inline-start: 4px;
    }
    .ant-icon {
      margin-right: 4px;
    }
    margin: 0 0 0 1px;

    .ant-badge-count {
      top: 0px;
      min-width: 15px;
      height: 15px;
      > span {
        font-size: 10px;
        height: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 15px;
      }
    }
    .ant-tag {
      margin-inline-end: 0px;
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }
  
  }
 
  
  .ant-table{
    & .ant-table-cell-fix-right,
  .ant-table-cell-fix-left {
    z-index: 1;
  }
   & thead > tr { 
    *:first-child,*:last-child {
    border-start-start-radius: 0px !important;
    border-start-end-radius: 0px !important;
    }
  }
  & td.ant-table-cell-fix-right {
    background: #fffdfd;
  }
  
}

& .ant-table-pagination ,.ant-pro-table-list-toolbar-container {
    padding-left: 24px;
    padding-right: 24px;
    display:flex;
    align-items:center;
  }
  .ant-pro-card-border,
  .ant-table-wrapper {
    border:0px;
  }

  & .ant-table-wrapper .ant-table table tbody {
    tr .ant-table-cell {
      padding:13px 12px;
    }
  }
  .ant-pro-table-search{
    margin-block-end:0px;
  }

    // .ant-table-thead > tr > th {
    // background: ${({ theme }) => theme.palette.primary.main};
    // :before {
    //   display: none;
    // }
  }
  
`;
