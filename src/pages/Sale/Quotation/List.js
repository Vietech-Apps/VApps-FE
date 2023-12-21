import { Avatar, Button, Select, Tooltip } from "antd";
import { getStatusOption, getOptions } from "meta/common/MyFns";
import { getStatusTag } from "meta/common/status";
import AppPageMetadata from "meta/core/AppPageMetadata";
import errorHandler from "meta/services/auth/errorHandler";
import { useGetData } from "meta/services/auth/ezAPI";
import jwtAxios, { BackEnd_URL } from "meta/services/auth/jwt-api";
import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { dataInfo } from "./Code";
import { TableDropdown } from "@ant-design/pro-components";
import LifeCycle from "../Enquiry/LifeCycle";
import ProTableComponent from "meta/JLayouts/ProTable";
import { PlusOutlined } from "@ant-design/icons";

export default function ListTable() {
  const { pathname } = useLocation();
  const [tableData, setTableData] = useState([]);
  const [{ apiData: contactList }] = useGetData(`meta/contact/list`, []);
  const navigate = useNavigate();
  const handleForward = async (e, record) => {
    try {
      const res = await jwtAxios.post(`${dataInfo.dataRoute}/dcorinvoice`, {
        documentStatus: e,
        soId: record._id,
        products: record.products,
      });

      if (e == "DC") {
        navigate(
          `/sales/DeliveryChallan/workspace/${res.data?.result?.docuemntId}`
        );
      } else {
        navigate(`/accounts/DeliveryChallan/${res.data?.result?.docuemntId}`);
      }
    } catch (error) {
      errorHandler(error);
    }
  };
  const columns = [
    {
      title: "Status",
      width: 80,
      key: "status",
      fixed: "left",
      dataIndex: "quotationStatus",
      render: (p) => (
        <Link to={`${dataInfo.navPath}/workspaces/${p}`}>
          {getStatusTag(p)}
        </Link>
      ),
      renderFormItem: () => {
        return (
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            allowClear
            options={getStatusOption(
              tableData?.statusCountsWithToday?.filter(
                (d) => d.status !== "All" && d.status !== "Today"
              ) || []
            )}
            placeholder="status"
          />
        );
      },
    },

    {
      title: "Customer",
      key: "customer",
      width: 160,
      render: (_, key) => <small key={key._id}>{key.customer?.title}</small>,
      ellipsis: true,
      renderFormItem: () => {
        return <Select allowClear options={getOptions(contactList)} />;
      },
    },

    {
      title: "Detail",
      key: "detail",
      dataIndex: "detail",
      hideInSearch: true,
      render: (key) => <small key={key._id}>{key}</small>,
      valueType: "string",
      ellipsis: true,
    },
    {
      title: "Date",
      key: "date",
      width: 100,
      dataIndex: "quotationDate",
      render: (key) => <small>{key}</small>,
      // valueType: "date",
    },

    {
      title: "Medium",
      key: "medium",
      render: (record) => record.medium?.map((p) => <small key={p}>{p}</small>),
      renderFormItem: () => {
        return (
          <Select>
            <Select.Option value="Email">Email</Select.Option>
            <Select.Option value="Call">Call</Select.Option>
            <Select.Option value="Visit">Visit</Select.Option>
            <Select.Option value="Direct">Direct</Select.Option>
            <Select.Option value="Whatsapp">Whatsapp</Select.Option>
            <Select.Option value="Other">Other</Select.Option>
          </Select>
        );
      },
    },
    {
      title: "Following",
      key: "following",
      hideInSearch: true,
      render: (record) => (
        <Avatar.Group size={"small"}>
          {record.following?.map((item, index) => (
            <Tooltip title={item.name} placement="top" key={index}>
              <Avatar src={item.picture[0]?.url} />
            </Tooltip>
          ))}
        </Avatar.Group>
      ),
    },

    {
      title: "Reference",
      responsive: ["md"],
      key: "referenceNo",
      hideInSearch: true,
      dataIndex: "referenceNo",
    },

    {
      title: "Assigned",
      key: "assigned",
      hideInSearch: true,
      render: (record) => (
        <Avatar.Group size={"small"}>
          {record.assignTo?.map((item, index) => (
            <Tooltip title={item.name} placement="top" key={index}>
              <Avatar src={item.avatar} />
            </Tooltip>
          ))}
        </Avatar.Group>
      ),
    },
  ];
  const [search, setSearch] = useState();
  return (
    <>
      <AppPageMetadata title={dataInfo.metaData} />
      <ProTableComponent
        codes={dataInfo}
        columns={columns}
        search={search}
        setSearch={setSearch}
        setTableData={setTableData}
        menu={true}
        status={"status"}
        expandedRowRender={(record) => (
          <>
            Life cycle
            <LifeCycle record={record} />
            <br></br>
            {record.attachments?.length > 0 && (
              <>
                Attachments
                <iframe
                  src={`${BackEnd_URL}${record?.attachments[0]?.url}`}
                  width="100%"
                  height="600"
                ></iframe>
              </>
            )}
          </>
        )}
        isCustomViewButton={true}
        additionalActionButtons={(record, refreshTable) => (
          <>
            <Tooltip title="View">
              <Button
                type="text"
                size="small"
                key={"edit"}
                onClick={() => navigate(`${pathname}/workspaces/${record._id}`)}
                icon={<AiOutlineEye />}
              />
            </Tooltip>
            {/* <TableDropdown
              key="actionGroup"
              menus={[
                {
                  key: "dChallan",
                  name: "Create Delivery Challan",
                  onClick: () => handleForward("DC", record),
                  disabled: record.isDisabled,
                  icon: <PlusOutlined />,
                },
                {
                  key: "invoice",
                  name: "Create Invoice",
                  disabled: record.isDisabled,
                  onClick: () => handleForward("Invoice", record),
                  icon: <PlusOutlined />,
                },
              ]}
            /> */}
          </>
        )}
      />
    </>
  );
}
