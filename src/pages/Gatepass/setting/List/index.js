import React from "react";
import AppPageMetadata from "meta/core/AppPageMetadata";
import ListTable from "./List";
import { useAuthUser } from "meta/utility/AuthHooks";

const List = () => {
  const createCode = 140101;
  const updateCode = 140103;
  const deleteCode = 140104;
  const viewCode = 140102;
  const DataPath = "meta/company/profile/prolist";
  const HeaderTitle = "Company";
  const ButtonTitle = "Add Company";
  const { user } = useAuthUser();

  return (
    <>
      <AppPageMetadata title={HeaderTitle} />
      <ListTable
        DataPath={DataPath}
        HeaderTitle={HeaderTitle}
        ButtonTitle={ButtonTitle}
        createCode={createCode}
        updateCode={updateCode}
        deleteCode={deleteCode}
        viewCode={viewCode}
        user={user}
      />
    </>
  );
};

export default List;
