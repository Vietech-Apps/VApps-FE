import AppScrollbar from "meta/core/AppScrollbar";
import { Button, Form, Modal } from "antd";
import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
export const StyledMailModal = styled(Modal)`
  position: relative;
  overflow: hidden;

  & .ant-modal-body {
    padding: 0;
  }

  & .ant-modal-header {
    padding-left: 8px;
    padding-right: 8px;
  }
`;

export const StyledMainModalScrollbar = styled(AppScrollbar)`
  height: 350px;
`;

export const StyledMainForm = styled(Form)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const StyledMailModalContent = styled.div`
  flex: 1;
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 32px;

  & .ant-form-item {
    margin-bottom: 16px;
  }

  & textarea.ant-input {
    height: 200px;
  }
`;

export const StyledMailModalTo = styled(Form.Item)`
  display: flex;
  align-items: center;
`;

export const StyledMailModalSuffix = styled.span`
  position: relative;

  & > span {
    cursor: pointer;
    margin-left: 16px;

    [dir="rtl"] & {
      margin-left: 0;
      margin-right: 16px;
    }
  }
`;

export const StyledMailModalTextArea = styled(ReactQuill)`
  width: 100%;
  height: 150px;
`;

export const StyledMainModalFooter = styled.div`
  padding: 16px 8px;
  border-top: 1px solid ${({ theme }) => theme.palette.borderColor};
  margin-bottom: 0;
  border-radius: 0 0 ${({ theme }) => theme.sizes.borderRadius.base}
    ${({ theme }) => theme.sizes.borderRadius.base};
  text-align: right;

  [dir="rtl"] & {
    text-align: left;
  }
`;

export const StyledMainModalBtn = styled(Button)`
  padding: 8px 32px;
`;
