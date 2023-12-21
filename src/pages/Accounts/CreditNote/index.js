import AppPageMetadata from "meta/core/AppPageMetadata";

import React, { useEffect } from "react";
import List from "./List";
import { creditNoteInfo } from "./Code";

const index = () => {
  return (
    <div>
      <AppPageMetadata title={creditNoteInfo.metaData} />
      <List />
    </div>
  );
};

export default index;
