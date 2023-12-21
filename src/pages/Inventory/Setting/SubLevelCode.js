import { Form, Select } from "antd";
import errorHandler from "meta/services/auth/errorHandler";

import jwtAxios from "meta/services/auth/jwt-api";
import React, { useEffect, useState } from "react";
import SubLevelTable from "./CodeTable";

const SubLevel = ({ data }) => {
  const [selected, setSelected] = useState();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      setSelected(data[0]);
    }
  }, [data]);
  const FetchData = async (e) => {
    if (e) {
      try {
        setLoading(true);
        const response = await jwtAxios.get(`erp/LevelCode/readById/${e}`);
        setDataSource(response.data.result);
        setLoading(false);
      } catch (error) {
        errorHandler(error);
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    FetchData(selected?._id);
  }, [selected]);

  const handleSelected = async (e) => {
    let dat = data?.filter((p) => p._id == e);
    setSelected(dat[0]);
  };
  return (
    <>
      <Form>
        <Form.Item
          label="Warehouse Sublevel"
          required
          tooltip="To generate codes for a warehouse sub-level, please select the sub-level and click on the 'Add Code' button. We highly recommend that you use the system-generated codes for accuracy and consistency"
        >
          <Select
            style={{ width: "100%" }}
            allowClear
            defaultValue={data.length > 0 ? data[0]._id : undefined}
            onSelect={(e) => handleSelected(e)}
            showSearch
          >
            {data
              ?.filter((p) => p.active)
              .map((d) => (
                <Select.Option key={d._id} value={d._id}>
                  {d.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
      </Form>

      {selected && (
        <SubLevelTable
          selected={selected}
          data={data}
          loading={loading}
          dataSource={dataSource}
          setDataSource={setDataSource}
        />
      )}
    </>
  );
};

export default SubLevel;
