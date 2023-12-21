import AppPageMetadata from "meta/core/AppPageMetadata";
import React from "react";
import List from "./List";
const index = () => {
  return (
    <div>
      <AppPageMetadata title="Receipts" />
      <List />
    </div>
  );
};

export default index;
