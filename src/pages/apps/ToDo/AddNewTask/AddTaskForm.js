import React, { useState } from "react";
import IntlMessages from "meta/utility/IntlMessages";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import {
  Avatar,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Select,
  Space,
  Typography,
} from "antd";
import AppRowContainer from "meta/core/AppRowContainer";
import moment from "moment";
import { useAuthUser } from "meta/utility/AuthHooks";
import {
  StyledAddTaskFormDate,
  StyledSelectRow,
  StyledTodoAddTaskForm,
  StyledTodoInput,
  StyledTodoModalFooter,
  StyledTodoModelBtn,
  StyledTodoModelContent,
  StyledTodoSelectAvatar,
  StyledTodoSelectName,
} from "./index.styled";
import { useGetDataApi } from "meta/utility/APIHooks";
import { blue, green, grey, red } from "@ant-design/colors";
import { useInfoViewActionsContext } from "meta/utility/AppContextProvider/InfoViewContextProvider";
import { useGetData, usePostData } from "meta/services/auth/ezAPI";
import { getIconByName } from "meta/common/AppIcons";
import { manualNormFile } from "meta/common/FormFeilds/manulNormFile";
import ManualUploadNode from "meta/common/FormFeilds/ManulUploadNode";

const AddTaskForm = ({
  onCloseAddTask,
  selectedDate,
  reCallAPI,
  markDone,
  module,
  moduleName = "Todo",
  selectedData,
}) => {
  const infoViewActionsContext = useInfoViewActionsContext();
  const [{ apiData: label }, { setData }] = useGetData(
    "meta/label/list?type=todo",
    []
  );

  const [labelTitle, setLabelTitle] = useState([]);

  const addLabel = (e) => {
    e.preventDefault();
    usePostData("meta/label/create?type=task", infoViewActionsContext, {
      title: labelTitle,
    })
      .then((data) => {
        console.log(data, "Labeldata");
        setLabelTitle("");
        infoViewActionsContext.showMessage(
          "New Label has been created successfully!"
        );
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const [{ apiData: staffList }] = useGetData("admin/alllist", []);

  const { user } = useAuthUser();
  const priorityList = [
    { id: 4545554, name: "High", type: 1, color: red[5] },
    { id: 9384234, name: "Medium", type: 2, color: blue[5] },
    { id: 4354454, name: "Low", type: 3, color: green[5] },
  ];

  const onFinish = (values) => {
    const newTask = {
      ...values,
      folderValue: 120,
      createdOn: moment().format("ll"),
      process: user.processId,
      moduleName: moduleName,
      module: module,
    };
    console.log(newTask);
    usePostData("scrum/todo/create", infoViewActionsContext, newTask)
      .then(() => {
        reCallAPI();
        infoViewActionsContext.showMessage(
          "New Task has been created successfully!"
        );
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });

    onCloseAddTask();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    onCloseAddTask(true);
  };

  // const onUpdate = async (values) => {
  //   if (markDone) {
  //     try {
  //       const response = await jwtAxios.put(
  //         `ticket/updatemarkdone/${selectedData?._id}`,
  //         values
  //       );
  //       if (response.data.success == true) {
  //         setData(response.data.result);

  //         message.success(response.data.message);
  //         onCloseAddTask();
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       onCloseAddTask();
  //     }
  //   } else {
  //     try {
  //       const priority = priorityList.find(
  //         (label) => +values.priority === label.id
  //       );
  //       values.priority = priority;
  //       let newData = { priority: priority, ...values };
  //       const response = await jwtAxios.put(
  //         `ticket/update/${selectedData?._id}`,
  //         newData
  //       );
  //       if (response.data.success == true) {
  //         setData(response.data.result);
  //         message.success(response.data.message);

  //         onCloseAddTask();
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       onCloseAddTask();
  //     }
  //   }
  // };

  const { messages } = useIntl();

  const { Option } = Select;

  return (
    <StyledTodoAddTaskForm
      name="basic"
      initialValues={{
        scheduleDate: selectedDate ? moment(selectedDate, "YYYY-MM-DD") : "",
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      {markDone ? (
        <div className="todo-modal-content">
          <Form.Item name="remarks">
            <Input.TextArea rows={3} placeholder="remarks..." />
          </Form.Item>
        </div>
      ) : (
        <div className="todo-modal-content">
          <Form.Item
            className="form-field"
            name="title"
            label="Title"
            rules={[
              { required: true, message: "Please input your Task Title!" },
            ]}
          >
            <Input
              className="todo-addTask-input"
              placeholder={messages["todo.taskTitle"]}
            />
          </Form.Item>

          <AppRowContainer>
            <Col xs={24} sm={12} md={12}>
              <Form.Item
                name="assignTo"
                className="form-field"
                label="Assign To"
                rules={[{ required: true, message: "Please select Assign to" }]}
              >
                <Select placeholder={messages["common.staff"]} mode="multiple">
                  {staffList?.map((staff) => {
                    return (
                      <Option value={staff._id} key={staff._id}>
                        <div className="todo-select-row">
                          {staff.avatar ? (
                            <Avatar
                              className="todo-select-avatar"
                              src={staff.avatar}
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
                <Select placeholder={messages["common.priority"]}>
                  {priorityList?.map((priority) => {
                    return (
                      <Option value={priority.name} key={priority.name}>
                        {priority.name}
                      </Option>
                    );
                  })}
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
            <Col xs={24} sm={24} md={24}>
              {" "}
              <Form.Item
                name="attachments"
                valuePropName="fileList"
                getValueFromEvent={manualNormFile}
              >
                <ManualUploadNode folder={"ticket"} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24}>
              <Form.Item
                className="form-field"
                name="description"
                rules={[{ required: true, message: "Please description!" }]}
                label="Description"
              >
                <Input.TextArea
                  placeholder={messages["common.description"]}
                  autoSize={{ minRows: 2, maxRows: 5 }}
                  showCount
                />
              </Form.Item>
            </Col>
          </AppRowContainer>
        </div>
      )}

      <StyledTodoModalFooter>
        <StyledTodoModelBtn type="primary" htmlType="submit">
          <IntlMessages id="common.save" />
        </StyledTodoModelBtn>
      </StyledTodoModalFooter>
    </StyledTodoAddTaskForm>
  );
};

export default AddTaskForm;

AddTaskForm.propTypes = {
  setFieldValue: PropTypes.func,
  reCallAPI: PropTypes.func,
  isSubmitting: PropTypes.bool,
  onCloseAddTask: PropTypes.func,
  selectedDate: PropTypes.any,
};
