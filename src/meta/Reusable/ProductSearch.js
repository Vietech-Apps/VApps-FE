import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Col, Divider, Row, Select, Tag } from "antd";
import jwtAxios from "meta/services/auth/jwt-api";

const { Option } = Select;

const ProductSearchWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

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

function ProductSearch({ handleSelect, selectProps }) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let params = { q: searchTerm, fields: "code,name,make,cuId" };
      try {
        const res = await jwtAxios.get(`erp/products/search`, { params });
        const data = res.data.result;
        setOptions(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchTerm]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };
  const calculateTotalQuantity = (items) => {
    return items?.reduce((total, item) => total + item.quantity, 0);
  };
  return (
    <ProductSearchWrapper>
      <Select
        {...selectProps}
        showSearch
        placeholder="Search products"
        onSearch={handleSearch}
        onSelect={(value) => handleSelect(value, options)}
        notFoundContent={loading ? <span>Loading...</span> : null}
        filterOption={false}
        style={{ width: "100%" }}
        allowClear
        loading={loading}
        dropdownRender={(menu) => (
          <div style={{ overflowX: "scroll" }}>
            <StyledRow>
              <StyledCol xs={2}>Id {options?.length}</StyledCol>
              <StyledCol xs={3}>Code </StyledCol>
              <StyledCol xs={12}>Name</StyledCol>
              <StyledCol xs={3}>Make </StyledCol>

              <StyledCol xs={2}>Price</StyledCol>
              <StyledCol xs={1}>Disc</StyledCol>
              <StyledCol xs={1}>Ava</StyledCol>
            </StyledRow>
            <Divider style={{ margin: "2px 0" }} />
            {menu}
          </div>
        )}
      >
        {options?.map((data, i) => (
          <Option key={data._id} value={data._id}>
            <StyledRow>
              <StyledCol xs={2}>{data.cuId}</StyledCol>
              <StyledCol xs={3}>{data.code}</StyledCol>
              <StyledCol
                xs={12}
                style={
                  {
                    // overflow: "hidden",
                    // textOverflow: "ellipsis",
                    // whiteSpace: "nowrap",
                  }
                }
              >
                {data.name}
              </StyledCol>
              <StyledCol xs={3}>{data.make?.title}</StyledCol>

              <StyledCol xs={2}>{data.purchasePrice}</StyledCol>
              <StyledCol xs={1}>{data.purchaseDiscount}</StyledCol>
              <StyledCol xs={1}>
                <Tag
                // color={
                //   data.qty > 0
                //     ? data.qty
                //     : calculateTotalQuantity(data?.inventory)
                //     ? "green"
                //     : "red"
                // }
                >
                  {/* {`${
                  data.qty > 0
                    ? data.qty
                    : calculateTotalQuantity(data?.inventory) < 1
                    ? "Out Of Stock"
                    : "On Hand"
                } ${
                  data.qty > 0
                    ? data.qty
                    : calculateTotalQuantity(data?.inventory)
                }`}*/}
                  {data.qty}
                </Tag>
              </StyledCol>
            </StyledRow>
          </Option>
        ))}
      </Select>
    </ProductSearchWrapper>
  );
}

export default ProductSearch;
