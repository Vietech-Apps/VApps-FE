import { v4 as uuidv4 } from "uuid";
import { DeleteTwoTone, HeartTwoTone, SmileTwoTone } from "@ant-design/icons";
import { EditableProTable } from "@ant-design/pro-components";
import { Button, Input, Table, message, Form, InputNumber, Alert } from "antd";
import jwtAxios from "meta/services/auth/jwt-api";
import React, { useEffect, useRef, useState } from "react";

const ProductTable = ({ dataSource, setDataSource, selected, loading }) => {
  const [selectOptions, setSelectOptions] = useState([]);
  const [editableKeys, setEditableRowKeys] = useState([]);
  const editableFormRef = useRef();
  useEffect(() => {
    setEditableRowKeys(dataSource.map((item) => item.id));
  }, [dataSource]);

  const handleAdd = () => {
    const hasEmptyAccount = dataSource.some(
      (item) => item.account.trim() === ""
    );
    const hasMissingDebitOrCredit = dataSource.some(
      (item) => item.debit === 0 && item.credit === 0
    );

    if (hasEmptyAccount) {
      message.info("Please add account detail.");
      return;
    }
    if (hasMissingDebitOrCredit) {
      message.info("Please add debit or credit amount.");
      return;
    }
    if (dataSource?.length > 0) {
      const totalDebit = dataSource.reduce((sum, item) => sum + item.debit, 0);
      const totalCredit = dataSource.reduce(
        (sum, item) => sum + item.credit,
        0
      );

      if (totalDebit !== totalCredit) {
        const remainingBalance = Math.abs(totalDebit - totalCredit);
        const newData = {
          key: uuidv4(),
          account: "",
          partner: "",
          id: Date.now(),
          notes: "",
          credit: totalDebit > totalCredit ? remainingBalance : 0,
          debit: totalCredit > totalDebit ? remainingBalance : 0,
        };
        setDataSource([...dataSource, newData]);
        return;
      }
    }
    const newData = {
      id: Date.now(),
      key: uuidv4(),
      account: "",
      partner: "",
      credit: 0,
      debit: 0,
      notes: "",
    };

    setDataSource([...dataSource, newData]);
  };

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
        disabled: selected?.status === "Posted",
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
      title: "Partner",
      key: "contact",
      dataIndex: "contact",
      valueType: "select",
      request: async (params, e) => {
        let newParams = {
          q: params.keyWords,
          fields: "title",
          // where: { _id: e.record.contact },
        };
        const response = await jwtAxios.get("meta/contact/dsearch", {
          params: newParams,
        });
        const data = await response.data.result;
        const options = data.map((item) => ({
          label: item.title,
          value: item._id,
        }));
        setSelectOptions(data);
        return options;
      },
      fieldProps: {
        showSearch: true,
        disabled: selected?.status === "Posted",
        // value: record.contact,
      },
      formItemProps: {
        rules: [
          {
            required: true,
            whitespace: true,
            message: "please select parnter",
          },
        ],
      },
    },
    {
      title: "Description",
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
      renderFormItem: (e, { fieldProps }, form) => {
        return (
          <InputNumber
            {...fieldProps}
            onChange={() => form.setFieldValue([e.entity.id, "credit"], 0)}
          />
        );
      },
    },
    {
      title: "Credit",
      dataIndex: "credit",
      valueType: "digit",
      renderFormItem: (e, { fieldProps }, form) => {
        return (
          <InputNumber
            {...fieldProps}
            onChange={() => form.setFieldValue([e.entity.id, "debit"], 0)}
          />
        );
      },
      width: 120,
    },
    {
      title: "",
      valueType: "option",
      fixed: "right",
      width: 40,
      render: (_, record) => (
        <Button
          icon={<DeleteTwoTone />}
          size="small"
          onClick={() => {
            setDataSource((prevData) =>
              prevData.filter((item) => item.key !== record.key)
            );
          }}
        />
      ),
    },
  ];

  return (
    <EditableProTable
      loading={loading}
      size="small"
      columns={columns}
      rowKey="id"
      scroll={{
        x: 960,
      }}
      value={dataSource}
      editableFormRef={editableFormRef}
      onChange={setDataSource}
      recordCreatorProps={false}
      toolBarRender={false}
      editable={{
        editableKeys,
        type: "multiple",
        onChange: setEditableRowKeys,
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
        onValuesChange: (changedValues, recordList) => {
          const newData = recordList.map((item) => {
            if (item.id === changedValues.id) {
              const updatedItem = { ...item };
              if ("account" in changedValues) {
                const selectedOption = selectOptions?.find(
                  (option) => option._id === changedValues.account
                );
                updatedItem.account = `${selectedOption?.code}-${selectedOption?.name}`;
                updatedItem.accountId = selectedOption?._id;
              }
              return updatedItem;
            }
            return item;
          });
          setDataSource(newData);
        },
      }}
      locale={{
        emptyText: () => (
          <Alert
            description="It is advisable to have your accountant or bookkeeper
           handle the creation of Manual journal entries, 
          unless you possess significant expertise in managing your general ledger."
          />
        ),
      }}
      summary={(pageData) => {
        let totalDebit = 0;
        let totalCredit = 0;

        pageData.forEach(({ debit, credit }) => {
          totalDebit += Number(debit);
          totalCredit += Number(credit);
        });
        let balance = totalDebit - totalCredit;
        return (
          <Table.Summary.Row>
            <Table.Summary.Cell index={0}></Table.Summary.Cell>
            <Table.Summary.Cell index={1}>
              <Button
                onClick={handleAdd}
                type="primary"
                size="small"
                disabled={selected?.addALineDisabled}
              >
                Add a line
              </Button>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={2}></Table.Summary.Cell>
            <Table.Summary.Cell index={3}></Table.Summary.Cell>
            {dataSource?.length > 0 && (
              <Table.Summary.Cell index={4}>
                <b>{totalDebit}</b>
              </Table.Summary.Cell>
            )}
            {dataSource?.length > 0 && (
              <Table.Summary.Cell index={5}>
                <b>{totalCredit}</b>
              </Table.Summary.Cell>
            )}
            <Table.Summary.Cell index={6}>
              {balance == 0 ? <HeartTwoTone /> : balance}
            </Table.Summary.Cell>
          </Table.Summary.Row>
        );
      }}
    />
  );
};

export default ProductTable;
