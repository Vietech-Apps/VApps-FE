import { blue, green, red } from "@ant-design/colors";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  Avatar,
  Col,
  Row,
  message,
  Select,
  Divider,
  Typography,
  Space,
} from "antd";
import { postAndGetData } from "meta/common/Apis";
import { getIconByName } from "meta/common/AppIcons";
import { manualNormFile } from "meta/common/FormFeilds/manulNormFile";
import ManualUploadNode from "meta/common/FormFeilds/ManulUploadNode";
import errorHandler from "meta/services/auth/errorHandler";
import { useGetData } from "meta/services/auth/ezAPI";
import jwtAxios from "meta/services/auth/jwt-api";
import successHandler2 from "meta/services/auth/successHandle2";
import { useAuthUser } from "meta/utility/AuthHooks";
import moment from "moment";
import { useState, useEffect } from "react";
const CollectionCreateForm = ({
  open,
  onCreate,
  onCancel,
  markDone = false,
  folder,
  loading,
}) => {
  const [form] = Form.useForm();
  const [labelTitle, setLabelTitle] = useState([]);
  const { Option } = Select;

  const [{ apiData: staffList }, { setRefreshing }] = useGetData(
    `admin/alllist`,
    []
  );
  const [
    { apiData: label },
    { setData: setLabel, setRefreshing: setRefreshingLabel },
  ] = useGetData(`meta/label/list?type=todo`, []);
  const { user } = useAuthUser();
  useEffect(() => {
    setRefreshing();
    setRefreshingLabel();
  }, [open]);
  const addLabel = (e) => {
    e.preventDefault();
    postAndGetData(
      `meta/label/create?type=task`,
      { title: labelTitle },
      label,
      setLabel
    );
    setLabelTitle("");
  };
  return (
    <Modal
      open={open}
      title={`Schedual Activity`}
      okText="Create"
      cancelText="Cancel"
      width={800}
      onCancel={onCancel}
      confirmLoading={loading}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        className="todo-addTask-form"
        name="basic"
        layout="vertical"
        initialValues={{
          priority: "Medium",
          //   scheduleDate: selectedDate ? moment(selectedDate, "YYYY-MM-DD") : "",
        }}
        // onFinishFailed={onFinishFailed}
      >
        <Row gutter={12}>
          {markDone ? (
            <Form.Item name="remarks">
              <Input.TextArea rows={3} placeholder="remarks..." />
            </Form.Item>
          ) : (
            <>
              <Col xs={24} sm={12} md={12}>
                <Form.Item
                  className="form-field"
                  name="message"
                  label="Title"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Task Title!",
                    },
                  ]}
                >
                  <Input className="todo-addTask-input" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12}>
                <Form.Item
                  name="assignTo"
                  className="form-field"
                  label="Assign To"
                  rules={[
                    { required: true, message: "Please select Assign to" },
                  ]}
                >
                  <Select placeholder={"user list"} mode="multiple">
                    {staffList
                      ?.filter((p) => p._id !== user._id)
                      .map((staff) => {
                        return (
                          <Option value={staff._id} key={staff._id}>
                            <div className="todo-select-row">
                              {staff.picture?.length > 0 ? (
                                <Avatar
                                  className="todo-select-avatar"
                                  src={staff.picture[0]?.url}
                                />
                              ) : (
                                <Avatar className="todo-select-avatar">
                                  {staff.name.toUpperCase()}
                                </Avatar>
                              )}
                              <span className="todo-select-name text-truncate">
                                {staff.name}
                              </span>
                            </div>
                          </Option>
                        );
                      })}
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={12}>
                <Form.Item
                  className="form-field"
                  name="scheduleDate"
                  label="ScheduleDate"
                  rules={[
                    { required: true, message: "Please select schedule date!" },
                  ]}
                >
                  <DatePicker
                    className="add-task-form-date"
                    disabledDate={(current) => {
                      return moment().add(-1, "days") >= current;
                    }}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={12}>
                <Form.Item
                  className="form-field"
                  name="priority"
                  label="Priority"
                  rules={[
                    { required: true, message: "Please select priority type!" },
                  ]}
                >
                  <Select>
                    <Option value={"High"}>High</Option>
                    <Option value={"Medium"}>Medium</Option>
                    <Option value={"Low"}>Low</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={12}>
                <Form.Item name="label" label="Label">
                  <Select
                    placeholder="Add Labels.. "
                    dropdownRender={(menu) => (
                      <>
                        {menu}
                        <Divider
                          style={{
                            margin: "8px 0",
                          }}
                        />
                        <Space
                          align="center"
                          style={{
                            padding: "0 8px 4px",
                          }}
                        >
                          <Input
                            bordered={false}
                            placeholder="Or Create New"
                            value={labelTitle}
                            onChange={(e) => setLabelTitle(e.target.value)}
                          />
                          <Typography.Link
                            onClick={addLabel}
                            style={{
                              whiteSpace: "nowrap",
                            }}
                          >
                            {getIconByName("plus")} Create New Label
                          </Typography.Link>
                        </Space>
                      </>
                    )}
                  >
                    {label?.map((item) => (
                      <Option key={item._id} value={item._id}>
                        {item.title}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12}>
                {" "}
                <Form.Item
                  label="Attachments"
                  name="attachments"
                  valuePropName="fileList"
                  getValueFromEvent={manualNormFile}
                >
                  <ManualUploadNode folder={folder} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24}>
                <Form.Item
                  className="form-field"
                  name="description"
                  // rules={[{ required: true, message: "Please description!" }]}
                  label="Description"
                >
                  <Input.TextArea
                    placeholder={"descripiton"}
                    autoSize={{ minRows: 2, maxRows: 5 }}
                    showCount
                  />
                </Form.Item>
              </Col>
            </>
          )}
        </Row>
      </Form>
    </Modal>
  );
};
const SchedualActivityModal = ({ folder = "Default", id, task, setTask }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const onCreate = async (values) => {
    setLoading(true);
    try {
      values.id = id;
      values.type = "ticket";
      const response = await jwtAxios.post("meta/logs/create", values);
      successHandler2(response);
      setTask([...task, response.data.result]);
      setLoading(false);
      setOpen(false);
    } catch (error) {
      setLoading(false);
      errorHandler(error);
    }
  };
  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          if (!id) {
            message.info("save the document");
          } else {
            setOpen(true);
          }
        }}
      >
        Schedule Acitivity
      </Button>
      <CollectionCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
        folder={folder}
        loading={loading}
      />
    </div>
  );
};
export default SchedualActivityModal;
