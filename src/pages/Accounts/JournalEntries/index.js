import AppPageMetadata from "meta/core/AppPageMetadata";
import React from "react";
import List from "./List";
import { JEInfo } from "./Codes";

const index = () => {
  return (
    <div>
      <AppPageMetadata title={JEInfo.metaData} />
      <List />
    </div>
  );
};

export default index;
