import { Button, Card, Col, Form, Steps, Tabs } from "antd";
import { darken } from "polished";
import styled from "styled-components";
export const LayoutDiv = styled.div`
  padding-top: 0px;
  padding-bottom: 0rem;
  border-radius: 0px;
  & .ant-page-header-heading-sub-title {
    background: gainsboro;
    border-radius: 20px;
    padding: 0px 10px;
    font-weight: 500;
  }
  & .ant-page-header-back {
    margin-inline-end: 10px;
  }

  & .ant-pro-page-container-affix > .ant-affix {
    left: 0px;
    width: calc(100%) !important;
    & .ant-pro-page-container-warp {
      padding: 0.8rem 1rem;
    }
  }
  & .ant-page-header-heading-extra {
    display: flex;
    align-items: center;
  }
  & .ant-page-header-heading-title {
    font-size: ${({ theme }) => theme.font.size.lg};
    font-weight: 700;
    line-height: 24px;
    color: rgb(69 69 69);
  }

  & .ant-page-header {
    padding-block: 0px;
    padding-inline: 0rem;
    padding-top: 0px;
    padding-bottom: 0rem;
    > div,
    span {
      margin-top: 0px;
      margin-bottom: 0px;
    }
  }
`;
export const FooterDiv = styled.div`
  transform: translate(-16px, 0px);
  position: fixed;
  bottom: 0;
  height: 42px;
  background-color: #ffffff !important;
  box-shadow: 0px -2px 6px 0px #bdbdbd3d;
  width: calc(100% + 32px);
  z-index: 2;
  padding: 8px 16px;
  .mr-2 {
    margin-right: 10px;
  }
  & button {
    font-size: 12px;
    height: 25px;
    padding: 0px 10px;
    box-shadow: unset;
  }
`;

export const StyleLayoutBody = styled.div`
  height: 100%;
`;

export const StyledTabCard = styled.div`
  border-radius: 0px 6px 6px 6px;
  background-color: #ffffff;
  overflow: hidden;
`;
export const StyledLayoutCard = styled(Card)`
  border: 0px;
  overflow: auto;
  border-radius: 0.1875rem !important;
  height: 100%;

  .ant-card-body {
    padding: 0px 0px !important;
  }

  .ant-pro-card .ant-pro-card-body {
    padding-inline: 0px;
  }
  & .add-select-btn {
    width: 28px;
    height: 28px;
    border-radius: 0px;
  }
  & .select-add .ant-form-item-control-input {
    width: calc(100% - 6px);
    margin-left: auto;
  }
  & .ant-form-item-control-input {
    & .ant-select-selector {
      .ant-select-selection-search-input {
        height: 100% !important;
      }
    }
  }
  & .textform {
    .ant-form-item-control-input {
      min-height: unset;
      height: unset;
    }
  }
  & .ant-form-item-label > label {
    font-weight: 500 !important;
    height: 28px;
  }
  & .ant-picker,
  .ant-input-affix-wrapper {
    width: 100%;
  }
`;
export const StyleForm = styled(Form)`
  margin-top: 5px;
  padding-top: 5px;
  padding-left: 40px;
  padding-rigth: 80px !important;
  padding-bottom: 15px;
  border: 1px #e9e9e9;
  border-radius: 0px;

  & .ant-form-item-label > label {
    font-weight: 500 !important;
  }

  & .ant-select-selector {
    border-radius: 0 !important;
  }
  & .ant-input {
    border-radius: 0 !important;
  }
  & .ant-form-item {
    border-radius: 0px !important;
    padding-bottom: 0px;
  }
  & .ant-col {
    padding-bottom: 0px;
  }
`;
export const StyledCol = styled(Col)`
  margin-bottom: 15px !important;
`;
export const StyledCol2 = styled(Col)`
  margin-bottom: 30px !important;
`;
export const StyledIconButton = styled(Button)`
  padding: 0.275rem 0.45rem;

  color: ${({ theme }) => theme.palette.primary.textCol};
  svg {
    font-size: 16px;
    color: ${({ theme }) => theme.palette.primary.textCol};
  }
`;
export const StyledButtonComponent = styled.div`
  gap: 10px;
  display: flex;
`;
export const StepLayout = styled.div`
   
  .ant-steps {
    overflow:hidden;
    display:flex;
    justify-content:flex-end;
  }
  & .ant-steps.ant-steps-navigation {
    padding-top:0px;
    width: fit-content;
    gap:1.2rem;
   & .ant-steps-item {
     & .ant-steps-item-container {
       padding:0px;
       margin:0px;
       display: flex;
       align-items: center;
       justify-content: center;
        & .ant-steps-item-icon{
         margin-inline:0px 6px;
         .ant-steps-icon {
         line-height: unset;
         display: flex;
         align-items: center;
         justify-content: center;
         width: unset;
         height: 100%;
         svg {
          font-size: 18px;
          font-weight: 700;
          }
        }
      }
      }
    padding: 0px 0px;
    padding-inline-start:0px!important;
    display: flex;
    align-items: center;
    border-radius: 20px;
    justify-content: center;
    border: 2px solid #c0c0c1;
    padding:0px;
    height: 31px;
    min-width: 90px;
    margin: 0;
    transition:all 0.3s ease-in;
    &:after{
      right:5px;
      top:50%;
      transform:translateY(-50%) rotate(45deg);
      margin-left:5px;
      border-width:2px;
      width:8px;
      height:8px;
    }
    &:hover,&:focus{
      border-color: ${darken(0.08, "#c0c0c1")} ;
       .ant-steps-item-title,svg{    
        color: ${darken(0.08, "#c0c0c1")} ;
      }
      &:after{
      border-color: ${darken(0.08, "#c0c0c1")} ;
      }
    }
     
    &:before{
    display:none;
    }
   
  }

  & .ant-steps-item-finish,.ant-steps-item-active {
    border-color: ${({ theme }) => theme.palette.primary.main};
    positon:relative;
     .ant-steps-item-title,svg{    
        color:${({ theme }) => theme.palette.primary.main};
    }
    
    &:after{
      border-color: ${({ theme }) => theme.palette.primary.main};
    }
    &:hover,&:focus{
      border-color: ${({ theme }) =>
        darken(0.08, theme.palette.primary.main)} !important;
       .ant-steps-item-title,svg{    
        color: ${({ theme }) => darken(0.08, theme.palette.primary.main)};
    }
     &:after{
      border-color: ${({ theme }) => darken(0.08, theme.palette.primary.main)};
    }
    }
   
}
    

`;
