import { Button, Table } from "antd";
import { StyledProductTable } from "meta/common/FormFeilds/index.styled";

import React, { useState } from "react";
import BankAccountModal from "./BankAccountModal";
import { DeleteOutlined } from "@ant-design/icons";

const BankAccount = ({ selectedData, bankAccounts, setBankAccounts }) => {
  const [open, setOpen] = useState(false);
  let columns = [
    {
      title: "Account Number",
      dataIndex: "accountNumber",
    },
    { title: "Bank", render: (c) => c.bank.name },
    {
      title: "Action",
      render: (c) => (
        <DeleteOutlined
          onClick={() =>
            setBankAccounts((d) => d.filter((e) => e._id !== c._id))
          }
        />
      ),
    },
  ];
  console.log(selectedData, bankAccounts);

  return (
    <React.Fragment>
      <StyledProductTable
        dataSource={bankAccounts}
        columns={columns}
        rowkey={(e) => e._id}
        summary={() => {
          return (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={2}>
                <Button
                  onClick={() => setOpen(true)}
                  type="primary"
                  // icon={<PlusOutlined />}
                >
                  Add a Line
                </Button>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          );
        }}
      />
      {open && (
        <BankAccountModal
          open={open}
          setOpen={setOpen}
          selectedData={selectedData}
          setBankAccounts={setBankAccounts}
          bankAccounts={bankAccounts}
        />
      )}
    </React.Fragment>
  );
};

export default BankAccount;
