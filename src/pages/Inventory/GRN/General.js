import { Col, DatePicker, Form, Input, Row } from "antd";
import React from "react";

const General = ({ selected }) => {
  return (
    <Row style={{ marginBottom: "0px" }}>
      <Col xs={24} md={8}>
        <Form.Item name="" label="P.O">
          {selected?.po?.cuId} ,By {selected?.po?.createdBy?.name}
        </Form.Item>
      </Col>
      <Col xs={24} md={8}>
        <Form.Item name="" label="GateIn">
          {selected?.gateIn?.cuId} ,By {selected?.gateIn?.createdBy?.name}
        </Form.Item>
      </Col>
      {selected?.quality && (
        <Col xs={24} md={8}>
          <Form.Item name="" label="Quality">
            {selected?.quality?.cuId} ,By {selected?.quality?.createdBy?.name}
          </Form.Item>
        </Col>
      )}
      {/* <Col xs={24} md={6}>
        <Form.Item name="createdDate" label="Created">
          <DatePicker />
        </Form.Item>
      </Col> */}
    </Row>
  );
};

export default General;
