import {
  Button,
  Col,
  Divider,
  Drawer,
  Form,
  InputNumber,
  Select,
  Space,
} from "antd";
import { AppRowContainer } from "meta";
import { getIconByName } from "meta/common/AppIcons";
import errorHandler from "meta/services/auth/errorHandler";
import jwtAxios from "meta/services/auth/jwt-api";
import {
  copperPrice,
  NetPanel,
  PanelSum,
  PriceOrWeight,
  productCost,
} from "meta/Reusable/CalcData";
import { useEffect, useState } from "react";
import { cubicalWeight } from "./Calculations/CalcCubical";
import successHandler2 from "meta/services/auth/successHandle2";
const CollectionCreateForm = ({ estimation, open, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const lmeRate = Form.useWatch("lmeRate", form);
  const loCuPrice = Form.useWatch("loCuPrice", form);
  const usd = Form.useWatch("usd", form);

  useEffect(() => {
    form.setFieldsValue({
      lmeRate: estimation?.lmeRate || 9000,
      loCuPrice: estimation?.loCuPrice || 2800,
      sPrice: estimation?.sPrice || 300,
      usd: estimation?.usd || 275,
      euro: estimation?.euro || 292.41,
      giPrice: estimation?.giPrice || 400,
      ss304: estimation?.ss304 || 400,
      ss316: estimation?.ss316 || 400,
      hotDip: estimation?.hotDip || 400,
      paintPrice: estimation?.paintPrice || 640,
      copperWaste: estimation?.copperWaste || 5,
      sheetWaste: estimation?.sheetWaste || 10,
      margin: estimation?.margin || 8,
      cableMargin: estimation?.cableMargin || 8,
      cableOH: estimation?.cableOH || 8,
      overhead: estimation?.overhead || 9,
    });
  }, [estimation]);
  return (
    <>
      <Drawer
        title="Add Prices"
        width={450}
        onClose={onCancel}
        size="small"
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onCancel}>Back</Button>
            <Button
              onClick={() => {
                form
                  .validateFields()
                  .then((values) => {
                    form.resetFields();
                    onCreate(values);
                  })
                  .catch((info) => {
                    console.log("Validate Failed:", info);
                  });
              }}
              type="primary"
            >
              Save
            </Button>
          </Space>
        }
      >
        <Form
          form={form}
          layout="horizontal"
          name="form_in_modal"
          autoComplete="off"
          size="small"
          labelCol={{
            span: 12,
          }}
          wrapperCol={{ span: 16 }}
        >
          <AppRowContainer style={{ marginBottom: 1, marginLeft: "15px" }}>
            <Divider
              orientation={"left"}
              style={{
                borderWidth: 2,
                borderColor: "#7cb305",
              }}
            >
              Currency Rate
            </Divider>
            <Col md={12} xs={12}>
              <Form.Item hasFeedback name={"usd"} label="USD">
                <InputNumber prefix="Rs" />
              </Form.Item>
            </Col>
            <Col md={12} xs={12}>
              <Form.Item hasFeedback name={"euro"} label="Euro">
                <InputNumber prefix="Rs" />
              </Form.Item>
            </Col>
            <Divider
              orientation={"left"}
              style={{
                borderWidth: 2,
                borderColor: "#7cb305",
              }}
            >
              Copper/kg Local: Rs.
              {copperPrice(loCuPrice, lmeRate, usd, "localTin")?.toFixed(2)}
              {"   "}
              Imp: Rs.
              {copperPrice(loCuPrice, lmeRate, usd, "impTin")?.toFixed(2)}
            </Divider>
            <Col md={12} xs={12}>
              <Form.Item hasFeedback name={"lmeRate"} label="LME(USD)">
                <InputNumber prefix="$" />
              </Form.Item>
            </Col>
            <Col md={12} xs={12}>
              <Form.Item hasFeedback name={"loCuPrice"} label="Local">
                <InputNumber prefix="Rs" />
              </Form.Item>
            </Col>

            <Divider
              orientation={"left"}
              style={{
                borderWidth: 2,
                borderColor: "#7cb305",
              }}
            >
              Sheet/kg
            </Divider>
            <Col md={12} xs={12}>
              <Form.Item hasFeedback name={"sPrice"} label="MS">
                <InputNumber />
              </Form.Item>
            </Col>
            <Col md={12} xs={12}>
              <Form.Item hasFeedback name={"giPrice"} label="GI">
                <InputNumber />
              </Form.Item>
            </Col>
            <Col md={12} xs={12}>
              <Form.Item hasFeedback name={"ss304"} label="SS[304]">
                <InputNumber />
              </Form.Item>
            </Col>
            <Col md={12} xs={12}>
              <Form.Item hasFeedback name={"ss316"} label="SS[316]">
                <InputNumber />
              </Form.Item>
            </Col>
            <Col md={12} xs={12}>
              <Form.Item hasFeedback name={"hotDip"} label="Hot Dip">
                <InputNumber />
              </Form.Item>
            </Col>
            <Col md={12} xs={12}>
              <Form.Item hasFeedback name={"paintPrice"} label="Paint Price">
                <InputNumber />
              </Form.Item>
            </Col>
            <Divider
              orientation={"left"}
              style={{
                borderWidth: 2,
                borderColor: "#7cb305",
              }}
            >
              Waste %
            </Divider>
            <Col md={12} xs={12}>
              <Form.Item hasFeedback name={"copperWaste"} label="Copper">
                <InputNumber prefix="%" />
              </Form.Item>
            </Col>
            <Col md={12} xs={12}>
              <Form.Item hasFeedback name={"sheetWaste"} label="Sheet">
                <InputNumber prefix="%" />
              </Form.Item>
            </Col>

            <Divider
              orientation={"left"}
              style={{
                borderWidth: 2,
                borderColor: "#7cb305",
              }}
            >
              Margin %
            </Divider>
            <Col md={12} xs={12}>
              <Form.Item hasFeedback label="Panels" name="margin">
                <InputNumber prefix="%" />
              </Form.Item>
            </Col>
            <Col md={12} xs={12}>
              <Form.Item hasFeedback label="Tray & Ladder" name="cableMargin">
                <InputNumber prefix="%" />
              </Form.Item>
            </Col>

            <Divider
              orientation={"left"}
              style={{
                borderWidth: 2,
                borderColor: "#7cb305",
              }}
            >
              Overhead %
            </Divider>
            <Col md={12} xs={12}>
              <Form.Item hasFeedback label="Panels" name="overhead">
                <InputNumber prefix="%" />
              </Form.Item>
            </Col>
            <Col md={12} xs={12}>
              <Form.Item hasFeedback label="Tray & Ladder" name="cableOH">
                <InputNumber prefix="%" />
              </Form.Item>
            </Col>
          </AppRowContainer>
        </Form>
      </Drawer>
    </>
  );
};

