import AppPageMetadata from "meta/core/AppPageMetadata";
import React from "react";
import Listing from "./Listing";

const index = () => {
  return (
    <div>
      <AppPageMetadata title="GRN" />
      <Listing />
    </div>
  );
};

export default index;
