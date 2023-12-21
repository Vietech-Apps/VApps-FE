import { Form, Select, Space, Typography } from "antd";
import ModalWithFormChild from "meta/Reusable/ModalWithFormChild";
import { useGetData } from "meta/services/auth/ezAPI";
import CreateContact from "pages/apps/Customers/Component/Create/CreateContact";
import React, { useEffect } from "react";
const { Text } = Typography;
const Vendor = ({
  form,
  selectedCustomer,
  setSelectedCustomer,
  data,
  handleSubmit = () => {},
  modal = false,
}) => {
  const [{ apiData: customers, loading }, { setRefreshing }] = useGetData(
    "meta/contact/vendor",
    [],
    { isVendor: true }
  );

  const SelectCustomer = (e) => {
    let filterCustomer = customers?.filter((d) => d._id == e);
    setSelectedCustomer(filterCustomer[0]);
    if (!modal) {
      handleSubmit("Save");
    }
  };
  useEffect(() => {
    if (data && !modal) {
      setSelectedCustomer(data?.vendor);
      form.setFieldsValue({
        vendor: data?.vendor?._id,
      });
    }
  }, [data]);
  return (
    <div style={{ display: "flex", alignItems: "flex-start" }}>
      <Form.Item
        name="vendor"
        label={"Vendor"}
        style={{ width: "100%" }}
        className="select-add"
        rules={[
          {
            required: true,
            message: "Search & select vendor!",
          },
        ]}
        extra={
          <Space size={1}>
            {selectedCustomer?.address ? (
              <Text copyable>{selectedCustomer?.address}</Text>
            ) : (
              ""
            )}
            {selectedCustomer?.email ? (
              <Text copyable>{selectedCustomer?.email}</Text>
            ) : (
              ""
            )}
            {selectedCustomer?.phone ? (
              <Text copyable>{selectedCustomer?.phone}</Text>
            ) : (
              ""
            )}
          </Space>
        }
      >
        <Select
          loading={loading}
          // onClear={(e) => setIsCustomer(false)}
          style={{
            color: "#135200",
            fontSize: "24px",
            fontFamily: "sans-serif",
          }}
          placeholder="Search & select vendor"
          // labelInValue
          onChange={SelectCustomer}
          allowClear={true}
          showSearch
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {customers?.map((p, i) => (
            <Select.Option value={p._id} key={i}>
              {p.title}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <span>
        <ModalWithFormChild
          childern={<CreateContact modal={true} />}
          route={"meta/contact/create"}
          title={"Create a new Contact"}
          tooltip={"Create a new Contact"}
          setRefreshing={setRefreshing}
        />
      </span>
    </div>
  );
};

export default Vendor;
