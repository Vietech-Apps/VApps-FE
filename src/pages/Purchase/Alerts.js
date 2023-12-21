import { CheckCard } from "@ant-design/pro-components";
import { Button, Col, Row, Statistic } from "antd";
import FormLayout from "meta/JLayouts/Layout";
import AppPageMetadata from "meta/core/AppPageMetadata";
import { useGetData } from "meta/services/auth/ezAPI";
import React from "react";
import { useNavigate } from "react-router-dom";

const Alerts = () => {
  const navigate = useNavigate();
  const [{ apiData: demandData, loading }, { setRefreshing }] = useGetData(
    `erp/Purchase/MD/alerts`,
    []
  );
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
            title={`Total ${demandData?.Total} Purchase Demand`}
            description={
              <Row gutter={16}>
                <Col span={4}>
                  <Statistic
                    title="Drafts"
                    value={demandData?.Drafts}
                    loading={loading}
                  />
                  <Button type="link" onClick={() => handleNavigate("Drafts")}>
                    Detail
                  </Button>
                </Col>
                <Col span={4}>
                  <Statistic
                    title="Open"
                    value={demandData?.Accepted}
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
                    value={demandData?.Rejected}
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
                    value={demandData?.Post}
                    loading={loading}
                  />
                  <Button type="link" onClick={() => handleNavigate("Post")}>
                    Detail
                  </Button>
                </Col>
                <Col span={6}>
                  <Statistic
                    title="Completed"
                    value={demandData?.Completed}
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
