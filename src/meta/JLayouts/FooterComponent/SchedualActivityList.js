import { EditOutlined, MailOutlined, MessageOutlined } from "@ant-design/icons";
import { ProList } from "@ant-design/pro-components";
import {
  Avatar,
  Segmented,
  Space,
  Tag,
  Upload,
  Tooltip,
  Typography,
} from "antd";
import { getUserAvatar } from "meta/common/MyFns";
import { getStatusTag } from "meta/common/status";
import { useAuthUser } from "meta/utility/AuthHooks";
import moment from "moment";
import { useState } from "react";
import MarkAsComplete from "./MarkComplete";
import Preview from "./Preview";
import { ProListStyle } from "./style";

const SchedualActivityList = ({ task }) => {
  const [selected, setSelected] = useState();
  const [open, setOpen] = useState(false);
  const handlePrivew = (data) => {
    setOpen(true);
    setSelected(data);
  };

  return (
    <>
      <ProListStyle
        rowKey="id"
        headerTitle="Workflow Log"
        dataSource={task}
        editable={{
          onSave: async (key, record, originRow) => {
            console.log(key, record, originRow);
            return true;
          },
        }}
        metas={{
          title: {
            render: (_, record) =>
              `${record.createdBy?.name}${" "}${
                record.createdBy?.lastName || ""
              }`,
          },
          avatar: {
            render: (_, key) => (
              <Tooltip
                title={`${key.createdBy?.name} ${key.createdBy?.lastName}`}
                placement="right"
              >
                {key.createdBy?.picture?.length > 0 ? (
                  <Avatar src={key.createdBy?.picture[0]?.url} />
                ) : (
                  <Avatar> {getUserAvatar(key.createdBy)}</Avatar>
                )}
              </Tooltip>
            ),
            // dataIndex: "image",
            editable: false,
          },
          description: {
            render: (_, item) => {
              return (
                <>
                  {item.type !== "email" ? (
                    <table>
                      <tbody>
                        {item.message && (
                          <tr>
                            <td>
                              <b> Message</b>{" "}
                            </td>

                            <td>
                              <h6>{item.message}</h6>
                            </td>
                          </tr>
                        )}
                        {item.status && (
                          <>
                            <tr>
                              <td>
                                <h6>
                                  <b>Remarks </b>
                                </h6>
                              </td>
                              <td> {item.remarks}</td>
                            </tr>
                          </>
                        )}
                        {item.changesText?.length > 0 && (
                          <tr>
                            <td>
                              {item.changesText?.map((p, i) => (
                                <p key={i}>{p}</p>
                              ))}
                            </td>
                          </tr>
                        )}
                        {item.description && (
                          <tr>
                            <td>
                              <h6>
                                <b>Description </b>
                              </h6>
                            </td>
                            <td>
                              <h6>{item.description}</h6>
                            </td>
                          </tr>
                        )}
                        {item.assignTo?.length > 0 && (
                          <tr>
                            <td>
                              <h6>
                                <b>Assigned </b>
                              </h6>
                            </td>

                            <td>
                              {item.assignTo?.map((p, i) => (
                                <Tooltip title={p.name} placement="top" key={i}>
                                  <Segmented
                                    size="small"
                                    key={i}
                                    options={[
                                      {
                                        label: (
                                          <div style={{ padding: 4 }}>
                                            <Avatar src={p.picture[0]?.url} />
                                            <div>{p.name}</div>
                                          </div>
                                        ),
                                        value: i,
                                      },
                                    ]}
                                  />
                                </Tooltip>
                              ))}
                            </td>
                          </tr>
                        )}
                        {item.attachments.length > 0 && (
                          <tr>
                            <td>
                              {" "}
                              <h4>
                                <b>Attachments </b>
                              </h4>
                            </td>
                            <td
                              onClick={() =>
                                handlePrivew(item.attachments[0]?.url)
                              }
                            >
                              <Upload
                                listType="picture"
                                defaultFileList={[...item.attachments]}
                                showUploadList={{
                                  showRemoveIcon: false,
                                }}
                              ></Upload>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  ) : (
                    <div>
                      To:{item.email} {item.cc && "CC : "}
                      {item.cc} {item.bcc && "BCC : "} {item.bcc}
                      <div
                        dangerouslySetInnerHTML={{ __html: item.content }}
                      ></div>
                    </div>
                  )}

                  <br></br>
                </>
              );
            },
          },
          subTitle: {
            render: (_, record) => {
              return (
                <Space>
                  {record.scheduleDate && (
                    <Tag color="blue">{record.scheduleDate}</Tag>
                  )}
                  {record.priority && getStatusTag(record.priority)}
                  {record.type == "ticket" && (
                    <MarkAsComplete
                      title={
                        record.status === true ? "Complete" : "Mark As Complete"
                      }
                      disabled={record.status === true}
                      task={task}
                      id={record?._id}
                    />
                  )}
                  {record.type == "comments" ? (
                    <MessageOutlined style={{ fontSize: "20px" }} />
                  ) : record.type == "email" ? (
                    <MailOutlined />
                  ) : record.type == "ticket" ? (
                    "Schedual Activity"
                  ) : (
                    ""
                  )}
                  <Typography.Text>
                    {" "}
                    {moment(record.createdAt).fromNow()}
                  </Typography.Text>
                </Space>
              );
            },
          },
        }}
      />
      <Preview open={open} setOpen={setOpen} data={selected} />
    </>
  );
};
export default SchedualActivityList;