const AddPrices = ({
  estimation,
  setPanels,
  panels,
  setEstimation,
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const panelSave = async (e) => {
    try {
      const response = await jwtAxios.put(`erp/panel/update/${e?._id}`, e);
      setPanels((prevPanels) => {
        const updatedPanels = prevPanels.map((panel) => {
          if (panel._id === e._id) {
            return response.data.result;
          }
          return panel;
        });
        return updatedPanels;
      });
    } catch (error) {
      errorHandler(error);
    }
  };
  const UpdatePanels = (estData) => {
    panels?.map((p) => {
      const updatedData = {
        ...p,
        pCost: productCost(p.products, estData),
        aCost: productCost(p.accessories, estData),
        sheetWeight: PriceOrWeight(
          cubicalWeight(p.mainEnclosure, p.height, p.sheetType) +
            cubicalWeight(p.pfiEnclosure, p.height, p.sheetType),
          estimation,
          false,
          p,
          "weight"
        ),
        sheetCost: PriceOrWeight(
          cubicalWeight(p.mainEnclosure, p.height, p.sheetType) +
            cubicalWeight(p.pfiEnclosure, p.height, p.sheetType),
          estimation,
          false,
          p,
          "price"
        ),
        copperWeight: PriceOrWeight(
          p.copperWeightWithoutWaste,
          estimation,
          true,
          p,
          "weight"
        ),
        copperCost: PriceOrWeight(
          p.copperWeightWithoutWaste,
          estimation,
          true,
          p,
          "price"
        ),
      };
      const panelCost = PanelSum(updatedData);
      const updatedPanel = {
        ...updatedData,
        panelCost,
      };

      panelSave(updatedPanel);
    });
  };
  const onCreate = async (values) => {
    values.estimationStatus = estimation.estimationStatus
      ? estimation.estimationStatus
      : "Estimation";
    try {
      const response = await jwtAxios.put(
        `erp/Estimation/update/${estimation?._id}`,
        values
      );
      successHandler2(response);
      setEstimation(response.data.result);
      UpdatePanels(response.data.result);
      setOpen(false);
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
        icon={getIconByName("create")}
        disabled={estimation?.isComplete || disabled}
      >
        Prices
      </Button>
      <CollectionCreateForm
        estimation={estimation}
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};
export default AddPrices;
