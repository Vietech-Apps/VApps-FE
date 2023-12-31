import styled from "styled-components";

export const StyledInvoiceHeader = styled.div`

  .invoice-header {
    display: flex;
    padding: 24px;
    @media screen and (min-width: @screen-sm) {
      padding-top: 32px;
      padding-bottom: 32px;
    }
    @media screen and (min-width: @screen-lg) {
      flex-direction: row;
      align-items: center;
    }
    @media screen and (min-width: @screen-xxl) {
      padding: 40px 32px;
      margin-bottom: 32px;
    }
  }

  .invoice-logo {
    display: inline-flex;
    align-items: center;
    margin-bottom: 32px;
    justify-content: center;

    @media screen and (min-width: @screen-lg) {
      align-items: flex-start;
      justify-content: flex-start;
      margin-bottom: 0;
      margin-right: 40px;

      [dir="rtl"] & {
        margin-right: 0;
        margin-left: 40px;
      }
    }

    & img {
      display: inline-block;
      width: 100px;

      @media screen and (max-width: @screen-xs-max) {
        width: 60px;
      }
    }
  }

  .invoice-header-row {
    margin-left: -12px;
    margin-right: -12px;
    color: @text-color-secondary;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;

    @media screen and (min-width: @screen-sm) {
      flex-direction: row;
    }
  }

  .invoice-header-item {
    padding-left: 12px;
    padding-right: 12px;
    margin-bottom: 12px;
    text-align: center;
    @media screen and (min-width: @screen-sm) {
      margin-bottom: 0;
      text-align: left;

      [dir="rtl"] & {
        text-align: right;
      }
    }

    &:last-child {
      @media screen and (min-width: @screen-sm) {
        text-align: right;

        [dir="rtl"] & {
          text-align: left;
        }
      }

      @media screen and (min-width: @screen-lg) {
        text-align: left;

        [dir="rtl"] & {
          text-align: right;
        }
      }
    }


`;

