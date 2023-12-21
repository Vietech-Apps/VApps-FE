import { Button, Card, Col, Collapse, Row, Cascader } from "antd";
import { List } from "antd";
import {
  StyledDashedCard,
  StyledList,
  StyledListCard,
  StyledListItem,
  StyledCardTabs,
} from "../index.styled";
import { useState } from "react";
import ReconcileTable from "./ReconcileTable";
import { WarningFilled } from "@ant-design/icons";
import { Rs } from "meta/Reusable/CalcData";
const ReconcileItem = ({ item }) => {
  const [tableShow, settableShow] = useState({ table: true, itemTab: 2 });
  const [subTotal, setsubTotal] = useState(23300);
  const [selectedItems, setselectedItems] = useState([]);

  let items = [
    {
      label: "Match",
      key: 1,
      children: (
        <>
          {tableShow.table == false ? (
            <StyledListCard>
              <List.Item>
                <StyledList className="border-green-500 bg-green-300 ">
                  <StyledListItem>
                    <div className=" font-bold d-flex ">{item.title}</div>
                    <div className="font-bold ">{item.date}</div>
                  </StyledListItem>
                  <StyledListItem>
                    <div className="font-italic text-gray-500 ">
                      {item.label}
                    </div>
                    <div className="font-bold text ">{item.price}</div>
                  </StyledListItem>
                </StyledList>
              </List.Item>
            </StyledListCard>
          ) : (
            <>
              <StyledList>
                <StyledListItem className="flex justify-between ">
                  <div className="font-medium ">
                    <b>Selected Sub Total:</b>
                  </div>
                  <div className="font-bold text ">{Rs(subTotal)}</div>
                </StyledListItem>
                <StyledListItem className="flex justify-between">
                  <div
                    className="font-medium "
                    style={{ borderTop: "1px solid #d9d9d9" }}
                  >
                    Must align subtotal with
                    {item.spent ? " spent money" : " received money"}
                  </div>
                  <div className="text-right">
                    <div
                      style={{ borderTop: "1px solid #d9d9d9" }}
                      className=""
                    >
                      <div className="text-red-500 font-bold">
                        <WarningFilled className="mr-3" />
                        Total is out by -3,834
                      </div>
                    </div>
                  </div>
                </StyledListItem>
              </StyledList>
            </>
          )}
        </>
      ),
    },
    {
      label: "Create",
      key: 2,
      children: (
        <>
          <StyledDashedCard>
            <div className="font-semiBold text-gray-500 text-base">
              Find and Select Matching transactions below
            </div>
          </StyledDashedCard>
        </>
      ),
    },
    {
      label: "Transfer",
      key: 3,
      children: (
        <>
          <StyledDashedCard>
            <div className="font-semiBold text-gray-500 text-base">
              Find and Select Matching transactions below
            </div>
          </StyledDashedCard>
        </>
      ),
    },
    {
      label: "Discuss",
      key: 4,
      children: (
        <>
          <StyledDashedCard>
            <div className="font-semiBold text-gray-500 text-base">
              Find and Select Matching transactions below
            </div>
          </StyledDashedCard>
        </>
      ),
    },
  ];
  const data = [
    {
      title: "Azure Interior",
      date: "01/01/2023",
      label: "INV/2023/00002 and INV/2023/00003",
      price: "$ 1,275.00",
    },
  ];

  return (
    <>
      <Col xs={24} lg={11}>
        <StyledCardTabs
          className="tabs-card mb-4"
          items={items}
          defaultActiveKey={2}
          onChange={(e) =>
            settableShow(() =>
              tableShow.table === true
                ? { table: true, itemTab: e }
                : { table: false, itemTab: e }
            )
          }
        />
      </Col>
      {tableShow.table == true && tableShow.itemTab === 1 ? (
        <Col xs={24}>
          <ReconcileTable
            selectedItems={selectedItems}
            setselectedItems={setselectedItems}
            tableShow={tableShow}
          />
        </Col>
      ) : null}
    </>
  );
};
export default ReconcileItem;
