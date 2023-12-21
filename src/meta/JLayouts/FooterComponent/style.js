import { ProList } from "@ant-design/pro-components";
import styled from "styled-components";

export const ProListStyle = styled(ProList)`
  & .ant-list-items {
    .ant-list-item-meta-description {
      background: transparent !important;
    }
    .ant-pro-list-row: hover {
      background: transparent;
    }
    td {
      vertical-align: top;
      padding: 0.5rem;
      b {
        white-space: nowrap;
      }
      .ant-upload-list {
        display: flex;
        gap: 10px;
        .ant-upload-list-item {
          margin: 0px;
        }
      }
    }
  }
`;
