import AppPageMetadata from "meta/core/AppPageMetadata";
import React from "react";
import List from "./List";
import { formTitle } from "./Codes";
const index = () => {
  return (
    <div>
      <AppPageMetadata title={formTitle} />
      <List />
    </div>
  );
};

export default index;
