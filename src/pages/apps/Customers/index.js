import React from "react";
import AppPageMetadata from "meta/core/AppPageMetadata";
import { useAuthUser } from "meta/utility/AuthHooks";
import ListTable from "./Component/List";
import { contactInfo } from "./Component/Code";

const Index = () => {
  const { user } = useAuthUser();

  return (
    <>
      <AppPageMetadata title={contactInfo.metaData} />
      <ListTable user={user} />
    </>
  );
};

export default Index;
