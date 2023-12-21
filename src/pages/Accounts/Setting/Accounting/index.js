import AppPageMetadata from "meta/core/AppPageMetadata";
import React from "react";
import { dataInfo } from "../Codes";
import ReceiptForm from "./CreateForm";

const index = () => {
  return (
    <div>
      <AppPageMetadata title={dataInfo?.metaData} />
      <ReceiptForm />
    </div>
  );
};

export default index;
