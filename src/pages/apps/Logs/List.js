import { ProList } from "@ant-design/pro-components";
import { Alert, Avatar, Button, Image, Space, Tag, Tooltip } from "antd";
import jwtAxios from "meta/services/auth/jwt-api";
import dayjs from "dayjs";
const Ticket = () => {
  return (
    <ProList
      rowKey={(record, i) => i}
      //   toolBarRender={() => {
      //     return [
      //       <Button key="3" type="primary">
      //         Add More
      //       </Button>,
      //     ];
      //   }}

      search={{}}
      headerTitle="Ticket"
      request={async (params = {}, sort, filter) => {
        const res = await jwtAxios.get("meta/ticket/prolist", {
          params,
        });

        return res.data;
      }}
      pagination={{
        pageSize: 5,
      }}
      //   showActions="hover"
      metas={{
        title: {
          dataIndex: "title",
          render: (_, record) => record.createdBy?.name,
          search: false,
        },
        avatar: {
          dataIndex: "avatar",
          render: (_, record) => (
            <Avatar src={record?.createdBy?.picture[0]?.url} />
          ),
          search: false,
        },
        description: {
          dataIndex: "title",
          search: false,
          render: (_, record) => (
            <span>
              {record.title}
              <br></br>
              {record?.description}
            </span>
          ),
        },

        subTitle: {
          dataIndex: "labels",
          render: (_, row) => {
            var _a;
            return (
              <Space size={0}>
                <Tag color={row.priority?.color} key={row.priority?.id}>
                  {row.priority?.name}
                </Tag>
                <Tooltip title="Created at" color="cyan">
                  <Tag>{dayjs(row?.createdAt).format("DD-MM-YYYY")}</Tag>
                </Tooltip>
              </Space>
            );
          },
          search: false,
        },

        actions: {
          render: (text, row) => [
            <Alert
              message={dayjs(row.scheduleDate).format("DD-MM-YYYY")}
              status="info"
              key={"date"}
            />,
          ],
          search: false,
        },
        dueDate: {
          title: "Due Date",
          valueType: "date",
          key: "scheduleDate",
        },
        createdAt: {
          title: "CreatedAt",
          valueType: "date",
          key: "createdat",
        },
        status: {
          title: "State",
          valueType: "select",
          valueEnum: {
            all: { text: "ALL", status: "Default" },
            open: {
              text: "Unsoloved",
              status: "Error",
            },
            closed: {
              text: "Solved",
              status: "Success",
            },
            processing: {
              text: "others",
              status: "Processing",
            },
          },
        },
      }}
    />
  );
};
export default Ticket;
