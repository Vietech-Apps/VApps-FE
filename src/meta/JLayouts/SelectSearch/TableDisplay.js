import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Col, Divider, Form, Row, Select, Tag } from "antd";
import jwtAxios from "meta/services/auth/jwt-api";
import errorHandler from "meta/services/auth/errorHandler";

const { Option } = Select;

const StyledRow = styled(Row)`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10px;
`;

const StyledCol = styled(Col)`
  padding: 0 10px;
  flex-basis: 0;
  flex-grow: 1;
  max-width: 100%;
`;
const StyledSelect = styled(Select)`
  .ant-select-selector .ant-select-selection-placeholder {
    text-transform: capitalize;
  }
`;
const StyledCol2 = styled(Col)`
  padding: 0 10px;
  flex-basis: 0;
  flex-grow: 1;
  max-width: 100%;
  display: flex;
  align-items: center;
`;

function SelectSearch({
  fields,
  route,
  label,
  name,
  columns,
  placeholder = "",
  selectProps = {},
  formProps,
  otherParams = {},
  newComponent,
  mode,
  value = "_id",
  where = null,
  handleSelect = () => {},
  other = {},
  string = false,
}) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    if (string !== false) {
      setSearchTerm(string);
    }
  }, [string]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let params = {
        q: searchTerm,
        fields,
        otherParams,
        where,
      };
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
    fetchData();
  }, [searchTerm]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  return (
    <Form.Item label={label} name={name} {...formProps}>
      <StyledSelect
        showSearch
        mode
        placeholder={placeholder}
        {...selectProps}
        onSearch={handleSearch}
        onSelect={(value) => handleSelect(value, options, other)}
        notFoundContent={loading ? <span>Loading...</span> : "No data found"}
        filterOption={false}
        style={{ width: "100%" }}
        allowClear
        loading={loading}
        dropdownRender={(menu) => (
          <div style={{ overflowX: "scroll" }}>
            <StyledRow>
              {columns?.map((col, i) => (
                <StyledCol2 xs={col.size} key={i}>
                  {i === 0 && newComponent} {col.label}
                </StyledCol2>
              ))}
            </StyledRow>
            <Divider style={{ margin: "2px 0" }} />
            {menu}
          </div>
        )}
      >
        {options.length === 0 ? (
          <Option key="no-data" value="no-data" disabled>
            No data found
          </Option>
        ) : (
          options?.map((data, i) => (
            <Option key={data._id} value={data._id}>
              <StyledRow>
                {columns?.map((col, i) => (
                  <StyledCol xs={col.size} key={i}>
                    {col.accessor ? col.accessor(data) : data[col.field]}
                  </StyledCol>
                ))}
              </StyledRow>
            </Option>
          ))
        )}
      </StyledSelect>
    </Form.Item>
  );
}

export default SelectSearch;
