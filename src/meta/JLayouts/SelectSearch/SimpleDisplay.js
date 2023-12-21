import React, { useState, useEffect, useCallback } from "react";
import { Select } from "antd";
import jwtAxios from "meta/services/auth/jwt-api";
import errorHandler from "meta/services/auth/errorHandler";

const { Option } = Select;
// className of Search Select  propClassName = "select-set-r" propClassName = "select-set-l";
function SimpleSearch({
  fields,
  route,
  columns,
  placeholder = "",
  selectProps = {},
  otherParams = {},
  value = "_id",
  where = null,
  handleSelect = () => {},
  other = {},
  query = "",
  propClassName = "",
}) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (value) => {
    setLoading(true);
    let params = { q: value, fields, otherParams, where };
    try {
      const res = await jwtAxios.get(route, { params });
      const data = res.data.result;
      setOptions(data);
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Select
      showSearch
      placeholder={placeholder}
      // onFocus={handleSearch}
      {...selectProps}
      popupClassName={propClassName}
      onSearch={handleSearch}
      onSelect={(value) => handleSelect(value, options, other)}
      notFoundContent={loading ? <span>Loading...</span> : "No data found"}
      filterOption={false}
      style={{ width: "100%" }}
      allowClear
      loading={loading}
    >
      {options?.length === 0 ? (
        <Option key="no-data" value="no-data" disabled>
          ...start typing
        </Option>
      ) : (
        options?.map((data, i) => (
          <Option key={data._id} value={data[value]}>
            {columns?.map((col, i) =>
              col.accessor ? col.accessor(data) : data[col.field]
            )}
          </Option>
        ))
      )}
    </Select>
  );
}

export default SimpleSearch;
