import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, InputNumber, Form, Divider, Tooltip } from "antd";
import { AppRowContainer } from "meta";
import React, { useEffect, useState } from "react";
import { NetPanel, PanelSum, PriceOrWeight } from "meta/Reusable/CalcData";
import { cubicalWeight } from "./CalcCubical";
const SheetCalc = ({ setPanels, panelDetail, estimation }) => {
  const [form] = Form.useForm();
  const [mainSWeights, setMainSWeights] = useState([]);
  const [pfiSWeights, setPfiSWeights] = useState([]);
  const height = Form.useWatch("height", form);
  const depth = Form.useWatch("depth", form);
  const thick = Form.useWatch("thickness", form);
  const panelmain = Form.useWatch("mainEnclosure", form);
  const panelpfi = Form.useWatch("pfiEnclosure", form);

  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      height: panelDetail?.height,
      depth: panelDetail?.depth,
      thickness: panelDetail?.thickness,
      mainEnclosure: panelDetail?.mainEnclosure,
      pfiEnclosure: panelDetail?.pfiEnclosure,
    });
  }, []);

  useEffect(() => {
    if (height) {
      isEditable &&
        setPanels((prevPanels) => [
          ...prevPanels.map((panel) => {
            if (panel._id === panelDetail._id) {
              const updatedPanel = {
                ...panel,
                save: (panel.save || 0) + 1,
                height,
                depth,
                sheetWeight: PriceOrWeight(
                  cubicalWeight(
                    panelmain,
                    height,
                    panelDetail.sheetType,
                    setMainSWeights
                  ) +
                    cubicalWeight(
                      panelpfi,
                      height,
                      panelDetail.sheetType,
                      setPfiSWeights
                    ),
                  estimation,
                  false,
                  panelDetail,
                  "weight"
                ),
                sheetCost: PriceOrWeight(
                  cubicalWeight(
                    panelmain,
                    height,
                    panelDetail.sheetType,
                    setMainSWeights
                  ) +
                    cubicalWeight(
                      panelpfi,
                      height,
                      panelDetail.sheetType,
                      setPfiSWeights
                    ),
                  estimation,
                  false,
                  panelDetail,
                  "price"
                ),
                thickness: thick,
                mainEnclosure: panelmain,
                pfiEnclosure: panelpfi,
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
  }, [height, depth, thick, panelmain, panelpfi]);

  const handleQty = (e, key, cub) => {
    form.setFields([
      { name: [`${cub}`, key, "leftQty"], value: e },
      { name: [`${cub}`, key, "rightQty"], value: e },
      { name: [`${cub}`, key, "topQty"], value: e },
      { name: [`${cub}`, key, "bottomQty"], value: e },
      { name: [`${cub}`, key, "frontQty"], value: e },
      { name: [`${cub}`, key, "backQty"], value: e },
      { name: [`${cub}`, key, "plateQty"], value: e },
    ]);
  };
  const handleThick = (e) => {
    panelmain?.map((value, key) => {
      form.setFields([
        { name: [`mainEnclosure`, key, "leftThick"], value: e },
        { name: [`mainEnclosure`, key, "rightThick"], value: e },
        { name: [`mainEnclosure`, key, "topThick"], value: e },
        { name: [`mainEnclosure`, key, "bottomThick"], value: e },
        { name: [`mainEnclosure`, key, "frontThick"], value: e },
        { name: [`mainEnclosure`, key, "backThick"], value: e },
        { name: [`mainEnclosure`, key, "plateThick"], value: e },
      ]);
    });
    panelpfi?.map((value, key) => {
      form.setFields([
        { name: [`pfiEnclosure`, key, "leftThick"], value: e },
        { name: [`pfiEnclosure`, key, "rightThick"], value: e },
        { name: [`pfiEnclosure`, key, "topThick"], value: e },
        { name: [`pfiEnclosure`, key, "bottomThick"], value: e },
        { name: [`pfiEnclosure`, key, "frontThick"], value: e },
        { name: [`pfiEnclosure`, key, "backThick"], value: e },
        { name: [`pfiEnclosure`, key, "plateThick"], value: e },
      ]);
    });
  };
  return (
    <Form
      form={form}
      name="dynamic_form_nest_item"
      autoComplete="off"
      size="small"
      labelCol={{
        span: 12,
      }}
    >
      <AppRowContainer style={{ marginBottom: 2 }}>
        <Col md={24} xs={24}>
          <div style={{ width: "95%" }}>
            <Divider
              style={{
                borderWidth: 2,
                borderColor: "#aaa9ad",
              }}
              orientation="left"
              plain
            >
              <p>Panel Dimensions</p>
            </Divider>
          </div>
        </Col>
        <Col md={6} xs={12}>
          <Form.Item
            name={"height"}
            label="Height(mm)"
            rules={[
              {
                required: true,
                message: "Please input height!",
              },
            ]}
          >
            <InputNumber min={1} placeholder="Height" />
          </Form.Item>
        </Col>
        <Col md={6} xs={12}>
          <Form.Item
            name={"depth"}
            label="Depth(mm)"
            rules={[
              {
                required: true,
                message: "Please input depth!",
              },
            ]}
          >
            <InputNumber min={1} placeholder="Depth" />
          </Form.Item>
        </Col>
        <Col md={6} xs={12}>
          <Form.Item
            name={"thickness"}
            label="Thikness(mm)"
            rules={[
              {
                required: true,
                message: "Please input thickness!",
              },
            ]}
          >
            <InputNumber
              min={0}
              onChange={handleThick}
              placeholder="Thickness"
            />
          </Form.Item>
        </Col>
      </AppRowContainer>
      <AppRowContainer gutter={[16, 16]}>
        <Col md={12} xs={24}>
          <Divider
            style={{
              borderWidth: 2,
              borderColor: "#900C3F",
            }}
          >
            Main Enclosure
          </Divider>
          <Form.List name="mainEnclosure">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <React.Fragment key={key}>
                    <AppRowContainer key={key} gutter={24}>
                      <Col md={6} xs={12}>
                        <Form.Item
                          {...restField}
                          hasFeedback
                          name={[name, "width"]}
                          label="W"
                          rules={[
                            {
                              required: true,
                              message: "Please input Width!",
                            },
                          ]}
                        >
                          <InputNumber min={1} placeholder="Width" />
                        </Form.Item>
                      </Col>
                      <Col md={8} xs={12}>
                        <Form.Item
                          {...restField}
                          hasFeedback
                          name={[name, "depth"]}
                          label="D"
                          rules={[
                            {
                              required: true,
                              message: "Please input depth of dimension!",
                            },
                          ]}
                        >
                          <InputNumber min={1} placeholder="Depth" />
                        </Form.Item>
                      </Col>
                      <Col md={8} xs={12}>
                        <Form.Item
                          {...restField}
                          hasFeedback
                          name={[name, "qty"]}
                          label="Qty"
                          rules={[
                            {
                              required: true,
                              message: "Please input depth of qty!",
                            },
                          ]}
                        >
                          <InputNumber
                            min={1}
                            placeholder="Qty"
                            onChange={(e) => handleQty(e, key, "mainEnclosure")}
                          />
                        </Form.Item>
                      </Col>
                      <div style={{ width: "95%" }}>
                        <Divider
                          style={{
                            borderColor: "#900C3F",
                          }}
                          plain
                        >
                          ID:{key + 1} ,
                          <b>
                            {panelmain
                              ? `${height ? height : "H"}x${
                                  panelmain[key]?.width
                                    ? panelmain[key]?.width
                                    : "W"
                                }x${
                                  panelmain[key]?.depth
                                    ? panelmain[key]?.depth
                                    : "D"
                                }`
                              : null}
                          </b>
                          , Qty=
                          <b>
                            {panelmain
                              ? `${
                                  panelmain[key]?.qty ? panelmain[key]?.qty : 0
                                }`
                              : 0}
                          </b>
                          , Weight =
                          <b>
                            {PriceOrWeight(
                              mainSWeights[key],
                              estimation,
                              false,
                              panelDetail,
                              "weight"
                            )}
                          </b>
                        </Divider>
                      </div>
                      <Col md={12} xs={12}>
                        <Form.Item
                          {...restField}
                          hasFeedback
                          name={[name, "frontThick"]}
                          label="Front Thick"
                        >
                          <InputNumber min={0} />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          hasFeedback
                          name={[name, "backThick"]}
                          label="Back Thick"
                        >
                          <InputNumber min={0} />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          hasFeedback
                          name={[name, "topThick"]}
                          label="Top Thick"
                        >
                          <InputNumber min={0} />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          hasFeedback
                          name={[name, "bottomThick"]}
                          label="Bottom Thick"
                        >
                          <InputNumber min={0} />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          hasFeedback
                          name={[name, "leftThick"]}
                          label="Left Thick"
                        >
                          <InputNumber min={0} />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          hasFeedback
                          name={[name, "rightThick"]}
                          label="Right Thick"
                        >
                          <InputNumber min={0} />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          hasFeedback
                          name={[name, "plateThick"]}
                          label="C.Plate Thick"
                        >
                          <InputNumber min={0} />
                        </Form.Item>
                      </Col>
                      <Col md={12} xs={12}>
                        {" "}
                        <Form.Item
                          {...restField}
                          hasFeedback
                          name={[name, "frontQty"]}
                          label="Front Qty"
                        >
                          <InputNumber min={0} disabled />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          hasFeedback
                          name={[name, "backQty"]}
                          label="Back Qty"
                        >
                          <InputNumber
                            min={0}
                            disabled
                            placeholder="Back Qty"
                          />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          hasFeedback
                          name={[name, "topQty"]}
                          label="Top Qty"
                        >
                          <InputNumber min={0} disabled placeholder="Top Qty" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          hasFeedback
                          name={[name, "bottomQty"]}
                          label="Bottom Qty"
                        >
                          <InputNumber min={0} disabled />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          hasFeedback
                          name={[name, "leftQty"]}
                          label="Left Qty"
                        >
                          <InputNumber min={0} />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          hasFeedback
                          name={[name, "rightQty"]}
                          label="Right Qty"
                        >
                          <InputNumber min={0} />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          hasFeedback
                          name={[name, "plateQty"]}
                          label="C.Plate Qty"
                        >
                          <InputNumber min={0} />
                        </Form.Item>
                      </Col>
                      <Divider orientation="right">
                        <Tooltip placement="topLeft" color="red" title="Delete">
                          <DeleteOutlined onClick={() => remove(name)} />
                        </Tooltip>
                      </Divider>
                    </AppRowContainer>
                  </React.Fragment>
                ))}
                <Form.Item>
                  <Button
                    style={{ width: "80%" }}
                    type="dashed"
                    disabled={!(height && thick && depth)}
                    onClick={() =>
                      add({
                        depth: depth,
                        width: 0,
                        qty: 1,
                        frontQty: 1,
                        backQty: 1,
                        topQty: 1,
                        bottomQty: 1,
                        leftQty: 1,
                        rightQty: 1,
                        plateQty: 1,
                        frontThick: thick,
                        backThick: thick,
                        topThick: thick,
                        bottomThick: thick,
                        leftThick: thick,
                        rightThick: thick,
                        plateThick: thick,
                      })
                    }
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Main Cubical
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Divider />
        </Col>
        <Col md={12} xs={24}>
          <Divider
            style={{
              borderWidth: 2,
              borderColor: "#7cb305",
            }}
          >
            PFI Enclosure
          </Divider>
          <Form.List name="pfiEnclosure">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <React.Fragment key={key}>
                    <AppRowContainer key={key} gutter={16}>
                      <Col md={6} xs={12}>
                        <Form.Item
                          {...restField}
                          hasFeedback
                          name={[name, "width"]}
                          label="W"
                          rules={[
                            {
                              required: true,
                              message: "Please input Width of dimension!",
                            },
                          ]}
                        >
                          <InputNumber min={1} placeholder="Width" />
                        </Form.Item>
                      </Col>
                      <Col md={8} xs={12}>
                        <Form.Item
                          {...restField}
                          hasFeedback
                          name={[name, "depth"]}
                          label="D"
                          rules={[
                            {
                              required: true,
                              message: "Please input depth of dimension!",
                            },
                          ]}
                        >
                          <InputNumber min={1} placeholder="Depth" />
                        </Form.Item>
                      </Col>
                      <Col md={8} xs={12}>
                        <Form.Item
                          {...restField}
                          hasFeedback
                          name={[name, "qty"]}
                          label="Qty"
                          rules={[
                            {
                              required: true,
                              message: "Please input depth of qty!",
                            },
                          ]}
                        >
                          <InputNumber
                            min={1}
                            placeholder="Qty"
                            onChange={(e) => handleQty(e, key, "pfiEnclosure")}
                          />
                        </Form.Item>
                      </Col>
                      <div style={{ width: "95%" }}>
                        <Divider
                          style={{
                            borderColor: "#7cb305",
                          }}
                          plain
                        >
                          <b>
                            {panelpfi
                              ? `${height ? height : "H"}x${
                                  panelpfi[key]?.width
                                    ? panelpfi[key]?.width
                                    : "W"
                                }x${
                                  panelpfi[key]?.depth
                                    ? panelpfi[key]?.depth
                                    : "D"
                                }`
                              : null}
                          </b>
                          , Qty=
                          <b>
                            {panelpfi
                              ? `${panelpfi[key]?.qty ? panelpfi[key]?.qty : 0}`
                              : 0}
                          </b>
                          , Weight =
                          <b>
                            {PriceOrWeight(
                              pfiSWeights[key],
                              estimation,
                              false,
                              panelDetail,
                              "weight"
                            )}
                          </b>
                        </Divider>
                      </div>
                      <Col md={12} xs={12}>
                        <Form.Item
                          {...restField}
                          hasFeedback
                          name={[name, "frontThick"]}
                          label="Front Thick"
                        >
                          <InputNumber min={0} />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          hasFeedback
                          name={[name, "backThick"]}
                          label="Back Thick"
                        >
                          <InputNumber min={0} />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          hasFeedback
                          name={[name, "topThick"]}
                          label="Top Thick"
                        >
                          <InputNumber min={0} />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          hasFeedback
                          name={[name, "bottomThick"]}
                          label="Bottom Thick"
                        >
                          <InputNumber min={0} />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          hasFeedback
                          name={[name, "leftThick"]}
                          label="Left Thick"
                        >
                          <InputNumber min={0} />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          hasFeedback
                          name={[name, "rightThick"]}
                          label="Right Thick"
                        >
                          <InputNumber min={0} />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          hasFeedback
                          name={[name, "plateThick"]}
                          label="C.Plate Thick"
                        >
                          <InputNumber min={0} />
                        </Form.Item>
                      </Col>
                      <Col md={12} xs={12}>
                        {" "}
                        <Form.Item
                          {...restField}
                          hasFeedback
                          name={[name, "frontQty"]}
                          label="Front Qty"
                        >
                          <InputNumber min={0} disabled />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          hasFeedback
                          name={[name, "backQty"]}
                          label="Back Qty"
                        >
                          <InputNumber
                            min={0}
                            disabled
                            placeholder="Back Qty"
                          />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          hasFeedback
                          name={[name, "topQty"]}
                          label="Top Qty"
                        >
                          <InputNumber min={0} disabled placeholder="Top Qty" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          hasFeedback
                          name={[name, "bottomQty"]}
                          label="Bottom Qty"
                        >
                          <InputNumber min={0} disabled />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          hasFeedback
                          name={[name, "leftQty"]}
                          label="Left Qty"
                        >
                          <InputNumber min={0} />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          hasFeedback
                          name={[name, "rightQty"]}
                          label="Right Qty"
                        >
                          <InputNumber min={0} />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          hasFeedback
                          name={[name, "plateQty"]}
                          label="C.Plate Qty"
                        >
                          <InputNumber min={0} />
                        </Form.Item>
                      </Col>

                      <Divider orientation="right">
                        <Tooltip placement="topLeft" color="red" title="Delete">
                          <DeleteOutlined onClick={() => remove(name)} />
                        </Tooltip>
                      </Divider>
                    </AppRowContainer>
                  </React.Fragment>
                ))}
                <Form.Item>
                  <Button
                    style={{ width: "80%" }}
                    type="dashed"
                    disabled={!panelmain}
                    onClick={() =>
                      add({
                        qty: 1,
                        depth: depth,
                        width: 0,
                        frontQty: 1,
                        backQty: 1,
                        topQty: 1,
                        bottomQty: 1,
                        leftQty: 1,
                        rightQty: 1,
                        plateQty: 1,
                        frontThick: thick,
                        backThick: thick,
                        topThick: thick,
                        bottomThick: thick,
                        leftThick: thick,
                        rightThick: thick,
                        plateThick: thick,
                      })
                    }
                    block
                    icon={<PlusOutlined />}
                  >
                    Add PFI Cubical
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Divider />
        </Col>
      </AppRowContainer>
    </Form>
  );
};

export default SheetCalc;
