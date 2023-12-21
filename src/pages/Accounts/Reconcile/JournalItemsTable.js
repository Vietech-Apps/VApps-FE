import { StyleProTable } from "meta/JLayouts/ProTable/index.style";
import { useGetData } from "meta/services/auth/ezAPI";
import React from "react";
import { useParams } from "react-router-dom";

const JournalItemsTable = () => {
  const { id } = useParams();
  const [{ apiData: transactions }] = useGetData(`JItems/reconsilingData`, [], {
    bankAcc: id,
    status: "Unreconciled",
  });
  let columns = [
    {
      title: "ID",
      dataIndex: "cuId",
    },
  ];

  return <StyleProTable columns={columns} />;
};

export default JournalItemsTable;
