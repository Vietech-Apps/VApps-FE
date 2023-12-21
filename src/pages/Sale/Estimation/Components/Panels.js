import {
  Badge,
  Button,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Select,
  Space,
  Tag,
  Tooltip,
} from "antd";
import ReactDragListView from "react-drag-listview";
import jwtAxios from "meta/services/auth/jwt-api";
import React, { useContext, useEffect, useRef, useState } from "react";
import CuFeProd from "./CuFeP";
import { GrDrag } from "react-icons/gr";

import { IoDuplicateOutline } from "react-icons/io5";
import { useAuthUser } from "meta/utility/AuthHooks";
import { Rs, NetPanel } from "meta/Reusable/CalcData";
import { StyledTable } from "../index.styled";

import errorHandler from "meta/services/auth/errorHandler";
import successHandler2 from "meta/services/auth/successHandle2";
import { SaveOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
import AddPanel from "./AddPanel";
import { useParams } from "react-router-dom";
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
  type,
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
  const { Option } = Select;
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
        style={{
          marginBottom: "0px",
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        {type == "0" ? (
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        ) : type == "2" ? (
          <InputNumber ref={inputRef} onPressEnter={save} onBlur={save} />
        ) : type == "1" ? (
          <Select ref={inputRef} onBlur={save}>
            <Option value="LV">LV</Option>
            <Option value="MV">MV</Option>
            <Option value="PDB">PDB</Option>
            <Option value="LDB">LDB</Option>
            <Option value="DB">DB</Option>
            <Option value="BTD">BTD</Option>
            <Option value="Cable Tray">Cable Tray</Option>
          </Select>
        ) : type == "3" ? (
          <Select placeholder="Type" ref={inputRef} onBlur={save}>
            <Option value={"GISheet"}>GI Sheet</Option>
            <Option value={"GIPowderCoated"}>GI Powder Coated</Option>
            <Option value={"MSPowderCoated"}>MS Powder Coated</Option>
            <Option value={"HotDipGalvanized"}>Hot Dip Galvanized</Option>
            <Option value={"ss304"}>SS [304]</Option>
            <Option value={"ss316"}>SS [316]</Option>
          </Select>
        ) : (
          type == "4" && (
            <Select placeholder="Type" ref={inputRef} onBlur={save}>
              <Option value={"impTin"}>Imported (Tin)</Option>
              <Option value={"impSleeve"}>Imported (Sleeve)</Option>
              <Option value={"localTin"}>Local (Tin)</Option>
              <Option value={"localSleeve"}>Local (Sleeve)</Option>
              <Option value={"localBoth"}>Local (Both)</Option>
            </Select>
          )
        )}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};
const Panels = ({ form, panels, setPanels, estimation, setEstimation }) => {
  const { id } = useParams();
  const handleDelete = async (key) => {
    const response = await jwtAxios.delete(`erp/panel/delete/${key._id}`);
    if (response.data.success == true) {
      const newData = panels?.filter((item) => item._id !== key._id);
      setPanels(newData);
      message.success("Deleted");
    }
  };
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Saved");
  const [whatClick, setWhatClick] = useState();
  const panelSave = async (p) => {
    setWhatClick(p._id);
    setMessage("Saving");
    setLoading(true);

    try {
      const response = await jwtAxios.put(`erp/panel/update/${p?._id}`, p);
      setPanels((prevPanels) => {
        const updatedPanels = prevPanels.map((panel) => {
          if (panel._id === p._id) {
            return response.data.result;
          }
          return panel;
        });
        return updatedPanels;
      });
      const values = form.getFieldsValue();

      const estimation = await jwtAxios.put(`erp/estimation/update/${id}`, {
        ...values,
      });
      setEstimation(estimation.data.result);

      setLoading(false);
      setMessage("Saved");
      successHandler2(response);
    } catch (error) {
      errorHandler(error);
      setLoading(false);
    }
  };
  const defaultColumns = [
    {
      title: "Id",
      render: (key, record, index) => index + 1,
      width: "1%",
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "25%",
      type: "0",
      editable: true,
    },
    {
      title: "Type",
      dataIndex: "type",
      type: "1",
      width: "14%",
      editable: true,
    },
    {
      title: "Sheet Type",
      dataIndex: "sheetType",
      type: "3",
      width: "14%",
      editable: true,
    },
    {
      title: "Copper Type",
      dataIndex: "copperType",
      type: "4",
      width: "14%",
      editable: true,
    },
    {
      title: "Qty",
      width: "5%",
      dataIndex: "qty",
      type: "2",
      editable: true,
    },

    {
      title: "Est.",
      width: "10%",
      render: (r, p) => (
        <Tag color="default">
          <b>{Rs(p?.panelCost)}</b>
        </Tag>
      ),
    },
    {
      title: "operation",
      width: "17%",
      dataIndex: "operation",
      render: (_, record, index) =>
        panels?.length >= 1 ? (
          <Space wrap>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record)}
            >
              <DeleteOutlined />
            </Popconfirm>

            <AddPanel
              isCreate={false}
              panels={panels}
              setPanels={setPanels}
              selectedData={record}
            />
            {selectedRowKeys?.length > 0 &&
              cut == false &&
              isCopy == false &&
              selectedRowKeys.includes(record._id) && (
                <Tooltip title={"Duplicate Panel"}>
                  <Button
                    icon={<IoDuplicateOutline />}
                    onClick={() => onDuplicate(record, index)}
                  ></Button>
                </Tooltip>
              )}
            <a className="drag-handle" href="#">
              <GrDrag />
            </a>
            <Badge count={record?.save || 0} overflowCount={99}>
              {record.save && record.save > 0 && (
                <Button
                  type="primary"
                  shape="round"
                  icon={<SaveOutlined />}
                  onClick={() => panelSave(record)}
                  loading={whatClick == record._id && loading}
                  disabled={record.isComplete}
                >
                  Save
                </Button>
              )}
            </Badge>
          </Space>
        ) : null,
    },
  ];

  const { user } = useAuthUser();
  const onDuplicate = async () => {
    selectedRow?.map(async (p) => {
      let newData = {
        qty: p.qty,
        panelCount: panels?.length + 1,
        inquiry: p.inquiry,
        estimation: p.estimation,
        type: p.type,
        label: p.label,
        detail: p.detail,
        industryType: p.industryType,
        name: p.name,
        makeId: p.makeId,
        modelId: p.modelId,
        createdBy: user._id,
        products: p.products,
        order: panels?.length + 1,
        sPrice: p.sPrice,
        height: p.height,
        thickness: p.thickness,
        mainEnclosure: p.mainEnclosure,
        copperCost: p.copperCost,
        sheetCost: p.sheetCost,
        pCost: p.pCost,
        aCost: p.aCost,
        wCost: p.wCost,
        accessories: p.accessories,
        pfiEnclosure: p.pfiEnclosure,
        busbar: p.busbar,
        drop: p.drop,
        cPrice: p.cPrice,
        currency: p.currency,
        panelCost: p.panelCost,
      };
      try {
        const response = await jwtAxios.post("erp/panel/create", newData);
        if (response.data.success == true) {
          setPanels([...panels, response.data.result]);
          message.success("Duplicated successfully");
          setSelectedRow([]);
          setSelectedRowKeys([]);
        }
      } catch (error) {
        console.log(error);
      }
    });
  };
  const [product, setProduct] = useState();

  const handleSave = async (row) => {
    const newData = [...panels];
    const index = newData.findIndex((item) => row.order === item.order);
    const item = newData[index];

    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setPanels(newData);
    try {
      await jwtAxios.put(`erp/panel/update/${item?._id}`, row);
    } catch (error) {
      console.log(error);
    }
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
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
        type: col.type,
        handleSave,
      }),
    };
  });
  const [isCopy, setIsCopy] = useState(false);
  const [copied, setCopied] = useState();
  const [cut, setCut] = useState(false);

  const expandedRowRender = (e) => {
    return (
      <CuFeProd
        setMessage={setMessage}
        estimation={estimation}
        setEstimation={setEstimation}
        key={e._id}
        form={form}
        panels={panels}
        setPanels={setPanels}
        panelDetail={e}
        setCopied={setCopied}
        copied={copied}
        setIsCopy={setIsCopy}
        isCopy={isCopy}
        setCut={setCut}
        cut={cut}
        setProduct={setProduct}
        product={product}
      />
    );
  };

  const onSelectChange = (newSelectedRowKeys, record) => {
    setSelectedRow(record);
    setSelectedRowKeys(newSelectedRowKeys);
    setIsCopy(false);
    setCut(false);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
      const data = [...panels];
      const item = data?.splice(fromIndex, 1)[0];
      data.splice(toIndex, 0, item);
      handleUpdate(data);
      setPanels(data);
    },
    handleSelector: "a",
  };
  const handleUpdate = async (order) => {
    await jwtAxios.put(`erp/panelorder/update`, { order });
  };
  return (
    <>
      {panels?.length > 0 && (
        <ReactDragListView {...dragProps}>
          <StyledTable
            cardBordered
            toolbar={false}
            search={false}
            reset={false}
            refresh={false}
            options={{
              setting: false,
              search: false,
              density: false,
              reset: false,
              refresh: false,
              fullScreen: true,
            }}
            rowSelection={rowSelection}
            expandable={{
              expandedRowRender,
            }}
            components={components}
            rowClassName={(record, index) =>
              `row-color-${index % 2 === 0 ? 0 : 1}`
            }
            dataSource={panels}
            columns={columns}
            rowKey={(e) => e._id}
            size="small"
            tableAlertRender={false}
            showHeader={false}
            pagination={false}
          />
        </ReactDragListView>
      )}
    </>
  );
};
export default Panels;
