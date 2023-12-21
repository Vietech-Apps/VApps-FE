import AppPageMetadata from "meta/core/AppPageMetadata";
import React from "react";
import List from "./List";
import { formTitle, taxInfo } from "./Codes";

const index = () => {
  return (
    <div>
      <AppPageMetadata title={taxInfo.metaData} />
      <List />
    </div>
  );
};

export default index;
