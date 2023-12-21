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
} from "antd";
import { NetPanel, PanelSum, PriceOrWeight } from "meta/Reusable/CalcData";
import React, { useState } from "react";
import { useEffect } from "react";

import {
  CopperTypeWeight,
  Breakers,
  CopperWeight,
  Sum2Arrays,
} from "./CalcCopper";
const CopperCalc = ({ panelDetail, panels, setPanels, estimation }) => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const [busbarWeight, setBusbarWeight] = useState();
  const [dropWeight, setDropWeight] = useState();
  const busbars = Form.useWatch("busbar", form);
  const drops = Form.useWatch("drop", form);

  const [isEditable, setIsEditable] = useState(false);
  useEffect(() => {
    console.log(drops, "drops");
  }, [drops]);

  useEffect(() => {
    form.setFieldsValue({
      busbar: panelDetail?.busbar,
      drop: panelDetail?.drop,
    });
  }, []);

  useEffect(() => {
    const totalWeight = Sum2Arrays(
      CopperWeight(busbars, estimation?.copperWaste, setBusbarWeight, "busbar"),
      CopperWeight(drops, 0, setDropWeight, "drop")
    );

    if (busbars || drops) {
      isEditable &&
        setPanels((prevPanels) => [
          ...prevPanels.map((panel) => {
            if (panel._id === panelDetail._id) {
              const updatedPanel = {
                ...panel,
                save: (panel.save || 0) + 1,
                busbar: busbars,
                drop: drops,
                copperWeight: totalWeight,
                copperCost: PriceOrWeight(
                  totalWeight,
                  estimation,
                  true,
                  panelDetail,
                  "price"
                ),
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
  }, [busbars, drops]);

  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };
  const [mainLength, setMainLength] = useState();
  const [pfiLength, setPfiLength] = useState();
  useEffect(() => {
    const mainWidths = panelDetail.mainEnclosure
      ? panelDetail.mainEnclosure.reduce(
          (n, { width, qty }) => n + width * qty,
          0
        )
      : 0;
    const pfiWidths = panelDetail.pfiEnclosure
      ? panelDetail.pfiEnclosure.reduce(
          (n, { width, qty }) => n + width * qty,
          0
        )
      : 0;
    const mainQtys = panelDetail.mainEnclosure
      ? panelDetail.mainEnclosure.reduce((n, { qty }) => n + qty, 0)
      : 0;
    const pfiQtys = panelDetail.pfiEnclosure
      ? panelDetail.pfiEnclosure.reduce((n, { qty }) => n + qty, 0)
      : 0;
    let newMainQty = mainQtys > 0 ? mainQtys - 1 : mainQtys;
    let newPfiQty = pfiQtys > 0 ? pfiQtys - 1 : pfiQtys;
    setMainLength(mainWidths + 120 * newMainQty);
    setPfiLength(pfiWidths + 120 * newPfiQty);
  }, [panelDetail.mainEnclosure, panelDetail.pfiEnclosure]);

  const handleSelect = (e, key) => {
    form.setFields([
      { name: ["drop", key, "length"], value: Breakers[e].length },
      { name: ["drop", key, "run"], value: Breakers[e].Run },
      { name: ["drop", key, "copperType"], value: Breakers[e].Copper },
    ]);
  };
  const [alleyIndex, setAlleyIndex] = useState(1);

  const handleBusbar = (e, key) => {
    if (e == "PFI Busbar") {
      form.setFields([
        { name: ["busbar", key, "length"], value: pfiLength },
        { name: ["busbar", key, "phase"], value: 3 },
        { name: ["busbar", key, "earth"], value: 0 },
        { name: ["busbar", key, "neutral"], value: 0 },
        { name: ["busbar", key, "run"], value: 1 },
        { name: ["busbar", key, "copperType"], value: "100x5" },
      ]);
    } else if (e == "Alley Busbar") {
      form.setFields([
        { name: ["busbar", key, "length"], value: mainLength },
        { name: ["busbar", key, "phase"], value: 1 },
        { name: ["busbar", key, "earth"], value: 0 },
        { name: ["busbar", key, "neutral"], value: 0 },
        { name: ["busbar", key, "run"], value: 1 },
        { name: ["busbar", key, "copperType"], value: "100x5" },
      ]);
      setAlleyIndex(alleyIndex + 1);
    } else if (e == "Main Phase Busbar") {
      form.setFields([
        { name: ["busbar", key, "length"], value: mainLength },
        { name: ["busbar", key, "phase"], value: 3 },
        { name: ["busbar", key, "earth"], value: 0 },
        { name: ["busbar", key, "neutral"], value: 0 },
        { name: ["busbar", key, "run"], value: 1 },
        { name: ["busbar", key, "copperType"], value: "100x5" },
      ]);
    } else if (e == "Main E Busbar") {
      form.setFields([
        { name: ["busbar", key, "length"], value: mainLength },
        { name: ["busbar", key, "phase"], value: 0 },
        { name: ["busbar", key, "earth"], value: 1 },
        { name: ["busbar", key, "neutral"], value: 0 },
        { name: ["busbar", key, "run"], value: 1 },
        { name: ["busbar", key, "copperType"], value: "100x5" },
      ]);
    } else if (e == "Main N Busbar") {
      form.setFields([
        { name: ["busbar", key, "length"], value: mainLength },
        { name: ["busbar", key, "phase"], value: 0 },
        { name: ["busbar", key, "earth"], value: 0 },
        { name: ["busbar", key, "neutral"], value: 1 },
        { name: ["busbar", key, "run"], value: 1 },
        { name: ["busbar", key, "copperType"], value: "100x5" },
      ]);
    } else if (e == "Customized Busbar") {
      form.setFields([
        { name: ["busbar", key, "length"], value: 0 },
        { name: ["busbar", key, "phase"], value: 1 },
        { name: ["busbar", key, "earth"], value: 0 },
        { name: ["busbar", key, "neutral"], value: 0 },
        { name: ["busbar", key, "run"], value: 0 },
        { name: ["busbar", key, "copperType"], value: "100x5" },
      ]);
    }
  };
  const counterType = (type, key) => {
    let x = 1;
    for (let i = 0; i < key; i++) {
      if (type === busbars[i]?.type) {
        x++;
      }
    }
    return x;
  };

  return (
    <Form
      name="dynamic_form_nest_item"
      form={form}
      onFinish={onFinish}
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
        Busbars Curent <b>Pfi length=</b>
        {pfiLength} mm, <b>Main length=</b>
        {mainLength} mm
      </Divider>
      <Form.List name="busbar">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }, index) => (
              <Space
                wrap
                key={key}
                style={{
                  display: "flex",
                  marginBottom: 8,
                }}
                align="baseline"
              >
                {index + 1}

                <Tooltip placement="right" title="Busbar Type">
                  <Form.Item {...restField} name={[name, "type"]}>
                    <Select
                      onSelect={(e) => handleBusbar(e, index)}
                      style={{ width: "200px" }}
                      placeholder="Busbar"
                    >
                      <Option value="Main Phase Busbar">
                        {counterType("Main Phase Busbar", index)}-Main Phase
                        Busbar
                      </Option>
                      <Option value="Main E Busbar">
                        {counterType("Main E Busbar", index)}-Main E Busbar
                      </Option>
                      <Option value="Main N Busbar">
                        {counterType("Main N Busbar", index)}-Main N Busbar
                      </Option>
                      <Option value="PFI Busbar">
                        {counterType("PFI Busbar", index)}-PFI Busbar
                      </Option>
                      <Option value="Alley Busbar">
                        {counterType("Alley Busbar", index)}-Alley Busbar
                      </Option>
                      <Option value="Customized Busbar">
                        {counterType("Customized Busbar", index)}-Customized
                        Busbar
                      </Option>
                    </Select>
                  </Form.Item>
                </Tooltip>

                <Tooltip placement="left" title="Copper Type">
                  <Form.Item {...restField} name={[name, "copperType"]}>
                    <Select
                      style={{ width: "200px" }}
                      placeholder="Copper Type"
                    >
                      {CopperTypeWeight?.map((item) => (
                        <Option key={item.value} value={item.value}>
                          {item.Copper}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Tooltip>

                <Tooltip placement="bottomLeft" title="Run">
                  <Form.Item {...restField} name={[name, "run"]} label="R">
                    <InputNumber min={0} placeholder="Run" />
                  </Form.Item>
                </Tooltip>
                <Tooltip placement="bottomLeft" title="Phase">
                  <Form.Item {...restField} name={[name, "phase"]} label="P">
                    <InputNumber min={0} placeholder="Phase" />
                  </Form.Item>
                </Tooltip>

                <Tooltip placement="bottomLeft" title="Neutral">
                  <Form.Item {...restField} name={[name, "neutral"]} label="N">
                    <InputNumber min={0} placeholder="Neutral" />
                  </Form.Item>
                </Tooltip>

                <Tooltip placement="bottomLeft" title="Earth">
                  <Form.Item {...restField} name={[name, "earth"]} label="E">
                    <InputNumber min={0} placeholder="Earth" />
                  </Form.Item>
                </Tooltip>
                <Tooltip placement="bottomLeft" title="Busbar Length">
                  <Form.Item {...restField} name={[name, "length"]}>
                    <InputNumber min={0} placeholder="Length" />
                  </Form.Item>
                </Tooltip>
                <Tooltip placement="bottomLeft" color="red" title="Delete">
                  <DeleteOutlined onClick={() => remove(name)} />
                </Tooltip>

                <Tooltip placement="bottomLeft" title="Sub Total">
                  <p>
                    <b>{busbarWeight[index]?.toFixed(2)}</b>
                    Kg
                  </p>
                </Tooltip>
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Busbars
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Divider
        orientation="left"
        style={{
          borderWidth: 2,
          borderColor: "#7cb305",
        }}
      >
        Drops
      </Divider>
      <Form.List name="drop">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }, index) => (
              <Space
                wrap
                key={key}
                style={{
                  display: "flex",
                  marginBottom: 8,
                }}
                align="baseline"
              >
                {index + 1}
                <Tooltip placement="right" title="Select Breaker">
                  <Form.Item {...restField} name={[name, "breaker"]}>
                    <Select
                      onChange={(e) => handleSelect(e, index)}
                      style={{ width: "200px" }}
                      placeholder="Breaker"
                    >
                      {Breakers?.map((item) => (
                        <Option key={item.Value} value={item.Value}>
                          {item.Breaker}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Tooltip>
                <Tooltip placement="left" title="Copper Type">
                  <Form.Item {...restField} name={[name, "copperType"]}>
                    <Select
                      style={{ width: "200px" }}
                      placeholder="Copper Type"
                    >
                      {CopperTypeWeight?.map((item) => (
                        <Option key={item.value} value={item.value}>
                          {item.Copper}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Tooltip>

                <Tooltip placement="bottomLeft" title="Run">
                  <Form.Item {...restField} name={[name, "run"]} label="R">
                    <InputNumber min={0} placeholder="Run" />
                  </Form.Item>
                </Tooltip>
                <Tooltip placement="bottomLeft" title="Three Pole">
                  <Form.Item {...restField} name={[name, "TP"]} label="TP">
                    <InputNumber min={0} placeholder="TP" />
                  </Form.Item>
                </Tooltip>
                <Tooltip
                  placement="bottomLeft"
                  title="Full Pole - Half Neutral"
                >
                  <Form.Item {...restField} name={[name, "FPHN"]} label="FPHN">
                    <InputNumber min={0} placeholder="FP-HN" />
                  </Form.Item>
                </Tooltip>
                <Tooltip
                  placement="bottomLeft"
                  title="Full Pole - Full Neutral"
                >
                  <Form.Item {...restField} name={[name, "FPFN"]} label="FPFN">
                    <InputNumber min={0} placeholder="FP-FN" />
                  </Form.Item>
                </Tooltip>
                <Tooltip placement="bottomLeft" title="Busbar Length">
                  <Form.Item {...restField} name={[name, "length"]}>
                    <InputNumber min={0} placeholder="Length" />
                  </Form.Item>
                </Tooltip>

                <Tooltip placement="bottomLeft" color="red" title="Delete">
                  <DeleteOutlined onClick={() => remove(name)} />
                </Tooltip>
                <Tooltip placement="bottomLeft" color="green" title="Sub Total">
                  <p>
                    <b>{dropWeight[index]?.toFixed(2)}</b>
                    Kg
                  </p>
                </Tooltip>
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Drops
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item></Form.Item>
    </Form>
  );
};

export default CopperCalc;
