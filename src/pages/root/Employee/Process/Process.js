import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Button, Input, message, Space, Tooltip } from "antd";
import { useAuthUser } from "meta/utility/AuthHooks";
import React, { useState } from "react";
import LayoutApp from "meta/common/Layout/LayoutApp";
import moment from "moment";
import jwtAxios from "meta/services/auth/jwt-api";
import { RoutePermittedRole } from "shared/constants/AppEnums";
import { usePermissions } from "meta/common/CheckPermission";
const Layout = () => {
  const { user } = useAuthUser();
  const [selectedData, setSelectedData] = useState();
  const [inquery, setInquery] = useState(0);
  const [listData, setListData] = useState([]);
  const [search, setSearch] = useState();
  const [disabled, setDisabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isList, setIsList] = useState(true);
  let title = "New Department";
  let subTitle = "";
  let route = "meta/process";
  const { canRead, canCreate, canUpdate, canDelete } = usePermissions(
    RoutePermittedRole.department
  );

  let width = 700;
  let params = { q: search, disabled: disabled };
  const formList = [
    {
      name: "title",
      label: "Title",
      required: true,
      message: "title",
      type: 1,
      id: 1,
      md: 24,
      sm: 24,
      xs: 24,
    },
    // {
    //   name: 'removed',
    //   label: 'Disabled',
    //   required: null,
    //   message: '',
    //   type: 3,
    //   id: 2,
    //   md: 12,
    //   sm: 12,
    //   xs: 24,
    // },
    // {
    //   name: "ISO",
    //   label: "ISO",
    //   required: true,
    //   message: "title",
    //   type: 2,
    //   id: 3,
    //   md: 12,
    //   sm: 12,
    //   xs: 24,
    //   select: [{value: "9001"}],
    // },
  ];
  //header

  const onSearch = (value) => {
    setSearch(value);
    setInquery(inquery + 1);
    setRefresh(false);
    setIsList(false);
  };
  const onDisabled = () => {
    setDisabled(true);
    setInquery(inquery + 1);
    setRefresh(false);
    setIsList(false);
  };
  const handleEdit = (data) => {
    setSelectedData(data);
    setVisible(true);
    setRefresh(false);
  };
  const handleRefresh = () => {
    setInquery(inquery + 1);
  };
  const handleList = () => {
    setRefresh(false);
    setInquery(inquery + 1);
    setDisabled(false);
    setIsList(true);
  };
  let extra = [
    <Space wrap key="1">
      <Button onClick={handleList} type={isList == true ? "ghost" : "primary"}>
        List
      </Button>
      <Button
        onClick={handleRefresh}
        type={refresh == true ? "ghost" : "primary"}
      >
        Refresh
      </Button>
      <Button
        onClick={onDisabled}
        type={disabled == true ? "ghost" : "primary"}
      >
        Deleted
      </Button>
      {canCreate && (
        <Button
          type="primary"
          onClick={() => {
            setVisible(true);
            setSelectedData();
          }}
          icon={<FormOutlined />}
        >
          {title}
        </Button>
      )}
    </Space>,
  ];
  let footer = [
    <Space wrap key="3">
      <Input.Search
        allowClear={search}
        placeholder="search"
        onSearch={onSearch}
      />
    </Space>,
  ];
  const handleDelete = async (id, status) => {
    try {
      const response = await jwtAxios.put(`/${route}/disabled/${id}`, {
        removed: status == true ? false : true,
      });
      const filterData = listData.filter((p) => p._id !== id);
      setListData(filterData);
      message.success(response.data.message);
      setVisible(false);
    } catch (error) {
      message.error(error.response.data.message);
    }
  };
  const columns = [
    {
      title: "Id",
      dataIndex: "Id",
      key: "Id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "age",
    },
    {
      title: "CreatedBy",
      key: "created",
      render: (key) => (
        <React.Fragment key={key._id}>{key.createdBy?.name}</React.Fragment>
      ),
    },
    {
      title: "Date",
      render: (key) => (
        <React.Fragment key={key._id}>
          {moment(key.createdAt).format("ll")}
        </React.Fragment>
      ),
      key: "date",
    },
    {
      title: "Action",
      key: "address",
      render: (key) => (
        <Space wrap key={key._id}>
          {canUpdate && (
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEdit(key)}
            ></Button>
          )}
          {canDelete && (
            <Tooltip
              title={key.removed == true ? "Enable" : "Restore"}
              color="cyan"
            >
              <Button
                icon={
                  key.removed === true ? <CheckOutlined /> : <DeleteOutlined />
                }
                onClick={() => handleDelete(key._id, key.removed)}
              ></Button>
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <LayoutApp
        extra={extra}
        subTitle={subTitle}
        footer={footer}
        params={params}
        columns={columns}
        inquery={inquery}
        setInquery={setInquery}
        listData={listData}
        setListData={setListData}
        route={route}
        formList={formList}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
        width={width}
        title={title}
        visible={visible}
        setVisible={setVisible}
        user={user}
      />
    </div>
  );
};

export default Layout;
