import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Select,
  Divider,
  Form,
  Space,
  InputNumber,
  Tooltip,
  Input,
  Typography,
} from "antd";
import { getData, postAndGetData } from "meta/common/Apis";
import { getIconByName } from "meta/common/AppIcons";
import React, { useState } from "react";
import { useEffect } from "react";
import { PanelSum, Rs, wiringCost } from "meta/Reusable/CalcData";
const WiringCalc = ({ panelDetail, setPanels }) => {
  const [form] = Form.useForm();
  const wirings = Form.useWatch("wiring", form);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      wiring: panelDetail?.wiring,
    });
  }, []);

  useEffect(() => {
    if (wirings && wirings !== panelDetail.wiring) {
      isEditable &&
        setPanels((prevPanels) => [
          ...prevPanels.map((panel) => {
            if (panel._id === panelDetail._id) {
              const updatedPanel = {
                ...panel,
                wiring: wirings,
                wCost: wiringCost(wirings),
                save: (panel.save || 0) + 1,
              };
              const panelCost = PanelSum(updatedPanel);
              return {
                ...updatedPanel,
                panelCost,
              };
            }
            return panel;
          }),
        ]);
      setIsEditable(true);
    }
  }, [wirings]);

  const [label, setLabel] = useState([]);
  const [labelTitle, setLabelTitle] = useState([]);
  useEffect(() => {
    getData(`meta/label/list?type=panelWirings`, setLabel);
  }, []);
  const addLabel = (e) => {
    e.preventDefault();
    postAndGetData(
      `meta/label/create?type=panelWirings`,
      { title: labelTitle },
      label,
      setLabel
    );
    setLabelTitle("");
  };

  return (
    <Form
      name="dynamic_form_nest_item"
      form={form}
      size="small"
      autoComplete="off"
    >
      <Divider
        orientation="left"
        style={{
          borderWidth: 2,
          borderColor: "#7cb305",
        }}
      >
        Wiring Data
      </Divider>
      <Form.List name="wiring">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{
                  display: "flex",
                  marginBottom: 8,
                }}
                align="baseline"
              >
                {key + 1}
                <Form.Item
                  style={{
                    width: "400px",
                  }}
                  hasFeedback
                  className="form-field"
                  {...restField}
                  name={[name, "name"]}
                >
                  <Select
                    placeholder="Select an option"
                    dropdownRender={(menu) => (
                      <>
                        {menu}
                        <Divider
                          style={{
                            margin: "8px 0",
                          }}
                        />
                        <Space
                          align="center"
                          style={{
                            padding: "0 8px 4px",
                          }}
                        >
                          <Input
                            placeholder="Or Create New"
                            value={labelTitle}
                            onChange={(e) => setLabelTitle(e.target.value)}
                          />
                          <Typography.Link
                            onClick={addLabel}
                            style={{
                              whiteSpace: "nowrap",
                            }}
                          >
                            {getIconByName("create")} Add New
                          </Typography.Link>
                        </Space>
                      </>
                    )}
                  >
                    {label?.map((item) => (
                      <Select.Option key={item._id} value={item.title}>
                        {item.title}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "detail"]}
                  label="Detail"
                  style={{
                    width: "500px",
                  }}
                >
                  <Input.TextArea placeholder="Detail" />
                </Form.Item>
                <Form.Item {...restField} name={[name, "qty"]} label="Qty">
                  <InputNumber placeholder="Qty" min={1} />
                </Form.Item>

                <Form.Item {...restField} name={[name, "value"]} label="Value">
                  <InputNumber placeholder="Value" min={0} />
                </Form.Item>
                <Tooltip placement="bottomLeft" color="red" title="Delete">
                  <DeleteOutlined onClick={() => remove(name)} />
                </Tooltip>

                <Tooltip placement="bottomLeft" title="Sub Total">
                  <p>
                    <b>{Rs(wirings[key]?.value * wirings[key]?.qty)}</b>
                  </p>
                </Tooltip>
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add({ qty: 1 })}
                block
                icon={<PlusOutlined />}
              >
                Add New
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
};

export default WiringCalc;
