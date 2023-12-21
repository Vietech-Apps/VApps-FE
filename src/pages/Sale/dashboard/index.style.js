import { Select, Tabs } from "antd";
import styled from "styled-components";

export const LayoutDiv = styled.div`
  padding-top: 0px;
  padding-bottom: 0px;
  background-color: transparent !important;
  border: 1px #e9e9e9;
  border-radius: 0px;
  position: sticky;
  left: 0px;
  transform: translate(-15px, -19px);
  width: calc(100% + 29px);
    padding-top: 0px;
    padding-bottom: 4px;
  }
`;

export const StyleTabs = styled(Tabs)`
  & .ant-tabs-nav {
    background: white;
    padding: 0px 20px;
    margin: 0px;
    .ant-tabs-tab {
      font-weight: 500;
      font-size: 16px;
    }
  }
  & .ant-tabs-content-holder {
    padding: 20px;
  }
`;
export const StyleSelect = styled(Select)`
  width: 320px;
  .ant-select-selector {
    border-radius: 0px !important;
  }
`;

export const FooterDiv = styled.div`
  transform: translate(-15px, 0px);
  position: fixed;
  bottom: 0;
  width: auto;
  background-color: #ffffff !important;
  box-shadow: 0px -8px 22px -11px rgb(0 0 0 / 30%);
  width: 100%;
  padding: 12px;
  z-index: 2;
  & button {
    height: 38px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}px) {
    width: calc(100% - 278px);
  }
`;
