import styled from 'styled-components';

export const StyledChatWindowWrapper = styled.div`
  .sc-launcher {
    cursor: pointer;
    z-index: 999;
    display: none;
  }

  .sc-header--img {
    width: 50px;
    height: 50px;
    padding: 0;
    margin-right: 5px;
  }

  .sc-chat-window {
    bottom: 25px;
    z-index: 999;
    max-height: 380px;
    height: 100%;
    box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.09);
    font-family: ${({theme}) => theme.font.family};
    right: 20px;
    transform: translateX(0);

    [dir='rtl'] & {
      right: auto;
      left: 20px;
    }

    @media screen and (min-width: ${({theme}) => theme.breakpoints.lg}px) {
      transform: translateX(calc(96vw - 430px));
      right: 0;

      [dir='rtl'] & {
        transform: translateX(-500px);
        right: auto;
        left: 0;
      }
    }

    @media screen and (min-width: ${({theme}) => theme.breakpoints.xl}px) {
      transform: translateX(calc(96vw - 640px));

      [dir='rtl'] & {
        transform: translateX(-720px);
      }
    }

    @media screen and (min-width: ${({theme}) => theme.breakpoints.xxl}px) {
      transform: translateX(calc(100vw - 700px));

      [dir='rtl'] & {
        transform: translateX(-880px);
      }
    }

    @media screen and (min-width: 1920px) {
      [dir='rtl'] & {
        transform: translateX(-1120px);
      }
    }
  }

  .sc-header {
    padding: 12px 16px;
  }

  .sc-header--team-name {
    font-weight: ${({theme}) => theme.font.weight.bold};
    font-size: 18px;
  }

  .sc-message--file p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100px;
  }

  .sc-user-input--buttons {
    [dir='rtl'] & {
      right: auto;
      left: 10px;
    }
  }

  @media (max-width: 1367px) {
    .sc-header--img {
      width: 40px;
      height: 40px;
    }

    .sc-header {
      min-height: 65px;
    }

    .sc-header--team-name {
      font-size: ${({theme}) => theme.font.size.lg};
    }

    .sc-message--text {
      padding: 12px 16px;
    }
  }

  @media (max-width: 599px) {
    .sc-chat-window {
      width: 300px;
      height: 80%;
      border-radius: 10px;
      right: 10px;
      bottom: 10px;
      overflow: hidden;
    }
  }
`;
