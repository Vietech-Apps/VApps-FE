import React, { useEffect, useState } from "react";
import { Button, Collapse, List } from "antd";
import errorHandler from "meta/services/auth/errorHandler";
import jwtAxios from "meta/services/auth/jwt-api";
import {
  CaretRightOutlined,
  EditFilled,
  PlusCircleFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ChatAccountsModal from "./ChartModal";
import { dataInfo, getLabelFromCode } from "../Codes";
import { HiChartBar } from "react-icons/hi";
import { StyledListChart } from "./index.styled";

const AccountTable = () => {
  const navigate = useNavigate();
  const [accountData, setAccountData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await jwtAxios.get(`${dataInfo.dataRoute}/all`);
      const data = buildAccountTree(response.data.result);
      setAccountData(data);
      setLoading(false);
    } catch (error) {
      errorHandler(error);
      setLoading(false);
    }
  };

  const buildAccountTree = (data) => {
    const sortedData = data.sort((a, b) => {
      if (a.accountType !== b.accountType) {
        return a.accountType.localeCompare(b.accountType);
      } else {
        return a.code.localeCompare(b.code);
      }
    });

    const map = {};
    let node;
    const roots = [];

    for (let i = 0; i < sortedData.length; i++) {
      map[sortedData[i]._id] = i;
      sortedData[i].children = [];
    }

    for (let i = 0; i < sortedData.length; i++) {
      node = sortedData[i];
      if (node.parent) {
        const parentNode = sortedData[map[node.parent._id]];
        if (parentNode && parentNode.accountType !== node.accountType) {
          const accountTypeParent = {
            _id: `type_${parentNode.accountType}`,
            name: parentNode.accountType,
            accountType: parentNode.accountType,
            level: parentNode.level - 1,
            children: [node],
          };
          sortedData.push(accountTypeParent);
          roots.push(accountTypeParent);
        } else if (parentNode) {
          parentNode.children.push(node);
        }
      } else {
        roots.push(node);
      }
    }

    return roots;
  };

  const getColor = (type) => {
    switch (type) {
      case "Assets":
        return "#008080"; // teal
      case "Equity":
        return "#0198E1"; // Blue
      case "Liabilities":
        return "#FF7722"; // Orange
      case "Expense":
        return "#fa0269"; // Red
      case "Income":
        return "#0E8C3A"; // Green
      default:
        return "#000000"; // Black
    }
  };

  const flattenedAccounts = [];

  const flattenAccounts = (account, level) => {
    flattenedAccounts.push({ ...account, level });
    account.children.forEach((child) => flattenAccounts(child, level + 1));
  };

  accountData.forEach((account, index) => {
    flattenAccounts(account, 2);
  });

  const [visible, setVisible] = useState(false);
  const [accountId, setAccountId] = useState();

  const handleEdit = (itemId, selectAble) => {
    if (selectAble) {
      navigate(`${dataInfo.dataRoute}/create/${itemId}`);
    } else {
      setAccountId(itemId);
      setVisible(true);
    }
  };

  // Group flattened accounts by account type
  const groupedAccounts = flattenedAccounts.reduce((acc, account) => {
    if (!acc[account.accountType]) {
      acc[account.accountType] = {};
    }
    if (!acc[account.accountType][account.accountCategory]) {
      acc[account.accountType][account.accountCategory] = [];
    }
    acc[account.accountType][account.accountCategory].push(account);
    return acc;
  }, {});

  return (
    <>
      <h1 className="flex justify-center items-center">
        <HiChartBar className="mr-2" /> Chart Of Accounts
      </h1>
      <ChatAccountsModal
        visible={visible}
        setVisible={setVisible}
        FetchData={fetchData}
        id={accountId}
      />
      <div>
        {" "}
        <Button
          icon={<PlusCircleFilled />}
          onClick={() => {
            setVisible(true);
          }}
        >
          Create Branches
        </Button>
      </div>

      <Collapse
        defaultActiveKey={[
          "Assets",
          "Income",
          "Liabilities",
          "Equity",
          "Expense",
        ]}
        bordered={false}
        size="small"
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
      >
        {Object.entries(groupedAccounts)?.map(
          ([accountType, accountCategories], index) => (
            <Collapse.Panel
              key={accountType}
              header={
                <h3
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `${getColor(accountType)}0D`, // 5% lighter color
                    color: getColor(accountType),
                  }}
                >
                  {index + 1}-{accountType}
                </h3>
              }
            >
              {Object.entries(accountCategories)?.map(
                ([accountCategory, accounts]) => (
                  <React.Fragment key={accountCategory}>
                    <h4
                      style={{
                        color: getColor(accountType),
                      }}
                    >
                      {accountCategory}-{getLabelFromCode(accountCategory)}
                    </h4>
                    <StyledListChart
                      dataSource={accounts}
                      size="small"
                      renderItem={(item) => (
                        <List.Item
                          key={item._id}
                          actions={[
                            <Button
                              key={`${item._id}+1`}
                              size="small"
                              type="link"
                              icon={<EditFilled size={"small"} />}
                              style={{ color: getColor(item.accountType) }}
                              onClick={() =>
                                handleEdit(item._id, item.selectAble)
                              }
                            />,
                          ]}
                        >
                          <List.Item.Meta
                            description={
                              <span
                                style={{
                                  color: getColor(item.accountType),
                                  marginLeft: `${
                                    item.level === 2 ? 30 : item.level * 50
                                  }px`, // Indentation according to level
                                }}
                              >
                                {item.code}-
                                {!item.selectAble ? (
                                  <b>{item.name}</b>
                                ) : (
                                  item.name
                                )}
                              </span>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </React.Fragment>
                )
              )}
            </Collapse.Panel>
          )
        )}
      </Collapse>
    </>
  );
};

export default AccountTable;
