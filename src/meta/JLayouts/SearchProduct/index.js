import { FilterOutlined } from "@ant-design/icons";
import { Select, Spin, Tooltip } from "antd";
import jwtAxios from "meta/services/auth/jwt-api";
import { useState } from "react";
import { StyledProductSearch } from "./index.style";
let timeout;
let currentValue;

const SearchInput = ({
  route,
  value,
  placeholder,
  fields,
  handleAddProduct,
  save,
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetch = (value, callback) => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }

    currentValue = value;
    let params = { q: value, fields: fields };
    const fake = async () => {
      setLoading(true);
      const response = await jwtAxios.get(route, { params });
      if (response.data?.success == true) {
        if (currentValue === value) {
          const result = response?.data?.result;
          setLoading(false);
          callback(result);
        }
      }
    };

    timeout = setTimeout(fake, 300);
  };

  const handleSearch = (newValue) => {
    if (newValue) {
      fetch(newValue, setData);
    } else {
      setData([]);
    }
  };

  const handleSelect = (e) => {
    const filterData = data[e.key];
    handleAddProduct(filterData);
  };

  const { Option } = Select;

  const options = data?.map((d, i) => (
    <Option key={i} value={d._id}>
      Name : {" " + d?.name ? <b>{d.name + " "}</b> : " N/A "}
      Code : {" " + d?.code ? <b>{d.code + " "}</b> : " N/A "}
      Price : {" " + d.purchasePrice ? <b>{d.purchasePrice + " "}</b> : " N/A "}
      Disc :
      {" " + d.purchaseDiscount ? <b>{d.purchaseDiscount + " "}</b> : " N/A "}
      Make : {" " + d.make?.title ? <b>{d.make?.title + " "}</b> : " N/A "}
    </Option>
  ));
  return (
    <Tooltip title={"Type product name"} color="cyan">
      <StyledProductSearch
        labelInValue
        showSearch
        style={{ width: "700px" }}
        value={value}
        placeholder={placeholder}
        defaultActiveFirstOption={false}
        filterOption={false}
        onSearch={handleSearch}
        onBlur={save}
        onSelect={handleSelect}
        notFoundContent={loading ? <Spin size="small" /> : null}
      >
        {options}
      </StyledProductSearch>
    </Tooltip>
  );
};

const SearchProduct = ({
  value,
  placeholder,
  route,
  handleAddProduct,
  fields,
  save,
}) => (
  <SearchInput
    placeholder={placeholder}
    value={value}
    route={route}
    handleAddProduct={handleAddProduct}
    fields={fields}
    save={save}
  />
);
// SearchProduct.displayName = "SearchProduct";

export default SearchProduct;
