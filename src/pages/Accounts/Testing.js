import { DeleteTwoTone } from "@ant-design/icons";
import { EditableProTable } from "@ant-design/pro-components";
import { Button, Input, Table } from "antd";
import jwtAxios from "meta/services/auth/jwt-api";
import React, { useEffect, useState } from "react";

const Testing = () => {
  const [selectOptions, setSelectOptions] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [editableKeys, setEditableRowKeys] = useState([]);
  const [quer, setQuer] = useState(1);
  useEffect(() => {
    setEditableRowKeys(dataSource.map((item) => item.id));
  }, [quer]);
  const columns = [
    {
      title: "Sr.#",
      dataIndex: "index",
      valueType: "indexBorder",
      width: 40,
    },
    {
      title: "Accounts",
      key: "account",
      dataIndex: "account",
      valueType: "select",
      request: async (params) => {
        let newParams = {
          q: params.keyWords,
          fields: "name,code",
        };
        const response = await jwtAxios.get("erp/chartOfAccounts/dsearch", {
          params: newParams,
        });
        const data = await response.data.result;
        const options = data.map((item) => ({
          label: `${item.code}-${item.name}`,
          value: item._id,
        }));
        setSelectOptions(data);
        return options;
      },
      fieldProps: {
        showSearch: true,
      },
      formItemProps: {
        rules: [
          {
            required: true,
            whitespace: true,
            message: "please select account",
          },
        ],
      },
    },
    {
      title: "Notes",
      dataIndex: "notes",
      renderFormItem: (_, { fieldProps }) => {
        return (
          <Input.TextArea
            {...fieldProps}
            autoSize={{ minRows: 1, maxRows: 4 }}
          />
        );
      },
    },
    {
      title: "Debit",
      dataIndex: "debit",
      valueType: "digit",
      width: 120,
      fieldProps: {
        placeholder: "Debit",
        formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        parser: (value) => value.replace(/\$\s?|(,*)/g, ""),
        style: { width: "100%" },
      },
    },
    {
      title: "Credit",
      dataIndex: "credit",
      valueType: "digit",
      fieldProps: {
        placeholder: "Credit",
        style: { width: "100%" },
        formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        parser: (value) => value.replace(/\$\s?|(,*)/g, ""),
      },
      width: 120,
    },
    {
      title: "",
      valueType: "option",
      width: 40,
      render: () => null,
    },
  ];

  const handleAdd = () => {
    const newData = {
      account: "",
      id: Date.now(),
      debit: 0,
      credit: 0,
      notes: "",
    };
    setDataSource([...dataSource, newData]);
  };
  return (
    <>
      <EditableProTable
        size="small"
        columns={columns}
        rowKey="id"
        scroll={{
          x: 960,
        }}
        value={dataSource}
        onChange={setDataSource}
        recordCreatorProps={false}
        toolBarRender={false}
        editable={{
          type: "multiple",
          editableKeys,
          actionRender: (row, config, defaultDoms) => {
            return [
              <Button
                icon={<DeleteTwoTone />}
                key="extra"
                size="small"
                onClick={() =>
                  setDataSource((e) => e.filter((c) => c.id != row.id))
                }
              ></Button>,
            ];
          },
          onValuesChange: (record, recordList) => {
            if (record && "account" in record) {
              const updatedRecordList = recordList.map((item) => {
                if (item.id === record.id) {
                  const selectedOption = selectOptions?.find(
                    (option) => option._id == record.account
                  );

                  return {
                    ...item,
                    state: `${selectedOption?.code}-${selectedOption?.name}`,
                    accountId: selectedOption?._id,
                  };
                }
                return item;
              });
              setDataSource(updatedRecordList);
            } else {
              setDataSource(recordList);
            }
          },
          onChange: setEditableRowKeys,
        }}
        locale={{ emptyText: () => "" }}
        summary={(pageData) => {
          let totalDebit = 0;
          let totalCredit = 0;

          pageData.forEach(({ debit, credit }) => {
            totalDebit += Number(debit);
            totalCredit += Number(credit);
          });

          return (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}></Table.Summary.Cell>
              <Table.Summary.Cell index={1}>
                <Button
                  onClick={() => {
                    handleAdd(), setQuer(quer + 1);
                  }}
                  type="primary"
                  size="small"
                >
                  Add a line
                </Button>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={2}></Table.Summary.Cell>
              <Table.Summary.Cell index={3}>
                <b>{totalDebit}</b>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={4}>
                <b>{totalCredit}</b>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={5}></Table.Summary.Cell>
            </Table.Summary.Row>
          );
        }}
      />
    </>
  );
};
export default Testing;
