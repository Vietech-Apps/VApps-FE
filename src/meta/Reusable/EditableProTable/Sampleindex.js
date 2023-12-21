import React, { useState } from "react";
import ResizableTable from "./EditResizableTable";

const sample = () => {
  const [dataSource, setDataSource] = useState([]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      editable: true,
      type: "input",
    },
    {
      title: "Age",
      dataIndex: "age",
      editable: true,
      type: "number",
      numberProps: { min: 1 },
    },
    {
      title: "Gender",
      dataIndex: "gender",
      editable: true,
      type: "SelectSearch",
      route: "erp/chartOfAccounts/dsearch",
      others: {
        selectProps: { placeholder: "search accounts" },
        fields: "name,code",
        values: "_id",
        label: "name",
        customHandleSelect: (e, o, r) => {
          let d = o.find((c) => c._id == e);
          return d.name;
        },
      },
    },
  ];

  return (
    <ResizableTable
      columns={columns}
      dataSource={dataSource}
      setDataSource={setDataSource}
    />
  );
};

export default sample;