export const StyledTechnical = styled.div`
  .invoice {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .invoice-container {
    flex: 1;
    max-width: 900px;
    width: 100%;
    margin:20px auto;
  }

  .invoice-card {
    margin-bottom: 24px;
    @media screen and (min-width: @screen-lg) {
      margin-bottom: 32px;
    }
    @media screen and (min-width: @screen-xxl) {
      padding-top: 32px;
    }
  }

    & h3 {
      font-size: @font-size-lg;
      color: @grey-700;
      margin-bottom: 4px;
      font-weight: @font-weight-bold;
    }

    & p {
      margin-bottom: 4px;
    }
  }

  .invoice-table {
    & .ant-table {
      background-color: transparent;
    }

    @media screen and (min-width: @screen-md) {
      & table {
        table-layout: fixed !important;
      }

      & .ant-table-thead > tr > th {
        white-space: nowrap;
      }

      & .ant-table-tbody > tr > td {
        white-space: normal;
      }
    }

    & .ant-table-thead > tr > th {
      font-size: 13px;
      padding: 24px;
      font-weight: @font-weight-bold;
      background-color: transparent;
      text-transform: uppercase;
      text-align: right;
      color: @grey-700;
      border-bottom: @border-style-base @border-width-base @border-color-base;

      [dir="rtl"] & {
        text-align: left;
      }

      &:first-child {
        text-align: left;

        [dir="rtl"] & {
          text-align: right;
        }
      }
    }

    & .ant-table-tbody > tr.ant-table-row {
      &:hover td {
        background-color: transparent;
      }
    }

    & .ant-table-tbody > tr > td {
      font-size: 13px;
      padding: 24px;
      text-align: right;
      vertical-align: top;
      border-bottom: @border-style-base @border-width-base @border-color-base;

      [dir="rtl"] & {
        text-align: left;
      }

      &:first-child {
        text-align: left;

        [dir="rtl"] & {
          text-align: right;
        }
      }

      & h6 {
        font-size: 13px;
        text-transform: uppercase;
        margin-bottom: 0;
      }

      & p {
        margin-top: 8px;
        margin-bottom: 0;
        color: @text-color-secondary;
      }
    }

    & .ant-table-tbody > tr:last-child > td {
      border-bottom: 0 none;
    }
  }

  .invoice-truncate-view {
    width: 160px;
    @media screen and (min-width: @screen-sm) {
      width: auto;
    }

    & span {
      display: block;
    }
  }
  .d-flex {
    display: flex;
  }
  .h-img {
    width: 30%;
  }
  .justify-bet {
    justify-content: space-between;
  }
  .text-center {
    text-align: center;
  }
  .my-2 {
    margin: 1rem 0px;
  }
  .customer-data {
    font-size: 12px;
  }
  div.invoice-set.invoice-card {
    border-radius: 0px;
    position: relative;
  }
  
  .invoice-p {
    font-size: 0.65rem;
    margin: 0;
    text-transform: capitalize;
    font-weight: 500;
  }
  .mt-4 {
    margin-top: 4rem;
  }
  .mb-4 {
    margin-bottom: 2rem;
  }
  .invoice-table {
    padding: 0px 36px;
  }
  div.invoice-table table {
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.06);
  }
  .invoice-table .ant-table-cell::before {
    display: none;
  }
  .invoice-table .ant-table-thead > tr > th {
    padding: 1rem;
  }
  .invoice-table table thead td {
    font-size: 0.8rem;
    font-weight: bold;
    padding: 0.25rem 0.3rem;
    text-align: center;
  }
  .invoice-table table tr {
    border-bottom: 1px solid #0000002e;
  }
  .invoice-table table tr td:nth-child(1) {
    width: 60%;
  }
  .invoice-table table tr td:nth-child(2) {
    width: 10%;
  }
  .invoice-table table tr td:nth-child(3) {
    width: 15%;
  }
  .invoice-table table tr td:nth-child(4) {
    width: 15%;
  }
  .invoice-table table tbody tr td:nth-child(1) {
    text-align: left;
  }
  .f-bold {
    font-weight: bold;
  }

  .text-l {
    text-align: left !important;
  }
  .f-bold {
    font-weight: bold !important;
  }
  .section-tr {
    background: #ebebeb;
  }
  .invoice-table tbody tr td {
    padding: 0.25rem 0.3rem;
    text-align: center;
    font-size: 0.72rem;
    vertical-align: middle;
    font-weight: 500;
  }

  .table-h tr td {
    white-space: nowrap;
  }
  .table-h {
    background: #c3c3f9;
  }
  .invoice-set .ant-card-body {
    background: transparent;
    z-index: 2;
  }
  .invoice-set::before {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    z-index: 0;
    background-size: 30% 156px;
    filter: grayscale(1);
    opacity: 0.1;
    background-repeat: repeat no-repeat;
    height: 80%;
    content: "";
    background-image: url("./logo.png");
    background-position: center;
  }
  td {
    background: transparent !important;
  }
`;

export const StyledInvoiceFooter = styled.div`
  .invoice-footer-title {
    margin-bottom: 22px;
    color: @text-color-secondary;
    text-align: center;
    font-size: @font-size-lg;
    font-weight: @font-weight-bold;
    text-transform: uppercase;
    @media screen and (min-width: @screen-xxl) {
      margin-bottom: 16px;
    }
  }

  .invoice-footer {
    height: 1.7rem;
    background-color: #0f0f8dbd;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    letter-spacing: 3px;
    font-size: 12px;
  }
  .in-footer-card > div h5 {
    margin-bottom: 1px;
    font-weight: 600;
    font-size: 13px;
  }
  .in-footer-card > div {
    position: relative;
    padding: 0 12px;
    margin-bottom: 0px !important;
  }
  .in-footer-card-divider > div::before {
    content: "";
    position: absolute;
    height: 100%;
    background: linear-gradient(45deg, #00000061, black, #00000061);
    width: 0.8px;
    right: 2px;
  }
  .in-footer-card {
    padding: 14px 24px;
  }
  .invoice-p {
    font-size: 0.65rem;
    margin: 0;
    text-transform: capitalize;
    font-weight: 500;
  }
  .mt-4 {
    margin-top: 4rem;
  }
`;
