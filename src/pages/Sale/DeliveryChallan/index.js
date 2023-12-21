import AppPageMetadata from "meta/core/AppPageMetadata";
import React from "react";
import { dataInfo } from "./Code";
import List from "./List";
const index = () => {
  return (
    <div>
      <AppPageMetadata title={dataInfo.metaData} />
      <List />
    </div>
  );
};

export default index;
