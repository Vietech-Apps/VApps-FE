import { Table, Form, Input, InputNumber } from "antd";

import { useState } from "react";
import { StyledQuotationPanelTable } from "./index.styled";
function QuotationPanelTable({ form, setSubTotal, panels }) {
  const [editingRow, setEditingRow] = useState(null);

  setSubTotal(
    panels?.reduce((n, { unitPrice, qty }) => n + unitPrice * qty, 0)
  );

  const columns = [
    { title: "Sr.#", render: (key, r, index) => index + 1, width: "3%" },
    {
      title: "Detail",
      dataIndex: "name",
      width: "30%",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter your name",
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },

    {
      title: "Unit",
      width: "3%",
      dataIndex: "unit",
      render: (text, record, index) => {
        return <p>{panels[index]?.qty == 1 ? "No." : "Nos."}</p>;
      },
    },
    {
      title: "Qty",
      dataIndex: "qty",
      width: "5%",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item name="qty">
              <InputNumber />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      width: "10%",
      render: (text, record, index) => {
        if (editingRow === record.key) {
          return (
            <Form.Item name="unitPrice">
              <InputNumber />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Total Price",
      dataIndex: "total",
      width: "10%",
      render: (text, record, index) => {
        if (editingRow === record.key) {
          return (
            <Form.Item name="total">
              <InputNumber />
            </Form.Item>
          );
        } else {
          return <p>{record.unitPrice * record.qty}</p>;
        }
      },
    },
    // {
    //   title: "Actions",
    //   width: "7%",
    //   render: (_, record) => {
    //     return (
    //       <>
    //         <Button
    //           type="link"
    //           onClick={() => {
    //             setEditingRow(record.key);
    //             form.setFieldsValue({
    //               name: record.name,
    //               address: record.address,
    //             });
    //           }}
    //         >
    //           Edit
    //         </Button>
    //         <Button type="link" htmlType="submit">
    //           Save
    //         </Button>
    //       </>
    //     );
    //   },
    // },
  ];

  return (
    <div className="App">
      <Form form={form}>
        <StyledQuotationPanelTable
          columns={columns}
          bordered
          dataSource={panels}
          size="small"
          pagination={false}
          rowKey={(key) => key._id}
        />
      </Form>
    </div>
  );
}

export default QuotationPanelTable;
