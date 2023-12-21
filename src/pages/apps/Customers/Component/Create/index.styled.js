import AppScrollbar from "meta/core/AppScrollbar";
import { Avatar, Button, DatePicker, Form, Input, Modal } from "antd";
import styled from "styled-components";

export const StyledAddForm = styled(Form)`

  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  & .form-field {
    margin-bottom: 0px;
  }
`;

export const StyledContentDiv = styled.div`
  flex: 1;
  margin-top: 10px;
  padding-top: 10px;
  padding-bottom: 15px;
  background-color: #fafafa;
  border: 1px dashed #e9e9e9;
  border-radius: 2px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}px) {
    padding-left: 22px;
    padding-right: 22px;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xxl}px) {
    padding-left: 30px;
    padding-right: 30px;
  }
`;

export const StyledTodoInput = styled(Input)`
  width: 100%;
  font-weight: ${({ theme }) => theme.font.weight.light};
`;

export const StyledSelectRow = styled.div`
  display: flex;
  align-items: center;
`;


export const StyledTodoModalScrollbar = styled(AppScrollbar)`
  min-height: 320px;
  padding-top: 4px;
`;
