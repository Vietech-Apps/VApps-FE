import { Form, Select } from "antd";
import errorHandler from "meta/services/auth/errorHandler";
import { useGetData } from "meta/services/auth/ezAPI";
import jwtAxios from "meta/services/auth/jwt-api";
import successHandler2 from "meta/services/auth/successHandle2";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";

const { Option } = Select;

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #f0f0f0;

  & td,
  & th {
    border: 1px solid #f0f0f0;
    padding: 2px;
  }

  & tbody td {
    text-align: center;
  }
  & thead {
    background-color: #f0f0f0;
  }
`;

const StyledSelect = styled(Select)`
  width: 100%;
`;

const InventoryData = ({ form, data }) => {
  const [{ apiData: warehouse }] = useGetData(`erp/Warehouse/withBin`, []);
  const { id } = useParams();
  const [stock, setStock] = useState({});
  useEffect(() => {
    const savedValues = data?.inventory?.reduce((acc, curr) => {
      if (curr.isDefault) {
        acc[curr.warehouse] = curr.binLocation;
      }
      return acc;
    }, {});
    const calculateStock = () => {
      const newStock = {};
      data.inventory.forEach((item) => {
        const warehouseId = item.warehouse.toString();
        const quantity = item.quantity || 0;
        if (newStock[warehouseId]) {
          newStock[warehouseId] += quantity;
        } else {
          newStock[warehouseId] = quantity;
        }
      });
      setStock(newStock);
    };
    calculateStock();
    form.setFieldsValue(savedValues);
  }, [data, form]);

  const handleSelect = async (binLocationId, warehouseId) => {
    try {
      const response = await jwtAxios.put(
        `erp/product/Inventory/update/${id}`,
        {
          warehouse: warehouseId,
          binLocation: binLocationId,
        }
      );
      successHandler2(response);
    } catch (error) {
      errorHandler(error);
    }
  };
  console.log(data);
  return (
    <StyledTable>
      <thead>
        <tr>
          <th>Warehouse Name</th>
          <th>Warehouse Code</th>
          <th>Stock</th>
          <th>Bin Location</th>
        </tr>
      </thead>
      <tbody>
        {warehouse?.map((w) => (
          <tr key={w._id}>
            <td>{w.title}</td>
            <td>{w.warehouseCode}</td>
            <td>{stock[w._id.toString()] || 0}</td>
            <td>
              <Form.Item name={w._id}>
                <StyledSelect
                  onChange={(binLocationId) =>
                    handleSelect(binLocationId, w._id)
                  }
                >
                  {w.bins.map((bin) => (
                    <Option key={bin._id} value={bin._id}>
                      {bin.binLocationCode}
                    </Option>
                  ))}
                </StyledSelect>
              </Form.Item>
            </td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default InventoryData;
