import { Avatar, List } from "antd";
import styled from "styled-components";

export const StyleTime = styled.span`
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: 700;
  color:gray;
  display:inline-block;
  margin-right: 12px;
  margin-left: 4px;
  margin-bottom: 0;
`;
export const StyledNotifyListItem = styled(List.Item)`
  padding: 8px 20px;
  border-bottom: 0 none !important;

  & .ant-list-item-meta {
    align-items: left;
  }

  & .ant-list-item-meta-avatar {
    margin-right: 10px;

    [dir="rtl"] & {
      margin-right: 0;
      margin-left: 12px;
    }

    @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}px) {
      margin-right: 16px;

      [dir="rtl"] & {
        margin-right: 0;
        margin-left: 16px;
      }
    }
  }

  & .ant-list-item-meta-title {
    margin-bottom: 0px;
    font-weight:700;
  }

  & .ant-list-item-meta-description {
    color: ${({ theme }) => theme.palette.text.secondary} !important;
    text-transform:capitalize;
    font-size:13px;
  }
`;

export const StyledNotifyMsgAvatar = styled(Avatar)`
  width: 48px;
  height: 48px;
`;
