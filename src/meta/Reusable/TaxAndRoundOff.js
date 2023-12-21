import {
  Form,
  Row,
  Space,
  Typography,
  Select,
  InputNumber,
  Col,
  Input,
  Tooltip,
} from "antd";
import { useGetData } from "meta/services/auth/ezAPI";
import React, { useEffect, useState } from "react";
import { inWords, inShort } from "meta/Reusable/CalcData";
import TaxModal from "./TaxModal";
import { StyledTaxAndRoundOff } from "./index.styled";

const TaxAndRoundOff = ({
  estimation = false,
  form,
  oh = 0,
  margin = 0,
  subTotal = 0,
}) => {
  const [{ apiData: taxData }, { setData: setTaxData }] = useGetData(
    `erp/tax/alllist`,
    []
  );
  const taxType = Form.useWatch("taxType", form);
  const roundOff = Form.useWatch("roundOff", form);
  const freight = Form.useWatch("freight", form);

  const [grandTotal, setGrandTotal] = useState();
  const [discount, setDiscount] = useState();
  const [taxAmount, setTaxAmount] = useState();
  const [discountAmount, setDiscountAmount] = useState(0);
  useEffect(() => {
    let grand = +subTotal;
    let tax = 0;
    let discount = 0;

    grand += +freight || 0;
    if (discount) {
      discount = +discount;
      grand -= discount;
      setDiscountAmount(discount);
    } else if (form.getFieldValue("percentDiscount")) {
      discount = (grand * form.getFieldValue("percentDiscount")) / 100;
      grand -= discount;
      setDiscountAmount(discount);
    } else if (form.getFieldValue("fixDiscount")) {
      discount = +form.getFieldValue("fixDiscount");
      grand -= discount;
      setDiscountAmount(discount);
    }
    if (taxType) {
      tax = (grand * +taxType || 0) / 100;
      grand += tax;
    }

    setTaxAmount(tax);

    grand += +roundOff || 0;

    setGrandTotal(grand);
  }, [roundOff, discount, taxType, freight, subTotal, form]);

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
    <>
      <StyledTaxAndRoundOff
        labelCol={{
          span: 8,
        }}
        form={form}
        size="small"
        layout="horizontal"
      >
        {estimation && (
          <>
            <Row
              gutter={12}
              className="justify-content-end align-items-center  mb-3"
            >
              <Col xs={24} sm={6} md={6} className="text-align-right">
                <Form.Item
                  label={<Text strong>Over Head</Text>}
                  className="mb-0"
                >
                  <InputNumber
                    disabled
                    formatter={(value) =>
                      `Rs ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                    value={Math.floor(oh)}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={1} md={1}>
                <Tooltip key={4} color="cyan" title={inWords(Math.floor(oh))}>
                  <Text strong className="white-nowrap">
                    {inShort(Math.floor(oh))}
                  </Text>
                </Tooltip>
              </Col>
            </Row>

            <Row
              gutter={12}
              className="justify-content-end align-items-center  mb-3"
            >
              <Col xs={24} sm={6} md={6} className="text-align-right">
                <Form.Item label={<Text strong>Margin</Text>} className="mb-0">
                  <InputNumber
                    disabled
                    formatter={(value) =>
                      `Rs ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                    value={Math.floor(margin)}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={1} md={1}>
                <Tooltip
                  key={4}
                  color="cyan"
                  title={inWords(Math.floor(margin))}
                >
                  <Text strong className="white-nowrap">
                    {inShort(Math.floor(margin))}
                  </Text>
                </Tooltip>
              </Col>
            </Row>
          </>
        )}
        <Row
          gutter={12}
          className="justify-content-end align-items-center  mb-3"
        >
          <Col xs={24} sm={6} md={6} className="text-align-right">
            <Form.Item label={<Text strong>Sub Total</Text>} className="mb-0">
              <InputNumber
                disabled
                formatter={(value) =>
                  `Rs ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                value={Math.floor(subTotal)}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={1} md={1}>
            <Tooltip key={4} color="cyan" title={inWords(Math.floor(subTotal))}>
              <Text strong className="white-nowrap">
                {inShort(Math.floor(subTotal))}
              </Text>
            </Tooltip>
          </Col>
        </Row>

        <Row
          gutter={12}
          className="justify-content-end align-items-center mb-3"
        >
          <Col xs={24} sm={6} md={6}>
            <Form.Item
              name={"freight"}
              label={<Text strong>Freight</Text>}
              className="mb-0"
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={1} md={1}></Col>
        </Row>

        <Row
          gutter={12}
          className="justify-content-end align-items-center mb-3"
        >
          <Col xs={24} sm={4} md={4}>
            <Form.Item
              label={<Text strong>Discount</Text>}
              labelCol={{
                span: 12,
              }}
              name={"percentDiscount"}
              className="mb-0"
            >
              <InputNumber
                min={0}
                max={80}
                formatter={(value) => `${value}%`}
                parser={(value) => value.replace("%", "")}
                onChange={handlePercentageDiscountChange}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={4} md={4}>
            <Form.Item name="fixDiscount" className="mb-0">
              <InputNumber
                min={0}
                style={{ width: "100% " }}
                onChange={handleFixDiscountChange}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={1} md={1}>
            <Tooltip
              key={4}
              color="cyan"
              title={inWords(Math.floor(discountAmount))}
            >
              <Text strong className="white-nowrap">
                {inShort(Math.floor(discountAmount))}
              </Text>
            </Tooltip>
          </Col>
        </Row>
        <Row
          gutter={12}
          className="justify-content-end align-items-center mb-3"
        >
          <Col xs={24} sm={4} md={4}>
            <Form.Item
              label={
                <>
                  <Text strong className="white-nowrap">
                    Tax
                  </Text>
                  <TaxModal tax={taxData} setTax={setTaxData} />
                </>
              }
              name={"taxType"}
            >
              <Select placeholder="Tax Rate" allowClear>
                {taxData?.map((p) => (
                  <Select.Option
                    value={p.taxRate}
                    key={p._id}
                  >{`${p.taxRate}%(${p.taxName})`}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={4} md={4}>
            <Form.Item className="mb-0">
              <InputNumber
                disabled
                formatter={(value) =>
                  `Rs ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                value={Math.floor(taxAmount)}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={1} md={1}>
            <Tooltip
              key={4}
              color="cyan"
              title={inWords(Math.floor(taxAmount))}
            >
              <Text strong className="white-nowrap">
                {inShort(Math.floor(taxAmount))}
              </Text>
            </Tooltip>
          </Col>
        </Row>
        <Row
          gutter={12}
          className="justify-content-end align-items-center mb-3"
        >
          <Col xs={24} sm={6} md={6}>
            <Form.Item
              label={<Text strong>Roundoff</Text>}
              name={"roundOff"}
              className="mb-0"
            >
              <InputNumber
                placeholder="Roundoff total"
                style={{ width: "100%" }}
                max={1000}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={1} md={1}></Col>
        </Row>
        <Row
          gutter={12}
          className="justify-content-end align-items-center mb-3"
        >
          <Col xs={24} sm={6} md={6} className="text-align-right">
            <Form.Item
              label={
                <b>
                  <Text strong className="white-nowrap">
                    Grand Total
                  </Text>
                </b>
              }
            >
              <InputNumber
                formatter={(value) =>
                  `Rs ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                disabled
                value={Math.floor(grandTotal)}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={1} md={1}>
            <Tooltip
              key={4}
              color="cyan"
              title={inWords(Math.floor(grandTotal))}
            >
              <Text strong className="white-nowrap">
                {inShort(Math.floor(grandTotal))}
              </Text>
            </Tooltip>
          </Col>
        </Row>
        <Row
          gutter={12}
          className="justify-content-end align-items-center mb-3"
        >
          <Col xs={24} sm={6} md={6} className="text-align-right">
            {inWords(Math.floor(grandTotal))}
          </Col>
        </Row>
      </StyledTaxAndRoundOff>
    </>
  );
};

export default TaxAndRoundOff;
