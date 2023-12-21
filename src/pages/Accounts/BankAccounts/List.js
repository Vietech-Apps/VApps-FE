import ProTableComponent from "meta/JLayouts/ProTable";
import AppPageMetadata from "meta/core/AppPageMetadata";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { dataInfo } from "./Codes";
import { Button, Tooltip } from "antd";
import { AiOutlineReconciliation } from "react-icons/ai";
export default function ListTable() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  const navigate = useNavigate();
  const columns = [
    {
      title: "Bank",
      key: "bank",
      render: (_, r) => r.bank?.name,
    },
    {
      title: "Account Title",
      key: "accountHolderName",
      dataIndex: "accountHolderName",
    },
    {
      title: "Account Number",
      key: "accountNumber",
      dataIndex: "accountNumber",
      copyable: true,
    },
    {
      title: "Account Holder",
      key: "accountHolder",
      render: (_, r) => r.accountHolder?.title,
    },
  ];

  const [tableData, setTableData] = useState([]);
  const [search, setSearch] = useState("");

  return (
    <>
      <AppPageMetadata title={dataInfo} />
      <ProTableComponent
        codes={dataInfo}
        columns={columns}
        search={search}
        setSearch={setSearch}
        setTableData={setTableData}
        menu={true}
        status={"status"}
        otherParams={{ status: status }}
        additionalActionButtons={(record, refreshTable) => (
          <>
            <Tooltip title="Reconcile">
              <Button
                type="small"
                icon={<AiOutlineReconciliation />}
                onClick={() => navigate(`/accounts/reconcile/${record._id}`)}
              />
            </Tooltip>
          </>
        )}
      />
    </>
  );
}
