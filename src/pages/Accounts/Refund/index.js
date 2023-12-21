import AppPageMetadata from "meta/core/AppPageMetadata";

import React, { useEffect } from "react";
import List from "./List";
import { refundInfo } from "./Code";

const index = () => {
  return (
    <div>
      <AppPageMetadata title={refundInfo.metaData} />
      <List />
    </div>
  );
};

export default index;
