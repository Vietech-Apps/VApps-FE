import {
  Form,
  Row,
  Space,
  Typography,
  Select,
  InputNumber,
  Col,
  Input,
} from "antd";
import { useGetData } from "meta/services/auth/ezAPI";
import React, { useEffect, useState } from "react";
import { Rs } from "meta/Reusable/CalcData";
import { StyledTaxAndRoundOff } from "meta/Reusable/index.styled";
import TaxModal from "meta/Reusable/TaxModal";

const CalcFooter = ({ form, subTotal, data }) => {
  const [{ apiData: tax }, { setData: setTax }] = useGetData(
    `erp/tax/alllist`,
    []
  );

  useEffect(() => {
    form.setFieldValue("taxType", data?.taxType || 0);
  }, []);

  const taxType = Form.useWatch("taxType", form);
  const roundOff = Form.useWatch("roundOff", form);
  const [grandTotal, setGrandTotal] = useState();
  const [discount, setDiscount] = useState();
  useEffect(() => {
    let grand = +subTotal;
    if (discount) {
      grand -= +discount;
    }
    if (taxType) {
      grand += (grand * +taxType) / 100;
    }
    grand += +roundOff || 0;
    setGrandTotal(grand);
  }, [roundOff, discount, taxType, subTotal]);

  const handlePercentageDiscountChange = (value) => {
    form.setFieldValue("fixDiscount", 0);
    let newDisc = (Number(subTotal) * value) / 100;
    setDiscount(newDisc);
  };

  const handleFixDiscountChange = (value) => {
    form.setFieldValue("percentDiscount", 0);
    setDiscount(value);
  };
  const { Text } = Typography;

  return (
    <div>
      <StyledTaxAndRoundOff form={form} layout="vertical">
        <Row
          gutter={12}
          className="justify-content-end align-items-center  mb-3"
        >
          <Col xs={24} sm={5} md={5}>
            <Text strong>Sub Total:</Text>
          </Col>

          <Col xs={24} sm={4} md={4} className="text-align-right">
            <Form.Item className="mb-0" name="subTotal">
              <b>{Rs(subTotal)}</b>
            </Form.Item>
          </Col>
        </Row>
        {/* <Row
          gutter={12}
          className="justify-content-end align-items-center mb-3"
        >
          <Col xs={24} sm={3} md={3}>
            <Text strong>Discount:</Text>
          </Col>
          <Col xs={24} sm={2} md={3}>
            <Form.Item name={"percentDiscount"} className="mb-0">
              <InputNumber
                min={0}
                max={80}
                formatter={(value) => `${value}%`}
                parser={(value) => value.replace("%", "")}
                style={{ width: "100%" }}
                onChange={handlePercentageDiscountChange}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={3} md={3}>
            <Form.Item name="fixDiscount" className="mb-0">
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                onChange={handleFixDiscountChange}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={3} md={4} className="text-align-right">
            <Text strong>{Rs(discount)}</Text>
          </Col>
        </Row> */}
        <Row
          gutter={12}
          className="justify-content-end align-items-center mb-3"
        >
          <Col xs={24} sm={5} md={5}>
            <Space.Compact block>
              <Form.Item name={"taxType"}  style={{ flex: 1 }}>
                <Select placeholder="Add Tax Rate" allowClear>
                  {tax?.map((p) => (
                    <Select.Option value={p.taxRate} key={p._id}>{`${
                      p.taxName
                    }${" "}[${p.taxRate}%]`}</Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <TaxModal tax={tax} setTax={setTax} />
            </Space.Compact>
          </Col>
          <Col xs={24} sm={4} md={4} className="text-align-right">
            <Form.Item>{Rs((subTotal * +taxType) / 100)}</Form.Item>
          </Col>
        </Row>
        {/* <Row
          gutter={12}
          className="justify-content-end align-items-center mb-3"
        >
          <Col xs={24} sm={3} md={3}>
            <Text strong>Roundoff:</Text>
          </Col>
          <Col xs={24} sm={5} md={6}>
            <Form.Item name={"roundOff"} className="mb-0">
              <InputNumber
                //onChange={(e) => setRoundOff(e)}
                placeholder="Roundoff total"
                style={{ width: "100%" }}
                max={1000}
              />
            </Form.Item>
          </Col>
          <Col xs={3} md={4}></Col>
        </Row> */}
        <Row
          gutter={12}
          className="justify-content-end align-items-center mb-3"
        >
          <Col xs={24} sm={3} md={3}>
            <Text strong className="white-nowrap">
              Grand Total:
            </Text>
          </Col>
          <Col xs={24} sm={4} md={4} className="text-align-right">
            <Form.Item name="grandTotal">
              <b>{Rs(grandTotal)}</b>
            </Form.Item>
          </Col>
        </Row>
      </StyledTaxAndRoundOff>
    </div>
  );
};

export default CalcFooter;
