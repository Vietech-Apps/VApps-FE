import {
  PageContainer,
  ProCard,
  ProList,
  ProTable,
} from "@ant-design/pro-components";
import { Button, Col, Collapse, Progress, Row, Space, Table, Tag } from "antd";
import FormLayout from "meta/JLayouts/Layout";
import errorHandler from "meta/services/auth/errorHandler";
import jwtAxios from "meta/services/auth/jwt-api";

import { useEffect, useState } from "react";
import { JEInfo } from "../JournalItems/Codes";
import AppPageMetadata from "meta/core/AppPageMetadata";

const GeneralLedger = () => {
  const [dataSource, setDataSource] = useState([]);
  const [refreshing, setRefreshing] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await jwtAxios.get("accounts/jItems/contactGrouped");
        console.log(res.data.result);
        setDataSource(res.data.result);
      } catch (error) {
        errorHandler(error);
      }
    };
    fetchData();
  }, [refreshing]);
  const totalDebit = dataSource?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.overallTotalDebit,
    0
  );
  const totalCredit = dataSource?.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.overallTotalCredit,
    0
  );
  let balance = totalDebit - totalCredit;
  return (
    <>
      {" "}
      <AppPageMetadata title="Partner Ledger" />
      <PageContainer
        header={{
          title: "Partner Ledger",

          extra: [
            <Button key="1" onClick={() => setRefreshing(refreshing + 1)}>
              Refresh
            </Button>,
          ],
        }}
      >
        <ProCard direction="column" gutter={[0, 16]}>
          <Row gutter={12} style={{ backgroundColor: "#ECEDEE" }}>
            <Col md={1}></Col>
            <Col md={5}>Reference</Col>
            <Col md={3}>Date</Col>
            <Col md={5}>Account</Col>
            <Col md={3}>Debit </Col>
            <Col md={3}>Credit </Col>
            <Col md={3}>Balance</Col>
          </Row>
          <Row gutter={12} style={{ backgroundColor: "#ECEDEE" }}>
            <Col md={1}></Col>
            <Col md={5}></Col>
            <Col md={3}></Col>
            <Col md={5}></Col>

            <Col md={3}>
              <Tag> {totalDebit?.toFixed(4)}</Tag>
            </Col>
            <Col md={3}>
              <Tag> {totalCredit?.toFixed(4)}</Tag>
            </Col>
            <Col md={3}>
              <Tag color={totalDebit > totalCredit ? "green" : "red"}>
                {balance?.toFixed(4)}
              </Tag>
            </Col>
          </Row>
          <Collapse bordered={false} defaultActiveKey={["0", "1"]}>
            {dataSource?.map((item, i) => (
              <Collapse.Panel
                header={`${item.contact?.title} - ${item.transactions?.length}`}
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
                  dataSource={item.transactions}
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
                      title: "Account",
                      dataIndex: "account",
                      width: "19%",
                      key: "3",
                    },

                    {
                      title: "Debit",
                      dataIndex: "totalDebit",
                      width: "9%",
                      key: "4",
                      valueType: "digit",
                    },
                    {
                      title: "Credit",
                      dataIndex: "totalCredit",
                      width: "9%",
                      key: "5",
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
                    let Balance =
                      item.overallTotalDebit - item.overallTotalCredit;
                    return (
                      <Table.Summary fixed>
                        <Table.Summary.Row
                          style={{ backgroundColor: "#ECEDEE" }}
                        >
                          <Table.Summary.Cell index={0} colSpan={3}>
                            Total
                          </Table.Summary.Cell>

                          <Table.Summary.Cell index={3}>
                            {item.overallTotalDebit}
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={1}>
                            {item.overallTotalCredit}
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
          </Collapse>
        </ProCard>
      </PageContainer>
    </>
  );
};
export default GeneralLedger;
