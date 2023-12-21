import { Collapse, Cascader, Form } from "antd";
import styled from "styled-components";
import { ProTable } from "@ant-design/pro-components";

export const StyledCascader = styled(Cascader)`
  border-radius: 0px !important;

  & .ant-cascader-menu-item {
    color: red;
  }

  & .ant-cascader-menu-item.equity {
    color: red;
  }

  & .ant-cascader-menu-item.revenue {
    color: /* your color for revenue */ red;
  }

  & .ant-cascader-menu-item.expense {
    color: /* your color for expense */ red;
  }

  & .ant-cascader-menu-item.liability {
    color: /* your color for liability */ red;
  }
`;
