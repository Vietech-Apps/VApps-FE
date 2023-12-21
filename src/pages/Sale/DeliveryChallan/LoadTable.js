import { Button, Space, Table } from "antd";
import React, { useEffect, useState } from "react";

const LoadTable = ({ dataSource, setDataSource }) => {
  const columns = [
    {
      title: "code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      render: (record) => (
        <Space>
          <Button
            onClick={() =>
              setDataSource((c) =>
                c.map((s) =>
                  s.key === record.key ? { ...s, isRemove: false } : s
                )
              )
            }
          >
            Add
          </Button>
        </Space>
      ),
      key: "name",
    },
  ];
  const [data, setData] = useState([]);
  console.log(data);
  useEffect(() => {
    setData(dataSource.filter((c) => c.isRemove));
  }, [dataSource]);
  return <Table dataSource={data} columns={columns} />;
};

export default LoadTable;
