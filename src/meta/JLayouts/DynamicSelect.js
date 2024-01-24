import React, { useState } from "react";
import { Form, Input, Select, Divider, Space, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useGetData } from "meta/services/auth/ezAPI";
import { postAndGetData } from "meta/common/Apis";

const DynamicSelect = ({
  endpoint,
  path = "meta/label",
  formProps,
  mode = null,
  name,
  label,
  onChange,
}) => {
  const [{ apiData: items }, { setData: setItems }] = useGetData(
    endpoint ? `${path}/list?type=${endpoint}` : `${path}/list`,
    []
  );

  const [newItemTitle, setNewItemTitle] = useState("");
  const addNewItem = (e) => {
    e.preventDefault();
    postAndGetData(
      endpoint ? `${path}/create?type=${endpoint}` : `${path}/create`,
      { title: newItemTitle },
      items,
      setItems
    );
    setNewItemTitle("");
  };

  return (
    <Form.Item name={name} label={label} {...formProps}>
      <Select
        bordered={true}
        mode={mode}
        placeholder={`Select a ${label}`}
        onChange={onChange}
        dropdownRender={(menu) => (
          <>
            {menu}
            <Divider style={{ margin: "8px 0" }} />
            <Space align="center" style={{ padding: "0 8px 4px" }}>
              <Input
                placeholder={`Or Create New`}
                value={newItemTitle}
                onChange={(e) => setNewItemTitle(e.target.value)}
              />
              <Typography.Link
                onClick={addNewItem}
                style={{ whiteSpace: "nowrap" }}
              >
                <PlusOutlined /> Add {label}
              </Typography.Link>
            </Space>
          </>
        )}
      >
        {items?.map((item) => (
          <Select.Option key={item._id} value={item._id}>
            {item.title}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default DynamicSelect;
