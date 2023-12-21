import { Form } from "antd";

import styled from "styled-components";

export const StyledTaxAndRoundOff = styled(Form)`
  & .justify-content-end {
    justify-content: flex-end;
  }

  & .mb-0 {
    margin-bottom: 0 !important;
  }
  & .mb-3 {
    margin-bottom: 0.5rem !important;
  }
  & .white-nowrap {
    white-space: nowrap;
  }
  & .ant-col {
    min-height: unset;
  }
  & .ant-typography strong {
    font-weight: 700;
  }
`;
