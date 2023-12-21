import ProTableComponent from "meta/JLayouts/ProTable";
import AppPageMetadata from "meta/core/AppPageMetadata";
import errorHandler from "meta/services/auth/errorHandler";
import jwtAxios from "meta/services/auth/jwt-api";
import successHandler from "meta/services/auth/successHandler";
import { useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { proTitle, reconcileInfo, route3 } from "./Codes";
import ProTableWithoutFormLayout from "meta/JLayouts/ProTable/ProTableWithoutFormLayout";
export default function JournalEntries({ setselectedItems }) {
  const actionRef = useRef();
  const refreshTable = () => actionRef?.current?.reload();
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");

  const restTable = () => actionRef?.current?.reset();
  const delRowConfirm = async (record) => {
    record.removed = !record.removed;
    try {
      const response = await jwtAxios.patch(
        `${route3}/disabled/${record?._id}`,
        {
          ...record,
        }
      );
      successHandler(response);
      refreshTable();
    } catch (error) {
      errorHandler(error);
    }
  };
  const navigate = useNavigate();
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

  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [search, setSearch] = useState("");

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleRowSelectionChange = (selectedRowKeys, selectedRows) => {
    setSelectedRowKeys(selectedRowKeys);
    setselectedItems(selectedRows);
  };

  return (
    <>
      <AppPageMetadata title={reconcileInfo.metaData} />
      <ProTableWithoutFormLayout
        columns={columns}
        codes={reconcileInfo}
        actionRef={actionRef}
        search={search}
        headerTitle={"Find & Select transactions"}
        setSearch={setSearch}
        setTableData={setTableData}
        menu={true}
        refreshTable={refreshTable}
        canCreate={true}
        status={"status"}
        scroll={1000}
        searchPlaceHolder="Search here"
        otherParams={{ status: status }}
        rowSelection={{
          selectedRowKeys,
          onChange: handleRowSelectionChange,
        }}
      />
    </>
  );
}
