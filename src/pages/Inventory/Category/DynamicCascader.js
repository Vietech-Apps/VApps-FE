import React, { useEffect, useState } from "react";
import { Cascader } from "antd";
import jwtAxios from "meta/services/auth/jwt-api";
import errorHandler from "meta/services/auth/errorHandler";

const DynamicCascader = ({
  maxLevel,
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
      const response = await jwtAxios.get(`erp/category/all`);
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
      label: `${item.name}`,
      disabled: currentLevel >= maxLevel,
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
    <Cascader
      options={generateCascaderOptions(dataSource, 1)}
      onChange={onChange}
      style={{ width: "100%", margin: "16px" }}
      placeholder="Please select"
      showSearch={{ filter }}
      changeOnSelect
      expandTrigger="hover"
      loading={loading}
    />
  );
};

export default DynamicCascader;
