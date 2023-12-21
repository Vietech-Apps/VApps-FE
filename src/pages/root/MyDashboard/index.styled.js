import { ProTable } from "@ant-design/pro-components";
import { Collapse, Tabs } from "antd";
import AppTableContainer from "meta/core/AppTableContainer";
import { BarChart } from "recharts";
import styled from "styled-components";

export const StyledCollapse = styled(Collapse)`
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
    .ant-collapse-header .ant-collapse-arrow {
      display: none;
    }
  }
`;
export const StyledDashboardTabs = styled(Tabs)`
  .ant-tabs-tab {
    padding: 12px 12px !important;
  }
  .ant-tabs-nav-wrap {
    background: white;
    border-radius: 0.183rem;
  }
`;
export const StyledBarChart = styled(BarChart)`
  .ant-tabs-tab {
    padding: 12px 12px !important;
  }
  .ant-tabs-nav-wrap {
    background: white;
    border-radius: 0.183rem;
  }
  .recharts-bar-rectangles {
    > g{
    g:nth-child(even) path {    
        fill: #4299E1;
      }
    g:nth-child(odd) path{
        fill: #82ca9d;
      }
    g:nth-child(3n) path{     
        fill: #ffc658;
      }
    }
  }
  }
`;
