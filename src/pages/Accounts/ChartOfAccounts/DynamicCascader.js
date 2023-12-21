import React, { useEffect, useState } from "react";
import { Cascader, Form } from "antd";
import jwtAxios from "meta/services/auth/jwt-api";
import errorHandler from "meta/services/auth/errorHandler";

const DynamicCascader = ({
  label,
  formProps,
  name,
  maxLevel,
  placeholder,
  onChange = null,
  setAccountsData,
  refresh = null,
}) => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [refresh]);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await jwtAxios.get(`erp/chartOfAccounts/all`);
      const data = buildAccountTree(response.data.result);
      setDataSource(data);
      setAccountsData(data);
      setLoading(false);
    } catch (error) {
      errorHandler(error);
      setLoading(false);
    }
  };

  const buildAccountTree = (data) => {
    const map = {};
    let node;
    const roots = [];
    for (let i = 0; i < data.length; i++) {
      map[data[i]._id] = i;
      data[i].children = [];
    }
    for (let i = 0; i < data.length; i++) {
      node = data[i];
      if (node.parent) {
        data[map[node.parent._id]].children.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
  };

  const generateCascaderOptions = (data, currentLevel) => {
    if (currentLevel > maxLevel) return null;
    return data.map((item) => ({
      value: item._id,
      label: `${item.code} ${item.name}`,
      disabled: item.selectAble || currentLevel >= maxLevel,
      children: generateCascaderOptions(item.children, currentLevel + 1),
    }));
  };

  function filter(inputValue, path) {
    return path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  }

  return (
    <Form.Item label={label} name={name} {...formProps}>
      <Cascader
        options={generateCascaderOptions(dataSource, 1)}
        onChange={onChange}
        style={{ width: "100%", margin: "16px" }}
        placeholder={placeholder}
        showSearch={{ filter }}
        changeOnSelect
        expandTrigger="hover"
        loading={loading}
      />
    </Form.Item>
  );
};

export default DynamicCascader;
