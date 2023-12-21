import AppPageMetadata from "meta/core/AppPageMetadata";

import React, { useEffect } from "react";
import List from "./List";
import { companyInfo } from "./Code";

const index = () => {
  return (
    <div>
      <AppPageMetadata title={companyInfo.metaData} />
      <List />
    </div>
  );
};

export default index;
