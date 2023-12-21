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
      <AppPageMetadata title="General Ledger" />
      <PageContainer
        header={{
          title: "General Ledger",
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
                <Col xs={1}></Col>
                <Col xs={2}>
                  <b>{totalCredit?.toFixed(2).toLocaleString()}</b>
                </Col>
                <Col xs={2}>
                  <b>{totalDebit?.toFixed(2)?.toLocaleString()}</b>
                </Col>
                <Col xs={2}>
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
                    <Col xs={2}>
                      <b>Date</b>
                    </Col>
                    <Col xs={6}>
                      <b>Partner</b>
                    </Col>
                    <Col xs={6}>
                      <b>Detail</b>
                    </Col>
                    <Col xs={2}>
                      <b>Credit</b>
                    </Col>
                    <Col xs={2}>
                      <b>Debit</b>
                    </Col>
                    <Col xs={2}>
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
                      <Col xs={18} style={{ paddingLeft: "3px" }}>
                        <b>
                          {" "}
                          {item.code} - {item.name}
                        </b>
                      </Col>
                      <Col xs={2} style={{ paddingLeft: "3px" }}>
                        <b> {item.totalCredit?.toFixed(2)?.toLocaleString()}</b>
                      </Col>
                      <Col xs={2} style={{ paddingLeft: "2px" }}>
                        <b> {item.totalDebit?.toFixed(2)?.toLocaleString()}</b>
                      </Col>
                      <Col xs={2}>
                        <b>{(item.totalDebit - item.totalCredit).toFixed(2)}</b>
                      </Col>
                    </Row>
                  }
                >
                  {item.memos?.map((c, ind) => (
                    <Row gutter={24} key={ind}>
                      <Col xs={4}>{c.reference}</Col>
                      <Col xs={2}>
                        {moment(c.createdAt).format("DD-MM-YYYY")}
                      </Col>
                      <Col xs={6}>{c.contact}</Col>

                      <Col xs={6}>{c.notes} </Col>
                      <Col xs={2}>
                        {c.totalCredit.toFixed(2)?.toLocaleString()}{" "}
                      </Col>
                      <Col xs={2}>
                        {c.totalDebit.toFixed(2)?.toLocaleString()}
                      </Col>
                      <Col xs={2}></Col>
                    </Row>
                  ))}
                </Panel>
              ))}
            </StyledTrailBalanceCollapse>
          </div>
        </StyledTrialScroll>
        {/* <Row gutter={12}>
            <Col md={1}></Col>
            <Col md={5}>Reference</Col>
            <Col md={3}>Date</Col>
            <Col md={5}>Partner</Col>
            <Col md={3}>Credit </Col>
            <Col md={3}>Debit </Col>
            <Col md={3}>Balance</Col>
          </Row>
          <Row gutter={12}>
            <Col md={1}></Col>
            <Col md={5}></Col>
            <Col md={3}></Col>
            <Col md={5}></Col>
            <Col md={3}>
              <Tag> {totalCredit?.toFixed(4)}</Tag>
            </Col>
            <Col md={3}>
              <Tag> {totalDebit?.toFixed(4)}</Tag>
            </Col>
            <Col md={3}>
              <Tag color={balance < 1 ? "green" : "red"}>
                {balance?.toFixed(4)}
              </Tag>
            </Col>
          </Row>
          <Collapse bordered={false} defaultActiveKey={["0", "1"]}>
            {dataSource?.map((item, i) => (
              <Collapse.Panel
                header={`${item.code} - ${item.name}`}
                key={i}
                // extra={
                //   <Row gutter={6}>
                //     <Col md={4}>{item.totalCredit}</Col>
                //     <Col md={4}>{item.totalCredit}</Col>
                //   </Row>
                // }
              >
                <ProTable
                  search={false}
                  toolBarRender={false}
                  bordered={false}
                  showHeader={false}
                  dataSource={item.memos}
                  pagination={false}
                  size="small"
                  rowKey={(c) => c._id}
                  columns={[
                    {
                      title: "Reference",
                      dataIndex: "reference",
                      width: "16%",
                      key: "1",
                    },
                    {
                      title: "createdAt",
                      dataIndex: "createdAt",
                      valueType: "date",
                      width: "10%",
                      key: "2",
                    },
                    {
                      title: "Partner",
                      dataIndex: "contact",
                      width: "19%",
                      key: "3",
                    },
                    {
                      title: "Credit",
                      dataIndex: "totalCredit",
                      width: "9%",
                      key: "5",
                      valueType: "digit",
                    },
                    {
                      title: "Debit",
                      dataIndex: "totalDebit",
                      width: "9%",
                      key: "4",
                      valueType: "digit",
                    },
                    {
                      title: "Balance",
                      render: (c, r) => 0,
                      width: "10%",
                      key: "4",
                      valueType: "digit",
                    },
                  ]}
                  summary={() => {
                    let Balance = item.totalDebit - item.totalCredit;
                    return (
                      <Table.Summary fixed>
                        <Table.Summary.Row>
                          <Table.Summary.Cell index={0} colSpan={3}>
                            Total
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={1}>
                            {item.totalCredit}
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={3}>
                            {item.totalDebit}
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={4}>
                            {Balance.toFixed(2)}
                          </Table.Summary.Cell>
                        </Table.Summary.Row>
                      </Table.Summary>
                    );
                  }}
                />
              </Collapse.Panel>
            ))}
          </Collapse> */}
        {/* </ProCard> */}
      </PageContainer>
    </>
  );
};
export default GeneralLedger;
