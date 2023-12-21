import styled from "styled-components";
import { Avatar, List, Dropdown, Select } from "antd";
import { darken } from "polished";

export const StyledSelect = styled(Select)`
  &.ant-select-selector-set {
    margin-top: 2px;
    > div,
    span {
      font-size: ${({ theme }) => theme.font.size.base};
      color: black !important;
      font-weight: ${({ theme }) => theme.font.weight.medium};
    }
    div.ant-select-selector {
      background: ${({ isBackground }) => darken(0.1, isBackground)}!important;
      border: 0px !important;
    }
    .ant-select-arrow {
      height: 10px;
      margin-top: -5px;
    }
  }
`;
export const StyledCompanyDropdown = styled(Dropdown)`
  padding: 0px;
  display: flex;
  gap: 10px;
  justify-content: center;
  transition: all 0.2s ease;
  white-space: nowrap;
  & .fs-5 {
    font-size: ${({ theme }) => theme.font.size.xs};
  }
  & .fw-500 {
    font-weight: ${({ theme }) => theme.font.weight.medium};
    margin-top: 2px;
  }
  & a,
  p {
    margin-bottom: 0px;
  }
  & .ant-space {
    background: ${({ isbackground }) => isbackground};
    color: #111827;
    padding: 6px 12px;
    border-radius: 0;
    padding: 0.375rem 0.75rem;
  }
  & .ant-dropdown-link {
    color: inherit;

    & .anticon {
      font-size: ${({ theme }) => theme.font.size.sm};
    }
  }

  &.light {
    & .ant-dropdown-link {
      color: inherit;
    }
  }
`;

export const StyledMsgListItem = styled(List.Item)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  white-space: inherit;
  padding: 6px 10px;
  border-bottom: 1px solid #cecee0 !important;
  & .ant-list-item-meta {
    align-items: center;
  }
  & .ant-dropdown .ant-dropdown-menu,
  .ant-dropdown-menu-item {
    padding: 0px !important;
  }
  &.justify-bet {
    justify-content: space-between !important;
  }
`;

export const StyledMsgAvatar1 = styled(Avatar)`
  width: 40px;
  height: 40px;
  margin-right: 8px;
  border: 1px solid gray;
`;
export const StyledMsgAvatar2 = styled(Avatar)`
  width: 40px;
  height: 40px;
  margin-right: 8px;
  border: 1px solid gray;
`;

export const StyledText = styled.p`
  color: #b1b1b1;
  padding: 3px 10px;
  font-size: 10px;
`;
export const StyledMsgListItemContent = styled.div`
  font-size: 15px;
  & h2 {
    margin-bottom: 0;
    font-weight: ${({ theme }) => theme.font.weight.medium};
    font-size: ${({ theme }) => theme.font.size.base};
    text-transform: capitalize;
  }
  & h3,
  a {
    margin-bottom: 0;
    font-weight: ${({ theme }) => theme.font.weight.medium};
    font-size: ${({ theme }) => theme.font.size.base};
    text-transform: capitalize;
  }
  & p {
    margin-bottom: 0;
    font-size: ${({ theme }) => theme.font.size.xs};
    font-weight: ${({ theme }) => theme.font.weight.medium};
    text-transform: capitalize;
  }
`;
