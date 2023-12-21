import { Form } from "antd";
import styled from "styled-components";

export const StyledFormRole = styled(Form)`
 
`;

export const StyledDealsTitle = styled.span`
  font-size: ${({ theme }) => theme.font.size.lg};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.palette.text.primary};
  margin-right: 12px;
  margin-bottom: 0;

  [dir="rtl"] & {
    margin-right: 0;
    margin-left: 12px;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}px) {
    margin-right: 16px;

    [dir="rtl"] & {
      margin-right: 0;
      margin-left: 16px;
    }
  }
`;

export const StyledDealsUserInfo = styled.div`
  display: flex;
  align-items: center;

  & .ant-avatar {
    width: 40px;
    height: 40px;
    margin-right: 14px;
    background: transparent;

    [dir="rtl"] & {
      margin-right: 0;
      margin-left: 14px;
    }
  }
`;

export const StyledDetailUserInfoContent = styled.div`
  flex: 1;

  & h3 {
    margin-bottom: 0;
    font-weight: ${({ theme }) => theme.font.weight.medium};
    color: ${({ theme }) => theme.palette.text.primary};
    font-size: 13px;
  }

  & p {
    color: ${({ theme }) => theme.palette.text.secondary};
    margin-bottom: 0;
  }
`;

export const StyledOrderId = styled.span`
  text-decoration: underline;
  color: ${({ theme }) => theme.palette.primary.main};
`;

export const StyledOrderBadge = styled.span`
  padding: 3px 10px;
  border-radius: ${({ theme }) => theme.cardRadius};
  display: inline-block;
`;
