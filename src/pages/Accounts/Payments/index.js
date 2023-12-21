import AppPageMetadata from "meta/core/AppPageMetadata";
import React from "react";
import List from "./List";
import { dataInfo } from "./Codes";
const index = () => {
  return (
    <div>
      <AppPageMetadata title={dataInfo.metaData} />
      <List />
    </div>
  );
};

export default index;
