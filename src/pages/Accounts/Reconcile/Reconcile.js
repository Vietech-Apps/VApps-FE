import { Button, Checkbox, Col, Form, Input, Row, Table, Tag } from "antd";
import { List } from "antd";
import { useState } from "react";
import {
  StyledFindTransaction,
  StyledList,
  StyledListCard,
  StyledListItem,
} from "../index.styled";
import { CheckCircleOutlined, SwapOutlined } from "@ant-design/icons";
import ReconcileItem from "./ReconcileItem";
import dayjs from "dayjs";
import ReconcileTable from "./ReconcileTable";
import { Rs } from "meta/Reusable/CalcData";
import { BiTimeFive } from "react-icons/bi";
import { IoMdTime } from "react-icons/io";
const Reconcile = ({ transactions }) => {
  return (
    <>
      {transactions?.map((item, index) => (
        <Row key={index} gutter={24} className="flex items-end">
          <Col xs={24} lg={10}>
            <StyledListCard>
              <List.Item>
                <StyledList className="mb-4">
                  <StyledListItem>
                    <div className=" font-bold  d-flex">{item.description}</div>
                    <div className="font-bold ">
                      {dayjs(item.date).format("DD-MM-YY")}
                    </div>
                  </StyledListItem>
                  <StyledListItem>
                    <div className="font-italic text-gray-500 ">
                      {item.checkNo}
                    </div>
                    {item.received ? (
                      <div className="font-bold text ">{Rs(item.debit)}</div>
                    ) : (
                      <div className="font-bold text text-red-500">
                        {Rs(item.credit)}
                      </div>
                    )}
                  </StyledListItem>
                </StyledList>
              </List.Item>
            </StyledListCard>
          </Col>
          <Col
            xs={20}
            sm={6}
            lg={3}
            className="flex  items-center m-auto flex-col"
          >
            <Button
              type="primary"
              className="rounded-full w-full flex items-center justify-center font-medium mb-2"
              icon={<SwapOutlined />}
              size="small"
            >
              Verify
            </Button>
            <Button
              className="rounded-full  w-full  font-medium mb-4 "
              icon={<IoMdTime />}
              size="small"
            >
              Hold
            </Button>
          </Col>
          <ReconcileItem item={item} />
        </Row>
      ))}
    </>
  );
};
export default Reconcile;
