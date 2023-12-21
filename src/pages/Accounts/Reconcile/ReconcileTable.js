import { Button, Checkbox, Col, Form, Input, Row, Table, Tag } from "antd";
import { StyledFindTransaction } from "../index.styled";
import { StyledMetaForm } from "meta/common/FormFeilds/index.styled";
import dayjs from "dayjs";
import { SearchOutlined, WarningFilled } from "@ant-design/icons";
import { Cascader } from "antd";
import JournalEntries from "./JournalEntries";
import { StyledTable } from "meta/JLayouts/ProTable/index.style";
import JournalItemsTable from "./JournalItemsTable";

const ReconcileTable = ({ selectedItems, setselectedItems }) => {
  const columns = [
    {
      title: "Id",
      key: "Id",
      render: (_, r) => r.cuId || r.cuIdDraft,
    },
    {
      title: "Partner",
      key: "partner",
      render: (_, r) => r.partner?.title,
    },
    {
      title: "Reference",
      key: "reference",
      dataIndex: "reference",
    },

    {
      title: "Date",
      key: "date",
      dataIndex: "createdAt",
      valueType: "date",
    },
    {
      title: "Journal",
      key: "journal",
      render: (_, r) => r.journal?.journalName,
    },
    {
      title: "Company",
      key: "company",
      render: (e, r) => r.company?.name,
    },
  ];

  return (
    <>
      <>
        <StyledFindTransaction className={" p-2 border-1"}>
          <StyledMetaForm size="small">
            <Row gutter={24}>
              <Col xs={24}>
                <div className="flex justify-between mb-3">
                  <div className="font-bold mb-1">Search & Select entries.</div>
                  <Cascader
                    className="rounded"
                    options={[{ value: "zhejiang", label: "Zhejiang" }]}
                    placeholder="New Transaction"
                  />
                </div>

                {selectedItems.length > 0 && (
                  <StyledTable
                    size="small"
                    columns={columns}
                    dataSource={selectedItems}
                    showHeader={false}
                    className="w-full"
                    header={false}
                    pagination={false}
                  />
                )}
              </Col>

              <Col xs={24}>
                <JournalItemsTable />
              </Col>
            </Row>
          </StyledMetaForm>
        </StyledFindTransaction>
      </>
    </>
  );
};
export default ReconcileTable;
