import {
  PageContainer,
  ProCard,
  ProList,
  ProTable,
} from "@ant-design/pro-components";
import {
  Button,
  Col,
  Collapse,
  Divider,
  Progress,
  Row,
  Space,
  Table,
  Tag,
} from "antd";
import FormLayout from "meta/JLayouts/Layout";
import errorHandler from "meta/services/auth/errorHandler";
import jwtAxios from "meta/services/auth/jwt-api";

import { useEffect, useState } from "react";
import { JEInfo } from "../JournalItems/Codes";
import AppPageMetadata from "meta/core/AppPageMetadata";
import {
  StyledTrailBalanceCollapse,
  StyledTrialScroll,
} from "meta/JLayouts/index.styled";
import moment from "moment";
import { useGetData } from "meta/services/auth/ezAPI";

const GeneralLedger = () => {
  const [
    { apiData: dataSource, loading: loading, refreshing },
    { setData: setDataSource, setRefreshing },
  ] = useGetData(`accounts/jItems/grouped`, []);
  const totalDebit = dataSource?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.totalDebit,
    0
  );
  const totalCredit = dataSource?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.totalCredit,
    0
  );
  let balance = totalDebit - totalCredit;
  const { Panel } = Collapse;
  return (
    <>
      <AppPageMetadata title="Trail Balance" />
      <PageContainer
        header={{
          title: "Trail Balance",
          ghost: true,

          extra: [
            <Button key="1" onClick={() => setRefreshing(refreshing + 1)}>
              Refresh
            </Button>,
          ],
        }}
      >
        {/* <ProCard direction="column" gutter={[0, 16]}> */}
        <StyledTrialScroll>
          <div className="layout-scroll">
            <div style={{ padding: "12px 16px" }}>
              <Row gutter={24} className="flex justify-end">
                <Col xs={3}>
                  <b>Total</b>
                </Col>
                <Col xs={3}>
                  <b>{totalCredit?.toFixed(2).toLocaleString()}</b>
                </Col>
                <Col xs={3}>
                  <b>{totalDebit?.toFixed(2)?.toLocaleString()}</b>
                </Col>
                <Col xs={3}>
                  <Tag color={balance < 1 ? "green" : "red"}>
                    {balance?.toFixed(4)?.toLocaleString()}
                  </Tag>
                </Col>
              </Row>
            </div>

            <StyledTrailBalanceCollapse>
              <Panel
                disabled
                expandIcon={null}
                key="1"
                header={
                  <Row gutter={24}>
                    <Col xs={4}>
                      <b>Reference</b>
                    </Col>
                    <Col xs={3}>
                      <b>Date</b>
                    </Col>
                    <Col xs={5}>
                      <b>Partner</b>
                    </Col>
                    <Col xs={3}>
                      <b>Detail</b>
                    </Col>
                    <Col xs={3}>
                      <b>Credit</b>
                    </Col>
                    <Col xs={3}>
                      <b>Debit</b>
                    </Col>
                    <Col xs={3}>
                      <b>Balance</b>
                    </Col>
                  </Row>
                }
              ></Panel>
              {dataSource?.map((item, i) => (
                <Panel
                  key={i + 2}
                  header={
                    <Row gutter={24} className="flex ">
                      <Col xs={15} style={{ paddingLeft: "3px" }}>
                        {item.code} - {item.name}
                      </Col>
                      <Col xs={3} style={{ paddingLeft: "3px" }}>
                        {item.totalCredit?.toFixed(2)?.toLocaleString()}
                      </Col>
                      <Col xs={3} style={{ paddingLeft: "2px" }}>
                        {item.totalDebit?.toFixed(2)?.toLocaleString()}
                      </Col>
                      {/* <Col xs={3}>{balance.toFixed(2)?.toLocaleString()}</Col> */}
                    </Row>
                  }
                >
                  {/* {item.memos?.map((c, ind) => (
                    <Row gutter={24} key={ind}>
                      <Col xs={4}>{c.reference}</Col>
                      <Col xs={3}>
                        {moment(c.createdAt).format("DD-MM-YYYY")}
                      </Col>
                      <Col xs={5}>{c.contact}</Col>
                      <Col xs={3}>{c.notes} </Col>
                      <Col xs={3}>
                        {c.totalCredit.toFixed(2)?.toLocaleString()}{" "}
                      </Col>
                      <Col xs={3}>
                        {c.totalDebit.toFixed(2)?.toLocaleString()}
                      </Col>
                      <Col xs={3}></Col>
                    </Row>
                  ))} */}
                </Panel>
              ))}
            </StyledTrailBalanceCollapse>
          </div>
        </StyledTrialScroll>
      </PageContainer>
    </>
  );
};
export default GeneralLedger;
