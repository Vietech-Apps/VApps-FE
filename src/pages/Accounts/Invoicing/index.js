import AppPageMetadata from "meta/core/AppPageMetadata";

import React, { useEffect } from "react";
import List from "./List";
import { invoiceInfo } from "./Code";

const index = () => {
  return (
    <div>
      <AppPageMetadata title={invoiceInfo.metaData} />
      <List />
    </div>
  );
};

export default index;
