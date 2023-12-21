import React, { useState, useEffect } from "react";
import { Select } from "antd";
import jwtAxios from "meta/services/auth/jwt-api";

const { Option } = Select;

const SelectSearch = ({
  route,
  onBlur,
  onSelect,
  autoFocus,
  otherProps,
  record,
}) => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(" ");
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false);
  let { fields, selectProps, labels, values, customHandleSelect } = otherProps;
  useEffect(() => {
    setLoading(true);
    fetchAPI(search)
      .then((newData) => {
        setData(newData);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [search]);

  const fetchAPI = async (query) => {
    let params = query ? { q: query } : {};
    if (fields) {
      params.fields = fields;
    }
    const response = await jwtAxios.get(route, { params });
    return response.data.result;
  };

  const handleSelect = (val, options) => {
    let finalValue = val;
    if (customHandleSelect) {
      finalValue = customHandleSelect(val, options, record);
    }
    setValue(finalValue);
    if (onSelect) {
      onSelect(finalValue);
    }
  };

  const options = data.map((d) => (
    <Option key={d._id} value={d[values]}>
      {labels.map((prop) => d[prop]).join(" - ")}
    </Option>
  ));

  return (
    <Select
      {...selectProps}
      showSearch
      value={value}
      style={{ width: "100%" }}
      onBlur={onBlur}
      onSelect={(e) => handleSelect(e, data, record)}
      autoFocus={autoFocus}
      onSearch={setSearch}
      loading={loading}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {options}
    </Select>
  );
};

export default SelectSearch;
