import styled from "styled-components";

export const StyledAppLogo = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  align-items: center;
  margin-top: 0.6rem;
  justify-content: center;

  & img {
    object-fit: contain;
    height: 46px;
    font-size: 14px;
    filter: drop-shadow(2px 2px 1px #464545);
    [dir="rtl"] & {
      margin-right: 0;
      margin-left: 10px;
    }
  }
`;
