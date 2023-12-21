import AppPageMetadata from "meta/core/AppPageMetadata";

import React from "react";
import List from "./List";
import { employeInfo } from "../Code";

const index = () => {
  return (
    <div>
      <AppPageMetadata title={employeInfo.metaData} />
      <List />
    </div>
  );
};

export default index;
