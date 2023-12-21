import styled from "styled-components";
import AppTableContainer from "meta/core/AppTableContainer";
import { Collapse } from "antd";

export const StyledTrialScroll = styled.div`
  overflow-x: auto;
  > .layout-scroll {
    min-width: 879px;
  }
`;
export const StyledTrailBalanceCollapse = styled(Collapse)`
  .ant-collapse-extra {
    display: grid;
    min-width: 210px;
    max-width: 320px;
    width: 36%;
    > div {
      display: flex;
      justify-content: space-between;
    }
  }
  .ant-collapse-item-disabled {
    > .ant-collapse-header > .arrow {
      cursor: auto;
    }
    .ant-collapse-header .ant-collapse-expand-icon {
      display: none;
    }
  }
`;

export const StyledOrderId = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.palette.primary.main};
  font-weight: ${({ theme }) => theme.font.weight.bold};
`;

export const StyledOrderBadge = styled.span`
  padding: 3px 10px;
  border-radius: ${({ theme }) => theme.cardRadius};
  display: inline-block;
`;

export const StyledOrderTransactionTable = styled(AppTableContainer)`
  & .ant-table-thead > tr > th {
    font-size: 13px;
    padding: 8px;
    font-weight: ${({ theme }) => theme.font.weight.bold};
    background-color: transparent;

    &:first-child {
      padding-left: 20px;

      [dir="rtl"] & {
        padding-left: 0;
        padding-right: 20px;
      }
    }

    &:last-child {
      padding-right: 20px;

      [dir="rtl"] & {
        padding-right: 0;
        padding-left: 20px;
      }
    }
  }

  & .ant-table-tbody > tr > td {
    font-size: 13px;
    padding: 14px 8px;

    &:first-child {
      padding-left: 20px;

      [dir="rtl"] & {
        padding-left: 0;
        padding-right: 20px;
      }
    }

    &:last-child {
      padding-right: 20px;

      [dir="rtl"] & {
        padding-right: 0;
        padding-left: 20px;
      }
    }

    &.order-transaction-table-more {
      display: flex;
      justify-content: flex-end;
    }
  }
`;
