import styled from "styled-components";
import { Layout } from "antd";

const { Content } = Layout;

export const StyledMainContentView = styled(Content)`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1rem 0px 0;
  min-height: auto !important;
  background-color: ${({ theme }) => theme.palette.background.default};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xxl}px) {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
`;
