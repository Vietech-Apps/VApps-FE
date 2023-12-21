import AppPageMetadata from "meta/core/AppPageMetadata";
import React from "react";
// import BankStatement from "./bankStatement";
import { reconcileInfo } from "./Codes";
import Main from "./Main";
const index = () => {
  return (
    <div>
      <AppPageMetadata title={reconcileInfo.metaData} />
      <Main />
    </div>
  );
};

export default index;
