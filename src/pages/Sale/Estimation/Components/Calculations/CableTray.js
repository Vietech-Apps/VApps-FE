import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  InputNumber,
  Form,
  Divider,
  Tooltip,
  Radio,
  Space,
  Select,
  Card,
  Badge,
} from "antd";
import { AppRowContainer } from "meta";
import React, { useEffect, useState } from "react";
import {
  CLadder,
  CTBend,
  CTray,
  CTWeight,
} from "./CalcCableTray";
import jwtAxios from "meta/services/auth/jwt-api";
const CableTray = ({ ctWeight, setCTWeight, panelDetail }) => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const cTray = Form.useWatch("cTray", form);
  const cLadder = Form.useWatch("cLadder", form);
  const cBend = Form.useWatch("cBend", form);
  const cTee = Form.useWatch("cTee", form);
  const cReducer = Form.useWatch("cReducer", form);
  const cCross = Form.useWatch("cCross", form);

  useEffect(() => {
    setCTWeight(CTWeight(cTray, cLadder));
  }, [ctWeight, cLadder, cTray, cCross, cTee, cBend, cReducer]);

  useEffect(() => {
    form.setFieldsValue({
      cTray: panelDetail?.cTray,
      cLadder: panelDetail?.cLadder,
      cBend: panelDetail?.cBend,
      cTee: panelDetail?.cTee,
      cReducer: panelDetail?.cReducer,
      cCross: panelDetail?.cCross,
    });
  }, []);

  const PostData = async (values) => {
    try {
      const response = await jwtAxios.put(
        `erp/panel/update/${panelDetail?._id}`,
        values
      );
    } catch {
      console.log("error");
    }
  };
  useEffect(() => {
    PostData({
      cLadder,
      cTray,
      cCross,
      cTee,
      cBend,
      cReducer,
      ctWeight,
    });
  }, [cLadder, cTray, cCross, cTee, cBend, cReducer, ctWeight]);

  return (
    <div className="site-card-border-less-wrapper">
      <Form
        form={form}
        name="dynamic_form_nest_item"
        autoComplete="off"
        size={"small"}
      >
        <AppRowContainer gutter={[10, 14]}>
          <Col md={24} xs={24}>
            <Badge.Ribbon color="cyan" text="Tray">
              <Card
                title="Cable Tray"
                style={{ background: "#EBF5FB" }}
                size="small"
              >
                <Form.List name="cTray">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <AppRowContainer
                          key={key}
                          style={{ marginBottom: 2 }}
                          gutter={[2, 3]}
                        >
                          <Col md={3} xs={12}>
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
                              <InputNumber min={0} placeholder="Qty" />
                            </Form.Item>
                          </Col>
                          <Col md={3} xs={12}>
                            <Form.Item
                              labelCol={{
                                span: 12,
                              }}
                              {...restField}
                              hasFeedback
                              name={[name, "t"]}
                              label={`T-mm`}
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "Please input Thickness of dimension!",
                                },
                              ]}
                            >
                              <InputNumber min={1} placeholder="Thick" />
                            </Form.Item>
                          </Col>
                          <Col md={5} xs={12}>
                            <Form.Item
                              labelCol={{
                                span: 12,
                              }}
                              initialValue={"mm"}
                              {...restField}
                              hasFeedback
                              name={[name, "unit"]}
                              label="Unit"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input Sheet!",
                                },
                              ]}
                            >
                              <Select placeholder="Unit">
                                <Option value={"mm"}>mm</Option>
                                <Option value={"in."}>in.</Option>
                              </Select>
                            </Form.Item>
                          </Col>

                          <Col md={3} xs={12}>
                            <Form.Item
                              labelCol={{
                                span: 12,
                              }}
                              {...restField}
                              hasFeedback
                              name={[name, "h"]}
                              label={`H-${cTray[key]?.unit || "mm"}`}
                              rules={[
                                {
                                  required: true,
                                  message: "Please input Height!",
                                },
                              ]}
                            >
                              <InputNumber min={1} placeholder="Height" />
                            </Form.Item>
                          </Col>
                          <Col md={3} xs={12}>
                            <Form.Item
                              labelCol={{
                                span: 12,
                              }}
                              {...restField}
                              hasFeedback
                              name={[name, "w"]}
                              label={`W-${cTray[key]?.unit || "mm"}`}
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

                          <Col md={6} xs={12}>
                            <Form.Item
                              labelCol={{
                                span: 8,
                              }}
                              {...restField}
                              initialValue={"m"}
                              hasFeedback
                              name={[name, "lengthUnit"]}
                              label="Length Unit"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input Sheet!",
                                },
                              ]}
                            >
                              <Select placeholder=" length Unit">
                                <Option value={"ft."}>ft.</Option>
                                <Option value={"m"}>m</Option>
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col md={6} xs={12}>
                            <Form.Item
                              labelCol={{
                                span: 12,
                              }}
                              {...restField}
                              hasFeedback
                              name={[name, "l"]}
                              label={`Length (${
                                cTray[key]?.lengthUnit || "m"
                              })`}
                              rules={[
                                {
                                  required: true,
                                  message: "Please input Length of dimension!",
                                },
                              ]}
                            >
                              <InputNumber min={1} placeholder="Length" />
                            </Form.Item>
                          </Col>
                          <Col md={6} xs={24}>
                            <Form.Item
                              labelCol={{
                                span: 10,
                              }}
                              name={[name, "hasCover"]}
                              label="Has Cover"
                              initialValue={false}
                            >
                              <Radio.Group disabled={!cTray[key]?.w}>
                                <Radio value={false}>No</Radio>
                                <Radio value={true}>Yes</Radio>
                              </Radio.Group>
                            </Form.Item>
                          </Col>
                          {cTray[key]?.hasCover ? (
                            <>
                              <Col md={6} xs={24}>
                                <Form.Item
                                  {...restField}
                                  hasFeedback
                                  name={[name, "tC"]}
                                  label={`Cover Thickness-mm`}
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        "Please input Thickness of dimension!",
                                    },
                                  ]}
                                >
                                  <InputNumber min={1} placeholder="Thick" />
                                </Form.Item>
                              </Col>
                            </>
                          ) : (
                            ""
                          )}
                          <Divider>
                            <Space>
                              {`${CTray(cTray[key])?.toFixed(2)} Kg`}

                              <Tooltip
                                placement="topLeft"
                                color="red"
                                title="Delete"
                              >
                                <DeleteOutlined onClick={() => remove(name)} />
                              </Tooltip>
                            </Space>
                          </Divider>
                        </AppRowContainer>
                      ))}
                      <Form.Item>
                        <Button
                          //style={{width: '50%'}}
                          type="dashed"
                          onClick={() =>
                            add({
                              qty: 1,
                              sType: "MS Powder Coated",
                            })
                          }
                          block
                          icon={<PlusOutlined />}
                        >
                          Add Tray
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Card>
            </Badge.Ribbon>
          </Col>
          <Col md={24} xs={24}>
            <Badge.Ribbon text="Ladder" color="#7D3C98">
              <Card
                title="Cable Ladder"
                style={{ background: "#F4ECF7" }}
                size="small"
              >
                <Form.List name="cLadder">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <AppRowContainer
                          key={key}
                          style={{ marginBottom: 3 }}
                          gutter={[2, 3]}
                        >
                          <Col md={3} xs={12}>
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
                              <InputNumber min={0} placeholder="Qty" />
                            </Form.Item>
                          </Col>

                          <Col md={3} xs={12}>
                            <Form.Item
                              labelCol={{
                                span: 12,
                              }}
                              {...restField}
                              hasFeedback
                              name={[name, "t"]}
                              label={`T-mm`}
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "Please input Thickness of dimension!",
                                },
                              ]}
                            >
                              <InputNumber min={1} placeholder="Thick" />
                            </Form.Item>
                          </Col>

                          <Col md={5} xs={12}>
                            <Form.Item
                              labelCol={{
                                span: 12,
                              }}
                              initialValue={"mm"}
                              {...restField}
                              hasFeedback
                              name={[name, "unit"]}
                              label="Unit"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input Sheet!",
                                },
                              ]}
                            >
                              <Select placeholder="Unit">
                                <Option value={"mm"}>mm</Option>
                                <Option value={"in."}>in.</Option>
                              </Select>
                            </Form.Item>
                          </Col>

                          <Col md={3} xs={12}>
                            <Form.Item
                              labelCol={{
                                span: 12,
                              }}
                              {...restField}
                              hasFeedback
                              name={[name, "h"]}
                              label={`H-${cLadder[key]?.unit || "mm"}`}
                              rules={[
                                {
                                  required: true,
                                  message: "Please input Height!",
                                },
                              ]}
                            >
                              <InputNumber min={1} placeholder="Height" />
                            </Form.Item>
                          </Col>
                          <Col md={3} xs={12}>
                            <Form.Item
                              labelCol={{
                                span: 12,
                              }}
                              {...restField}
                              hasFeedback
                              name={[name, "w"]}
                              label={`W-${cLadder[key]?.unit || "mm"}`}
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

                          <Col md={6} xs={12}>
                            <Form.Item
                              labelCol={{
                                span: 8,
                              }}
                              {...restField}
                              initialValue={"m"}
                              hasFeedback
                              name={[name, "lengthUnit"]}
                              label="Length Unit"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input Sheet!",
                                },
                              ]}
                            >
                              <Select placeholder=" length Unit">
                                <Option value={"ft."}>ft.</Option>
                                <Option value={"m"}>m</Option>
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col md={6} xs={12}>
                            <Form.Item
                              labelCol={{
                                span: 12,
                              }}
                              {...restField}
                              hasFeedback
                              name={[name, "l"]}
                              label={`Length (${
                                cLadder[key]?.lengthUnit || "m"
                              })`}
                              rules={[
                                {
                                  required: true,
                                  message: "Please input Length of dimension!",
                                },
                              ]}
                            >
                              <InputNumber min={1} placeholder="Length" />
                            </Form.Item>
                          </Col>
                          <Col md={6} xs={24}>
                            <Form.Item
                              labelCol={{
                                span: 10,
                              }}
                              name={[name, "hasCover"]}
                              label="Has Cover"
                              initialValue={false}
                            >
                              <Radio.Group disabled={!cLadder[key]?.w}>
                                <Radio value={false}>No</Radio>
                                <Radio value={true}>Yes</Radio>
                              </Radio.Group>
                            </Form.Item>
                          </Col>
                          {cLadder[key]?.hasCover ? (
                            <>
                              <Col md={6} xs={12}>
                                <Form.Item
                                  {...restField}
                                  hasFeedback
                                  name={[name, "tC"]}
                                  label={`Cover Thickness-mm`}
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        "Please input Thickness of dimension!",
                                    },
                                  ]}
                                >
                                  <InputNumber min={1} placeholder="Thick" />
                                </Form.Item>
                              </Col>
                            </>
                          ) : (
                            ""
                          )}
                          <Divider>
                            <Space>
                              {`${CLadder(cLadder[key])?.toFixed(2)} Kg`}

                              <Tooltip
                                placement="topLeft"
                                color="red"
                                title="Delete"
                              >
                                <DeleteOutlined onClick={() => remove(name)} />
                              </Tooltip>
                            </Space>
                          </Divider>
                        </AppRowContainer>
                      ))}
                      <Form.Item>
                        <Button
                          //style={{width: '50%'}}
                          type="dashed"
                          onClick={() =>
                            add({
                              qty: 1,
                              sType: "MS Powder Coated",
                            })
                          }
                          block
                          icon={<PlusOutlined />}
                        >
                          Add Ladder
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Card>
            </Badge.Ribbon>
          </Col>
          <Col md={24} xs={24}>
            <Badge.Ribbon text="Bend" color="#7D3C98">
              <Card
                title="Cable Tray Bend"
                style={{ background: "#F4ECF7" }}
                size="small"
              >
                <Form.List name="cBend">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <AppRowContainer
                          key={key}
                          style={{ marginBottom: 6 }}
                          gutter={[2, 3]}
                        >
                          <Col md={3} xs={12}>
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
                              <InputNumber min={0} placeholder="Qty" />
                            </Form.Item>
                          </Col>


                          <Col md={3} xs={12}>
                            <Form.Item
                              labelCol={{
                                span: 12,
                              }}
                              {...restField}
                              hasFeedback
                              name={[name, "t"]}
                              label={`T-mm`}
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "Please input Thickness of dimension!",
                                },
                              ]}
                            >
                              <InputNumber min={1} placeholder="Thick" />
                            </Form.Item>
                          </Col>

                          <Col md={5} xs={12}>
                            <Form.Item
                              labelCol={{
                                span: 12,
                              }}
                              initialValue={"mm"}
                              {...restField}
                              hasFeedback
                              name={[name, "unit"]}
                              label="Unit"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input Sheet!",
                                },
                              ]}
                            >
                              <Select placeholder="Unit">
                                <Option value={"mm"}>mm</Option>
                                <Option value={"in."}>in.</Option>
                              </Select>
                            </Form.Item>
                          </Col>

                          <Col md={3} xs={12}>
                            <Form.Item
                              {...restField}
                              hasFeedback
                              name={[name, "h"]}
                              label={`H-${cBend[key]?.unit || "mm"}`}
                              rules={[
                                {
                                  required: true,
                                  message: "Please input Height!",
                                },
                              ]}
                            >
                              <InputNumber min={1} placeholder="Height" />
                            </Form.Item>
                          </Col>
                          <Col md={4} xs={12}>
                            <Form.Item
                              labelCol={{
                                span: 14,
                              }}
                              {...restField}
                              hasFeedback
                              name={[name, "wIn"]}
                              label={`W(In)-${cBend[key]?.unit || "mm"}`}
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
                          <Col md={4} xs={12}>
                            <Form.Item
                              labelCol={{
                                span: 14,
                              }}
                              {...restField}
                              hasFeedback
                              name={[name, "wOut"]}
                              label={`W(Out)-${cBend[key]?.unit || "mm"}`}
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
                          <Col md={6} xs={24}>
                            <Form.Item
                              labelCol={{
                                span: 10,
                              }}
                              name={[name, "hasCover"]}
                              label="Has Cover"
                              initialValue={false}
                            >
                              <Radio.Group>
                                <Radio value={false}>No</Radio>
                                <Radio value={true}>Yes</Radio>
                              </Radio.Group>
                            </Form.Item>
                          </Col>
                          {cBend[key]?.hasCover ? (
                            <>
                              <Col md={4} xs={12}>
                                <Form.Item
                                  {...restField}
                                  hasFeedback
                                  name={[name, "tC"]}
                                  label={`Cover T-mm`}
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        "Please input Thickness of dimension!",
                                    },
                                  ]}
                                >
                                  <InputNumber min={1} placeholder="Thick" />
                                </Form.Item>
                              </Col>
                            </>
                          ) : (
                            ""
                          )}
                          <Divider>
                            <Space>
                              {`${CTBend(cBend[key])?.toFixed(2)} Kg`}

                              <Tooltip
                                placement="topLeft"
                                color="red"
                                title="Delete"
                              >
                                <DeleteOutlined onClick={() => remove(name)} />
                              </Tooltip>
                            </Space>
                          </Divider>
                        </AppRowContainer>
                      ))}
                      <Form.Item>
                        <Button
                          //style={{width: '50%'}}
                          type="dashed"
                          onClick={() =>
                            add({
                              qty: 1,
                              sType: "MS Powder Coated",
                              unit: "mm",
                            })
                          }
                          block
                          icon={<PlusOutlined />}
                        >
                          Add Bend
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Card>
            </Badge.Ribbon>
          </Col>
          <Col md={24} xs={24}>
            <Badge.Ribbon text="Tee" color="cyan">
              <Card
                title="Cable Tray Tee"
                style={{ background: "#EBF5FB" }}
                size="small"
              >
                <Form.List name="cTee">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <AppRowContainer
                          key={key}
                          style={{ marginBottom: 6 }}
                          gutter={[2, 3]}
                        >
                          <Col md={3} xs={12}>
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
                              <InputNumber min={0} placeholder="Qty" />
                            </Form.Item>
                          </Col>

                          <Col md={3} xs={12}>
                            <Form.Item
                              labelCol={{
                                span: 12,
                              }}
                              {...restField}
                              hasFeedback
                              name={[name, "t"]}
                              label={`T-mm`}
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "Please input Thickness of dimension!",
                                },
                              ]}
                            >
                              <InputNumber min={1} placeholder="Thick" />
                            </Form.Item>
                          </Col>

                          <Col md={5} xs={12}>
                            <Form.Item
                              labelCol={{
                                span: 12,
                              }}
                              initialValue={"mm"}
                              {...restField}
                              hasFeedback
                              name={[name, "unit"]}
                              label="Unit"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input Sheet!",
                                },
                              ]}
                            >
                              <Select placeholder="Unit">
                                <Option value={"mm"}>mm</Option>
                                <Option value={"in."}>in.</Option>
                              </Select>
                            </Form.Item>
                          </Col>

                          <Col md={3} xs={12}>
                            <Form.Item
                              {...restField}
                              hasFeedback
                              name={[name, "h"]}
                              label={`H-${cTee[key]?.unit || "mm"}`}
                              rules={[
                                {
                                  required: true,
                                  message: "Please input Height!",
                                },
                              ]}
                            >
                              <InputNumber min={1} placeholder="Height" />
                            </Form.Item>
                          </Col>
                          <Col md={3} xs={12}>
                            <Form.Item
                              labelCol={{
                                span: 16,
                              }}
                              {...restField}
                              hasFeedback
                              name={[name, "wIn"]}
                              label={`W(In)-${cTee[key]?.unit || "mm"}`}
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
                          <Col md={4} xs={12}>
                            <Form.Item
                              labelCol={{
                                span: 16,
                              }}
                              {...restField}
                              hasFeedback
                              name={[name, "wOut"]}
                              label={`W(Out)-${cTee[key]?.unit || "mm"}`}
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

                          <Col md={4} xs={12}>
                            <Form.Item
                              labelCol={{
                                span: 16,
                              }}
                              {...restField}
                              hasFeedback
                              name={[name, "wExit"]}
                              label={`W(Exit)-${cTee[key]?.unit || "mm"}`}
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

                          <Col md={6} xs={24}>
                            <Form.Item
                              labelCol={{
                                span: 10,
                              }}
                              name={[name, "hasCover"]}
                              label="Has Cover"
                              initialValue={false}
                            >
                              <Radio.Group>
                                <Radio value={false}>No</Radio>
                                <Radio value={true}>Yes</Radio>
                              </Radio.Group>
                            </Form.Item>
                          </Col>
                          {cBend[key]?.hasCover ? (
                            <>
                              <Divider orientation="left">Cover</Divider>
                              <Col md={4} xs={12}>
                                <Form.Item
                                  {...restField}
                                  hasFeedback
                                  name={[name, "tC"]}
                                  label={`Cover Thickness-mm`}
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        "Please input Thickness of dimension!",
                                    },
                                  ]}
                                >
                                  <InputNumber min={1} placeholder="Thick" />
                                </Form.Item>
                              </Col>
                            </>
                          ) : (
                            ""
                          )}
                          <Divider>
                            <Space>
                              {/* {`${(CTray(cTray[key]) * (1 + sWaste))?.toFixed(
                                2,
                              )} Kg`} */}

                              <Tooltip
                                placement="topLeft"
                                color="red"
                                title="Delete"
                              >
                                <DeleteOutlined onClick={() => remove(name)} />
                              </Tooltip>
                            </Space>
                          </Divider>
                        </AppRowContainer>
                      ))}
                      <Form.Item>
                        <Button
                          //style={{width: '50%'}}
                          type="dashed"
                          onClick={() =>
                            add({
                              qty: 1,
                              sType: "MS Powder Coated",
                            })
                          }
                          block
                          icon={<PlusOutlined />}
                        >
                          Add Tee
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Card>
            </Badge.Ribbon>
          </Col>
          <Col md={12} xs={24}>
            <Badge.Ribbon text="Reducer" color="cyan">
              <Card
                title="Cable Tray Reducer"
                style={{ background: "#EBF5FB" }}
                size="small"
              >
                <Form.List name="cReducer">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <AppRowContainer
                          key={key}
                          style={{ marginBottom: 6 }}
                          gutter={[2, 3]}
                        >
                          <Col md={6} xs={12}>
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
                              <InputNumber min={0} placeholder="Qty" />
                            </Form.Item>
                          </Col>


                          <Col md={8} xs={12}>
                            <Form.Item
                              labelCol={{
                                span: 12,
                              }}
                              {...restField}
                              hasFeedback
                              name={[name, "t"]}
                              label={`T-mm`}
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "Please input Thickness of dimension!",
                                },
                              ]}
                            >
                              <InputNumber min={1} placeholder="Thick" />
                            </Form.Item>
                          </Col>

                          <Col md={6} xs={12}>
                            <Form.Item
                              initialValue={"mm"}
                              {...restField}
                              hasFeedback
                              name={[name, "unit"]}
                              label="Unit"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input Sheet!",
                                },
                              ]}
                            >
                              <Select placeholder="Unit">
                                <Option value={"mm"}>mm</Option>
                                <Option value={"in."}>in.</Option>
                              </Select>
                            </Form.Item>
                          </Col>

                          <Col md={8} xs={12}>
                            <Form.Item
                              {...restField}
                              hasFeedback
                              name={[name, "h"]}
                              label={`H-${cReducer[key]?.unit || "mm"}`}
                              rules={[
                                {
                                  required: true,
                                  message: "Please input Height!",
                                },
                              ]}
                            >
                              <InputNumber min={1} placeholder="Height" />
                            </Form.Item>
                          </Col>
                          <Col md={8} xs={12}>
                            <Form.Item
                              labelCol={{
                                span: 12,
                              }}
                              {...restField}
                              hasFeedback
                              name={[name, "wIn"]}
                              label={`W(In)-${cReducer[key]?.unit || "mm"}`}
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
                              labelCol={{
                                span: 14,
                              }}
                              {...restField}
                              hasFeedback
                              name={[name, "wOut"]}
                              label={`W(Out)-${cReducer[key]?.unit || "mm"}`}
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

                          <Col md={12} xs={12}>
                            <Form.Item
                              labelCol={{
                                span: 8,
                              }}
                              {...restField}
                              initialValue={"m"}
                              hasFeedback
                              name={[name, "lengthUnit"]}
                              label="Length Unit"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input Sheet!",
                                },
                              ]}
                            >
                              <Select placeholder=" length Unit">
                                <Option value={"ft."}>ft.</Option>
                                <Option value={"m"}>m</Option>
                                <Option value={"in."}>in.</Option>
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col md={12} xs={12}>
                            <Form.Item
                              labelCol={{
                                span: 12,
                              }}
                              {...restField}
                              hasFeedback
                              name={[name, "l"]}
                              label={`Length (${
                                cReducer[key]?.lengthUnit || "m"
                              })`}
                              rules={[
                                {
                                  required: true,
                                  message: "Please input Length of dimension!",
                                },
                              ]}
                            >
                              <InputNumber min={1} placeholder="Length" />
                            </Form.Item>
                          </Col>

                          <Col md={24} xs={24}>
                            <Form.Item
                              labelCol={{
                                span: 10,
                              }}
                              name={[name, "hasCover"]}
                              label="Has Cover"
                              initialValue={false}
                            >
                              <Radio.Group disabled={!cLadder[key]?.w}>
                                <Radio value={false}>No</Radio>
                                <Radio value={true}>Yes</Radio>
                              </Radio.Group>
                            </Form.Item>
                          </Col>
                          {cReducer[key]?.hasCover ? (
                            <>
                              <Divider orientation="left">Cover</Divider>
                              <Col md={12} xs={12}>
                                <Form.Item
                                  {...restField}
                                  hasFeedback
                                  name={[name, "tC"]}
                                  label={`Cover Thickness-mm`}
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        "Please input Thickness of dimension!",
                                    },
                                  ]}
                                >
                                  <InputNumber min={1} placeholder="Thick" />
                                </Form.Item>
                              </Col>
                            </>
                          ) : (
                            ""
                          )}
                          <Divider>
                            <Space>
                              {/* {`${(CTray(cTray[key]) * (1 + sWaste))?.toFixed(
                                2,
                              )} Kg`} */}

                              <Tooltip
                                placement="topLeft"
                                color="red"
                                title="Delete"
                              >
                                <DeleteOutlined onClick={() => remove(name)} />
                              </Tooltip>
                            </Space>
                          </Divider>
                        </AppRowContainer>
                      ))}
                      <Form.Item>
                        <Button
                          //style={{width: '50%'}}
                          type="dashed"
                          onClick={() =>
                            add({
                              qty: 1,
                              sType: "MS Powder Coated",
                              unit: "mm",
                              lengthUnit: "m",
                            })
                          }
                          block
                          icon={<PlusOutlined />}
                        >
                          Add Reducer
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Card>
            </Badge.Ribbon>
          </Col>
          <Col md={12} xs={24}>
            <Badge.Ribbon text="Cross" color="#7D3C98">
              <Card
                title="Cable Tray Cross"
                style={{ background: "#F4ECF7" }}
                size="small"
              >
                <Form.List name="cCross">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <AppRowContainer
                          key={key}
                          style={{ marginBottom: 6 }}
                          gutter={[2, 3]}
                        >
                          <Col md={6} xs={12}>
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
                              <InputNumber min={0} placeholder="Qty" />
                            </Form.Item>
                          </Col>


                          <Col md={8} xs={12}>
                            <Form.Item
                              labelCol={{
                                span: 12,
                              }}
                              {...restField}
                              hasFeedback
                              name={[name, "t"]}
                              label={`T-mm`}
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "Please input Thickness of dimension!",
                                },
                              ]}
                            >
                              <InputNumber min={1} placeholder="Thick" />
                            </Form.Item>
                          </Col>

                          <Col md={6} xs={12}>
                            <Form.Item
                              initialValue={"mm"}
                              {...restField}
                              hasFeedback
                              name={[name, "unit"]}
                              label="Unit"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input Sheet!",
                                },
                              ]}
                            >
                              <Select placeholder="Unit">
                                <Option value={"mm"}>mm</Option>
                                <Option value={"in."}>in.</Option>
                              </Select>
                            </Form.Item>
                          </Col>

                          <Col md={8} xs={12}>
                            <Form.Item
                              {...restField}
                              hasFeedback
                              name={[name, "h"]}
                              label={`H-${cCross[key]?.unit || "mm"}`}
                              rules={[
                                {
                                  required: true,
                                  message: "Please input Height!",
                                },
                              ]}
                            >
                              <InputNumber min={1} placeholder="Height" />
                            </Form.Item>
                          </Col>
                          <Col md={8} xs={12}>
                            <Form.Item
                              labelCol={{
                                span: 12,
                              }}
                              {...restField}
                              hasFeedback
                              name={[name, "wIn"]}
                              label={`W(In)-${cCross[key]?.unit || "mm"}`}
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
                              labelCol={{
                                span: 14,
                              }}
                              {...restField}
                              hasFeedback
                              name={[name, "wOut"]}
                              label={`W(Out)-${cCross[key]?.unit || "mm"}`}
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

                          <Col md={12} xs={12}>
                            <Form.Item
                              labelCol={{
                                span: 8,
                              }}
                              {...restField}
                              initialValue={"m"}
                              hasFeedback
                              name={[name, "lengthUnit"]}
                              label="Length Unit"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input Sheet!",
                                },
                              ]}
                            >
                              <Select placeholder=" length Unit">
                                <Option value={"ft."}>ft.</Option>
                                <Option value={"m"}>m</Option>
                                <Option value={"in."}>in.</Option>
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col md={12} xs={12}>
                            <Form.Item
                              labelCol={{
                                span: 12,
                              }}
                              {...restField}
                              hasFeedback
                              name={[name, "l"]}
                              label={`Length (${
                                cCross[key]?.lengthUnit || "m"
                              })`}
                              rules={[
                                {
                                  required: true,
                                  message: "Please input Length of dimension!",
                                },
                              ]}
                            >
                              <InputNumber min={1} placeholder="Length" />
                            </Form.Item>
                          </Col>

                          <Col md={24} xs={24}>
                            <Form.Item
                              labelCol={{
                                span: 10,
                              }}
                              name={[name, "hasCover"]}
                              label="Has Cover"
                              initialValue={false}
                            >
                              <Radio.Group disabled={!cLadder[key]?.w}>
                                <Radio value={false}>No</Radio>
                                <Radio value={true}>Yes</Radio>
                              </Radio.Group>
                            </Form.Item>
                          </Col>
                          {cCross[key]?.hasCover ? (
                            <>
                              <Divider orientation="left">Cover</Divider>
                              <Col md={12} xs={12}>
                                <Form.Item
                                  {...restField}
                                  hasFeedback
                                  name={[name, "tC"]}
                                  label={`Cover Thickness-mm`}
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        "Please input Thickness of dimension!",
                                    },
                                  ]}
                                >
                                  <InputNumber min={1} placeholder="Thick" />
                                </Form.Item>
                              </Col>
                            </>
                          ) : (
                            ""
                          )}
                          <Divider>
                            <Space>
                              {/* {`${(CTray(cTray[key]) * (1 + sWaste))?.toFixed(
                                2,
                              )} Kg`} */}

                              <Tooltip
                                placement="topLeft"
                                color="red"
                                title="Delete"
                              >
                                <DeleteOutlined onClick={() => remove(name)} />
                              </Tooltip>
                            </Space>
                          </Divider>
                        </AppRowContainer>
                      ))}
                      <Form.Item>
                        <Button
                          //style={{width: '50%'}}
                          type="dashed"
                          onClick={() =>
                            add({
                              qty: 1,
                              sType: "MS Powder Coated",
                              unit: "mm",
                              lengthUnit: "m",
                            })
                          }
                          block
                          icon={<PlusOutlined />}
                        >
                          Add Cross
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Card>
            </Badge.Ribbon>
          </Col>
        </AppRowContainer>
      </Form>
    </div>
  );
};

export default CableTray;
