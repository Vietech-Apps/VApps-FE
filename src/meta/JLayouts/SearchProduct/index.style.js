import { Select } from "antd";
import styled from "styled-components";

export const StyledProductSearch = styled(Select)`
  position: relative;
  max-width: 700px;
  min-height: 36px;
  margin-left: auto;
  margin-right: 10px;

  [dir="rtl"] & {
    margin-left: 10px;
    margin-right: auto;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    margin-right: 20px;
    max-width: 650px;

    [dir="rtl"] & {
      margin-right: auto;
      margin-left: 20px;
    }
  }
 


  

 
 
`;
