import { Select, Table } from "antd";
import React, { useEffect, useState } from "react";

import { calculateSummary, calculateTotalPrice } from "meta/common/MyFns";
import { StyledProductTable } from "meta/common/FormFeilds/index.styled";
const EditAbleProductTable = ({ id, items }) => {
  const columns = [
    {
      title: "Account",
      dataIndex: "account",
      render: (text, record) => {
        if (record.isSection) {
          return {
            props: {
              colSpan: 0, // hide this cell if isSection is true
            },
          };
        }
        return <small>{text}</small>;
      },
      editable: true,
      width: "15%",
      key: "account",
      type: 2,
    },

    {
      title: "Detail",
      dataIndex: "name",
      render: (text, record) => {
        if (record.isSection) {
          return {
            children: <b>{text}</b>,
            props: {
              colSpan: 4,
            },
          };
        }
        return <small>{text}</small>;
      },
      editable: true,
      width: "17%",
      key: "name",
      type: 1,
    },

    {
      title: "Debit",
      dataIndex: "debit",
      //   editable: true,
      width: "8%",
      key: "price",
      type: 3,
      render: (text, record) => {
        if (record.isSection) {
          return {
            props: {
              colSpan: 0,
            },
          };
        }
        return <small>{parseFloat(text).toLocaleString()}</small>;
      },
    },

    {
      title: "Credit",
      dataIndex: "credit",
      //   editable: true,
      key: "credit",
      width: "8%",
      type: 3,
      render: (text, record) => {
        if (record.isSection) {
          return {
            props: {
              colSpan: 0,
            },
          };
        }
        return <small>{parseFloat(text).toLocaleString()}</small>;
      },
    },
    {
      title: "",
      render: (_, key) => "",
      width: "2%",
    },
  ];

  return (
    <div>
      <StyledProductTable
        bordered={false}
        size={"small"}
        toolBarRender={false}
        locale={{ emptyText: () => "" }}
        dataSource={id ? items : []}
        rowKey={(e) => e.key}
        pagination={false}
        columns={columns}
        summary={(pageData) => {
          const { formattedTotalDebit, formattedTotalCredit, balance } =
            calculateSummary(pageData);

          return (
            <>
              <Table.Summary.Row size="samll">
                <Table.Summary.Cell index={0}>
                  {/* <Button type="link" onClick={handleAddSection}>
                    Add A Line
                  </Button> */}
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1}>Total</Table.Summary.Cell>
                <Table.Summary.Cell index={2}>
                  <b> {formattedTotalDebit}</b>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={3}>
                  <b> {formattedTotalCredit}</b>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={4}>
                  <b> {balance}</b>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
        }}
      />
    </div>
  );
};
export default EditAbleProductTable;
