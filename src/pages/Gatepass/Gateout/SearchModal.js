import {
  Button,
  Form,
  Modal,
  Table,
  Input,
  InputNumber,
  message,
  Space,
} from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import SearchPo from "../../../meta/JLayouts/SelectSearch/TableDisplay";
import { v4 as uuidv4 } from "uuid";
import { ProTable } from "@ant-design/pro-components";
import jwtAxios from "meta/services/auth/jwt-api";
import errorHandler from "meta/services/auth/errorHandler";
import SelectSearch from "../../../meta/JLayouts/SelectSearch/TableDisplay";
import {
  CheckSquareFilled,
  CheckSquareTwoTone,
  CloseSquareTwoTone,
} from "@ant-design/icons";
import getColumnSearchProps from "meta/Reusable/getColumnSearchProps";

const SearchModal = ({ dataSources, setDataSources, open, setOpen }) => {
  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState();
  const handleOk = () => {
    setLoading(true);
    let filterd = dataSource?.filter((d) => d.coming !== 0);
    let newData = filterd
      .filter((d) => {
        const isProductExists = dataSources.some(
          (existingData) =>
            existingData.productId === d.productId && existingData.po === d.po
        );
        return !isProductExists;
      })
      .map((d) => ({
        ...d,
        deliveredQty: d.deliveredQty + d.coming,
        remainQty: d.qty - d.coming,
        deliveredStatus: d.qty === d.deliveredQty + d.coming ? "D" : "P.D",
      }));
    try {
      // Make the necessary API request or update logic here
      // const response = jwtAxios.put(
      //   `erp/RFQ/delivered/${dataSource[0]?.cuId}`,
      //   {
      //     data: newData,
      //     deliveredStatus: isPartialDelivered ? "Partial Delivered" : "Delivered",
      //   }
      // );
      if (newData.length > 0) {
        setDataSources([...dataSources, ...newData]);
      }
      setDataSource([]);
      setLoading(false);
      setOpen(false);
      setValue(null);
    } catch (error) {
      setLoading(false);
      setValue(null);
      errorHandler(error);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const EditableContext = React.createContext(null);
  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };
  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);
    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };
    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({
          ...record,
          ...values,
        });
      } catch (errInfo) {
        console.log("Save failed:", errInfo);
      }
    };
    let childNode = children;
    if (editable) {
      childNode = editing ? (
        <Form.Item
          name={dataIndex}
          // rules={[
          //   {
          //     required: true,
          //     message: `${title} is required.`,
          //   },
          // ]}
          style={{ marginBottom: "0px" }}
        >
          <InputNumber
            ref={inputRef}
            onPressEnter={save}
            onBlur={save}
            min={0}
            max={record.qty - record.deliveredQty}
          />
        </Form.Item>
      ) : (
        <div className="editable-cell-value-wrap" onClick={toggleEdit}>
          {children}
        </div>
      );
    }
    return <td {...restProps}>{childNode}</td>;
  };
  const [dataSource, setDataSource] = useState([]);
  const handleSelect = async (value, options) => {
    setDataSource([]);
    if (dataSources?.find((d) => d.po == value)) {
      message.info("P.O already in this GateIn");
    } else {
      const selectedOptions = options?.find((p) => p._id == value);
      let newSelectedOption = selectedOptions?.products
        ?.filter((d) => d.deliveredStatus !== "Delivered")
        ?.map((selectedOption) => ({
          key: uuidv4(),
          poCuId: selectedOptions?.cuId,
          qty: selectedOption?.qty || 1,
          name: selectedOption?.name,
          code: selectedOption?.code,
          po: value,
          _id: selectedOption?._id,
          productId: selectedOption?.productId,
          deliveredQty: selectedOption?.deliveredQty || 0,
          remainQty: selectedOption?.remainQty || 0,
          deliveredStatus: selectedOption?.deliveredStatus,
          coming:
            selectedOption?.qty - selectedOption?.deliveredQty ||
            selectedOption.qty ||
            0,
        }));
      setDataSource([...dataSource, ...newSelectedOption]);
    }
  };

  // const handleSelect = async (value, options) => {
  //   const existingProducts = dataSources.filter((item) => item.po == value);
  //    const product = options.find((item) => item.po == value);
  //   let newSelectedOption = [];
  //   for (const option of options) {
  //     for (const selectedOption of existingProducts) {
  //       const isExistingProduct = existingProducts.some(
  //         (item) =>
  //           item.productId === selectedOption.productId && item.po === value
  //       );
  //       if (selectedOption.deliveredStatus !== "D" && !isExistingProduct) {
  //         newSelectedOption.push({
  //           key: uuidv4(),
  //           poCuId: option.cuId,
  //           qty: selectedOption.qty || 1,
  //           name: selectedOption.name,
  //           code: selectedOption.code,
  //           po: value,
  //           _id: selectedOption._id,
  //           productId: selectedOption.productId,
  //           deliveredQty: selectedOption.deliveredQty || 0,
  //           remainQty: selectedOption.remainQty || 0,
  //           deliveredStatus: selectedOption.deliveredStatus,
  //           coming:
  //             selectedOption.qty - selectedOption.deliveredQty ||
  //             selectedOption.qty ||
  //             0,
  //         });
  //       }
  //     }
  //   }

  //   if (newSelectedOption.length === 0) {
  //     message.info("No new products to add");
  //     return;
  //   }

  //   setDataSource(newSelectedOption);
  // };
  const handlePush = (e, onCleanSelected) => {
    const dnew = e.map((d) => ({ ...d, check: true }));

    const isProductExists = dataSources.some((existingData) =>
      e.some(
        (newData) =>
          newData.productId === existingData.productId &&
          newData.po === existingData.po
      )
    );

    if (isProductExists) {
      message.info("Product already exists.");
    } else {
      setDataSources([...dataSources, ...dnew]);
      setDataSource((prevDataSource) => {
        const updatedDataSource = [...prevDataSource];
        e.forEach((newData, index) => {
          if (updatedDataSource[index]) {
            updatedDataSource[index] = {
              ...updatedDataSource[index],
              ...newData,
              check: true,
            };
          }
        });
        return updatedDataSource;
      });
    }

    onCleanSelected();
  };
  const handleRemove = (e, onCleanSelected) => {
    const dnew = e.filter((d) => dataSources.some((c) => c.key !== d.key));
    const dnews = dnews.map((c) => ({ ...c, check: false }));
    setDataSources(dnew);
    setDataSource(dnews);

    onCleanSelected();
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  let defaultColumns = [
    {
      title: "Code",
      dataIndex: "code",
      width: "10%",
      type: 2,
      ...getColumnSearchProps("code", false),
    },

    {
      title: "Item",
      dataIndex: "name",
      width: "30%",
      ...getColumnSearchProps("name", false),
      type: 2,
    },

    {
      title: "Unit",
      dataIndex: "unit",
      type: 1,
    },

    {
      title: "QTY",
      dataIndex: "qty",
      type: 2,
    },
    {
      title: "Deliv.QTY",
      dataIndex: "deliveredQty",

      type: 2,
    },
    {
      title: "Remain QTY",
      render: (_, key) => key.qty - key.deliveredQty - key.coming,
      type: 2,
    },
    {
      title: "New-In",
      dataIndex: "coming",
      editable: true,
      width: "15%",
      type: 2,
    },
    {
      title: "",
      render: (_, e) => (
        <Space.Compact block>{e.check && <CheckSquareTwoTone />}</Space.Compact>
      ),
    },
    Table.SELECTION_COLUMN,
  ];
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
  function calculateTotal(products) {
    let total = 0;
    for (let i = 0; i < products.length; i++) {
      if (products[i].deliveredStatus !== "D") {
        total += products[i].remainQty || products[i].qty;
      }
    }
    return total;
  }

  return (
    <>
      <Modal
        open={open}
        title="Title"
        width={1100}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            {dataSource.filter((d) => d.qty !== d.deliveredQty + d.coming)
              ?.length >= 1
              ? "Partial"
              : "All"}{" "}
            Received
          </Button>,
          //   <Button
          //     key="link"
          //     type="primary"
          //     loading={loading}
          //     onClick={handleOk}
          //   >
          //     Paritailly Received
          //   </Button>,
        ]}
      >
        <SelectSearch
          fields={"cuId"}
          route={`erp/PO/searchND`}
          columns={[
            { label: "Id", size: 5, field: "cuId" },
            { label: "Created Date", size: 5, field: "poDate" },
            {
              label: "Products",
              size: 2,
              accessor: (data) => calculateTotal(data.products),
            },
            {
              label: "ExpectedArrival Date",
              size: 5,
              field: "expectedArrival",
            },
            { label: "Delivered Status", size: 2, field: "deliveredStatus" },
          ]}
          placeholder="search POs"
          handleSelect={handleSelect}
        />
        <ProTable
          toolBarRender={false}
          search={false}
          dataSource={dataSource}
          pagination={false}
          components={components}
          size="small"
          rowKey={(r) => r.key}
          rowSelection={{
            selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
            // defaultSelectedRowKeys: [1],
          }}
          tableAlertRender={({
            selectedRowKeys,
            selectedRows,
            onCleanSelected,
          }) => {
            console.log(selectedRows, selectedRows);
            return (
              <Space size={24}>
                <span>
                  selected {selectedRowKeys?.length} items
                  <Button
                    type="link"
                    onClick={() => handlePush(selectedRows, onCleanSelected)}
                  >
                    Add Selected Item in GateIn
                  </Button>
                  <Button
                    type="link"
                    onClick={() => handleRemove(selectedRows, onCleanSelected)}
                  >
                    Reomve Selected Item from gatein
                  </Button>
                </span>
              </Space>
            );
          }}
          columns={columns}
        />
      </Modal>
    </>
  );
};
export default SearchModal;
