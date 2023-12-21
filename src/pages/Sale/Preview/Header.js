import { Button } from "antd";
import jwtAxios from "meta/services/auth/jwt-api";
import React from "react";

import "./index.style.less";
import { useState } from "react";

const Header = ({
  createAndDownloadPdf,
  downloadStatus,
  sendPdf,
  sendStatus,
}) => {
  return (
    <>
      <Button
        loading={downloadStatus}
        type="primary"
        onClick={createAndDownloadPdf}
      >
        Download PDF
      </Button>
      <Button loading={sendStatus} type="primary" onClick={sendPdf}>
        Send via Email
      </Button>
      <div className="invoice-header d-flex  justify-bet align-i-center mb-4">
        <img alt="logo" src={"/assets/images/logo.png"} className="h-img" />

        <img
          alt="logo"
          src={"/assets/images/product.png"}
          style={{ width: "35%" }}
        />
      </div>
    </>
  );
};

export default Header;
