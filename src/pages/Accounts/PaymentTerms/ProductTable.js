import { ProTable } from "@ant-design/pro-components";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Select,
  Table,
  message,
} from "antd";

import { v4 as uuidv4 } from "uuid";
import React, { useContext, useEffect, useRef, useState } from "react";
import { DeleteOutlined, DeleteTwoTone } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import SelectSearch from "meta/JLayouts/SelectSearch/TableDisplay";
import { StyledProTable } from "../Tax/index.styled";
import moment from "moment";

const ProductTable = ({ dataSource, setDataSource, selected }) => {
  const { id } = useParams();

  const columns = [
    {
      title: "%",
      dataIndex: "value",
      width: "20%",
      render: (value, record, index) => {
        return (
          <InputNumber
            defaultValue={value}
            style={{ width: "100%" }}
            size="medium"
            onBlur={(e) => handleSave(index, "value", e.target.value)}
            // formatter={(value) => value?.toFixed(6)}
            // parser={(value) => parseFloat(value)}
          />
        );
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      width: "20%",
      render: (value, record, index) => {
        return (
          <Select
            defaultValue={value}
            style={{ width: "100%" }}
            size="medium"
            value={value}
            onSelect={(e) => handleSave(index, "type", e)}
            options={[
              {
                label: "Fixed",
                value: "Pixed",
              },
              { label: "Percent", value: "Percent" },
            ]}
          />
        );
      },
    },
    {
      title: "Days",
      dataIndex: "days",
      width: "7%",
      render: (value, record, index) => {
        return (
          <InputNumber
            defaultValue={value}
            style={{ width: "100%" }}
            size="medium"
            onBlur={(e) => handleSave(index, "days", e.target.value)}
          />
        );
      },
    },

    {
      title: "Installment",
      width: "35%",
      dataIndex: "installmentDate",
      render: (c, r, i) => {
        return (
          <>
            {i + 1}# Installment{" "}
            {/* {r.type == "Percent" ? (1000 * r.value) / 100 : r.value} Due on{" "} */}
            {moment().add(r.days, "days").format("DD-MM-YYYY")}
          </>
        );
      },
    },
    {
      title: "",
      width: "5%",
      render: (_, record) => (
        <DeleteTwoTone
          onClick={() =>
            setDataSource((pre) => pre.filter((c) => c.key !== record.key))
          }
        />
      ),
    },
  ];
  const handleAdd = () => {
    const totalPercentage = dataSource?.reduce((sum, entry) => {
      return sum + parseFloat(entry.value);
    }, 0);

    const newData = {
      key: uuidv4(),
      value: parseFloat("100.0"),
      type: "Percent",
      days: dataSource?.length === 0 ? 0 : dataSource?.length * 30,
      duration: "numberOfDaysAfterInvoiceDate",
    };

    if (newData.type === "Fixed") {
      newData.value = 1000 - newData.value;
    }

    if (dataSource?.length > 0) {
      const difference = newData.value - totalPercentage;
      const modifiedData = { ...newData, value: difference };
      setDataSource([...dataSource, modifiedData]);
    } else {
      setDataSource([...dataSource, newData]);
    }
  };

  const handleSave = (row, column, value) => {
    const newData = [...dataSource];
    newData[row][column] = value;
    newData[row]["installmentDate"] = moment()
      .add(newData[row]["days"], "days")
      .format("DD-MM-YYYY");
    setDataSource(newData);
  };

  return (
    <div>
      <Table
        rowClassName={() => "editable-row"}
        search={false}
        toolBarRender={false}
        pagination={false}
        dataSource={dataSource}
        locale={{ emptyText: () => "" }}
        columns={columns}
        footer={() => (
          <div>
            <Button onClick={handleAdd}>Add A Row</Button>
          </div>
        )}
      />
    </div>
  );
};
export default ProductTable;
