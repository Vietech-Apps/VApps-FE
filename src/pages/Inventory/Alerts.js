import { CheckCard } from "@ant-design/pro-components";
import { Button, Col, Row, Statistic } from "antd";
import FormLayout from "meta/JLayouts/Layout";
import AppPageMetadata from "meta/core/AppPageMetadata";
import { useGetData } from "meta/services/auth/ezAPI";
import React from "react";
import { useNavigate } from "react-router-dom";

const Alerts = () => {
  const navigate = useNavigate();
  const [{ apiData: data, loading }, { setRefreshing }] = useGetData(
    `erp/Inventory/Alerts`,
    []
  );
  const handleNavigateInvReceipt = (status) => {
    navigate(`/Inventory/Receipts?status=${status}`);
  };
  const handleNavigate = (status) => {
    navigate(`/Purchase/MaterialDemand?status=${status}`);
  };
  return (
    <FormLayout
      title={"Alerts"}
      extra={
        <Button onClick={() => setRefreshing(true)} loading={loading}>
          Refresh
        </Button>
      }
    >
      <AppPageMetadata title="Alerts" />
      <Row gutter={12}>
        <Col md={12}>
          <CheckCard
            size="large"
            title={`Total ${data?.InvReceipts?.total} Receipts`}
            description={
              <Row gutter={16}>
                <Col span={4}>
                  <Statistic
                    title="Drafts"
                    value={data?.InvReceipts?.drafts}
                    loading={loading}
                  />
                  <Button
                    type="link"
                    onClick={() => handleNavigateInvReceipt("Drafts")}
                  >
                    Detail
                  </Button>
                </Col>
                <Col span={4}>
                  <Statistic
                    title="Waiting"
                    value={data?.InvReceipts?.waiting}
                    loading={loading}
                  />
                  <Button
                    type="link"
                    onClick={() => handleNavigateInvReceipt("Waiting")}
                  >
                    Detail
                  </Button>
                </Col>
                <Col span={5}>
                  <Statistic
                    title="Ready"
                    value={data?.InvReceipts?.ready}
                    loading={loading}
                  />
                  <Button
                    type="link"
                    onClick={() => handleNavigateInvReceipt("Ready")}
                  >
                    Detail
                  </Button>
                </Col>

                <Col span={5}>
                  <Statistic
                    title="Done"
                    value={data?.InvReceipts?.done}
                    loading={loading}
                  />
                  <Button
                    type="link"
                    onClick={() => handleNavigateInvReceipt("Done")}
                  >
                    Detail
                  </Button>
                </Col>
                {/* <Col span={6}>
                  <Statistic
                    title="Completed"
                    value={data?.Completed}
                    loading={loading}
                  />
                  <Button
                    type="link"
                    onClick={() => handleNavigate("Complete")}
                  >
                    Detail
                  </Button>
                </Col> */}
              </Row>
            }
            onChange={(checked) => {
              console.log("checked", checked);
            }}
            defaultChecked
            onClick={() => {
              console.log("clicked");
            }}
          />
        </Col>
        <Col md={12}>
          <CheckCard
            size="large"
            title={`Total ${data?.Total} GateIn`}
            description={
              <Row gutter={16}>
                <Col span={4}>
                  <Statistic
                    title="Drafts"
                    value={data?.Drafts}
                    loading={loading}
                  />
                  <Button type="link" onClick={() => handleNavigate("Drafts")}>
                    Detail
                  </Button>
                </Col>
                <Col span={4}>
                  <Statistic
                    title="Open"
                    value={data?.Accepted}
                    loading={loading}
                  />
                  <Button
                    type="link"
                    onClick={() => handleNavigate("Accepted")}
                  >
                    Detail
                  </Button>
                </Col>
                <Col span={5}>
                  <Statistic
                    title="Rejected"
                    value={data?.Rejected}
                    loading={loading}
                  />
                  <Button
                    type="link"
                    onClick={() => handleNavigate("Rejected")}
                  >
                    Detail
                  </Button>
                </Col>

                <Col span={5}>
                  <Statistic
                    title="Post"
                    value={data?.Post}
                    loading={loading}
                  />
                  <Button type="link" onClick={() => handleNavigate("Post")}>
                    Detail
                  </Button>
                </Col>
                <Col span={6}>
                  <Statistic
                    title="Completed"
                    value={data?.Completed}
                    loading={loading}
                  />
                  <Button
                    type="link"
                    onClick={() => handleNavigate("Complete")}
                  >
                    Detail
                  </Button>
                </Col>
              </Row>
            }
            onChange={(checked) => {
              console.log("checked", checked);
            }}
            defaultChecked
            onClick={() => {
              console.log("clicked");
            }}
          />
        </Col>
        <Col md={12}>
          <CheckCard
            size="large"
            title={`Total ${data?.Total} Quality`}
            description={
              <Row gutter={16}>
                <Col span={4}>
                  <Statistic
                    title="Drafts"
                    value={data?.Drafts}
                    loading={loading}
                  />
                  <Button type="link" onClick={() => handleNavigate("Drafts")}>
                    Detail
                  </Button>
                </Col>
                <Col span={4}>
                  <Statistic
                    title="Open"
                    value={data?.Accepted}
                    loading={loading}
                  />
                  <Button
                    type="link"
                    onClick={() => handleNavigate("Accepted")}
                  >
                    Detail
                  </Button>
                </Col>
                <Col span={5}>
                  <Statistic
                    title="Rejected"
                    value={data?.Rejected}
                    loading={loading}
                  />
                  <Button
                    type="link"
                    onClick={() => handleNavigate("Rejected")}
                  >
                    Detail
                  </Button>
                </Col>

                <Col span={5}>
                  <Statistic
                    title="Post"
                    value={data?.Post}
                    loading={loading}
                  />
                  <Button type="link" onClick={() => handleNavigate("Post")}>
                    Detail
                  </Button>
                </Col>
                <Col span={6}>
                  <Statistic
                    title="Completed"
                    value={data?.Completed}
                    loading={loading}
                  />
                  <Button
                    type="link"
                    onClick={() => handleNavigate("Complete")}
                  >
                    Detail
                  </Button>
                </Col>
              </Row>
            }
            onChange={(checked) => {
              console.log("checked", checked);
            }}
            defaultChecked
            onClick={() => {
              console.log("clicked");
            }}
          />
        </Col>
      </Row>
    </FormLayout>
  );
};

export default Alerts;
