import AppPageMetadata from "meta/core/AppPageMetadata";

import React, { useEffect } from "react";
import List from "./List";
import { billInfo } from "./Code";

const index = () => {
  return (
    <div>
      <AppPageMetadata title={billInfo.metaData} />
      <List />
    </div>
  );
};

export default index;
