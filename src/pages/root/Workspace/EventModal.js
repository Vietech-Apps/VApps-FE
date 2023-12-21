import React, { useEffect, useState } from "react";
import {
  Badge,
  Row,
  Col,
  Modal,
  Form,
  Input,
  Select,
  TimePicker,
  Radio,
  DatePicker,
} from "antd";
import moment from "moment";
import jwtAxios from "meta/services/auth/jwt-api";
import { useAuthUser } from "meta/utility/AuthHooks";

const badgeColors = [
  "green",
  "blue",
  "purple",
  "geekblue",
  "gold",
  "red",
  "orange",
  "cyan",
];

const { Option } = Select;
const CollectionCreateForm = ({
  visible,
  onCreate,
  onCancel,
  list,
  users,
  setSelectedDate,
  selectedDate,
}) => {
  const [form] = Form.useForm();
  const { user } = useAuthUser();

  useEffect(() => {
    form.setFieldsValue(initialFormValues);
  });
  const [isPrivate, setIsPrivate] = useState(false);
  const handleChange = (e) => {
    if (e.target.value == "public") {
      setIsPrivate(false);
    } else {
      setIsPrivate(true);
    }
  };

  const [venueList, setVenueList] = useState([]);
  useEffect(function () {
    async function getArticles() {
      try {
        const response = await jwtAxios.get(`meta/venue/alllist`);
        setVenueList(response.data.result);
      } catch (error) {
        console.log("error", error);
      }
    }
    getArticles();
  }, []);

  const initialFormValues = {
    bullet: badgeColors[0],
  };
  const [startTime, setStartTime] = useState();
  const handleChangeStart = (dateString) => {
    setStartTime(dateString);
  };

  const [selectedDateEnd, setSelectedDateEnd] = useState();
  const handleChangeEnd = (time) => {
    setSelectedDateEnd(time);
  };
  const [venue, setVenue] = useState();

  const filterDate = list?.filter(
    (data) =>
      moment(data.date, "DD-MM-YYYY").format("DD-MM-YYYY") ==
      moment(selectedDate).format("DD-MM-YYYY")
  );

  const filterVenu = list?.filter((data) =>
    data.event.some((eve) => eve.venue?._id == venue)
  );

  const filterTime = list?.filter((data) =>
    data.event.some((eve) =>
      moment(startTime, "HH:mm").isBetween(
        moment(eve.startDate, "HH:mm"),
        moment(eve.endDate, "HH:mm")
      )
    )
  );

  const filterDateEnd = list?.filter(
    (data) =>
      moment(data.date, "DD-MM-YYYY").format("DD-MM-YYYY") ==
      moment(selectedDate).format("DD-MM-YYYY")
  );
  const filterVenuEnd = list?.filter((data) =>
    data.event.some((eve) => eve.venue?._id == venue)
  );
  const filterTimeEnd = list?.filter((data) =>
    data.event.some((eve) =>
      moment(selectedDateEnd, "HH:mm").isBetween(
        moment(eve.startDate, "HH:mm"),
        moment(eve.endDate, "HH:mm")
      )
    )
  );

  const handleSelectVenu = (e) => {
    setVenue(e);
  };

  const handleDate = (value) => {
    // const selected = moment(value).format('DD-MM-YYYY');
    setSelectedDate(value);
  };

  return (
    <Modal
      open={visible}
      title={`${user.name} ${user.process} creating new Event`}
      okText="Create"
      style={{ top: "20px" }}
      cancelText="Cancel"
      onCancel={onCancel}
      width={900}
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
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Row gutter="16">
          <Col xs={24} md={16}>
            <Form.Item
              name="title"
              label="Title"
              rules={[
                {
                  required: true,
                  message: "Please select your title!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              name="venue"
              label="Meeting Venue"
              rules={[
                {
                  required: true,
                  message: `Please selecte venue!`,
                },
              ]}
            >
              <Select onSelect={handleSelectVenu}>
                {venueList.map((elm) => (
                  <Option value={elm?._id} key={elm?._id}>
                    {elm?.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item name="Date" label="Date">
              <DatePicker
                format="DD-MM-YYYY"
                onSelect={handleDate}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              name="start"
              label="Start"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please select your start time!",
                },
                () => ({
                  validator() {
                    if (
                      filterDate.length > 0 &&
                      filterVenu.length > 0 &&
                      filterTime.length > 0
                    ) {
                      return Promise.reject(
                        new Error(`Already reserverd, try other time`)
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <TimePicker
                format="HH:mm"
                onChange={handleChangeStart}
                style={{ width: "100%" }}
                showNow={false}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              name="end"
              label="End"
              rules={[
                {
                  required: true,
                  message: `Please selected end time!`,
                },
                () => ({
                  validator() {
                    if (
                      filterDateEnd.length > 0 &&
                      filterTimeEnd.length > 0 &&
                      filterVenuEnd.length > 0
                    ) {
                      return Promise.reject(
                        new Error(`Already reserverd,try other time`)
                      );
                    }
                    if (selectedDateEnd < startTime) {
                      return Promise.reject(
                        new Error(`End time must be greater than start time`)
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <TimePicker
                format="HH:mm"
                onChange={handleChangeEnd}
                style={{ width: "100%" }}
                showNow={false}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={24}>
            <Form.Item label="Description" name="description">
              <Input.TextArea showCount maxLength={100}></Input.TextArea>
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item name="bullet" label="Label">
              <Select>
                {badgeColors.map((elm) => (
                  <Option value={elm} key={elm}>
                    <Badge color={elm} />
                    <span className="text-capitalize font-weight-semibold">
                      {elm}
                    </span>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="modifier"
              rules={[
                {
                  required: true,
                  message: `Please selected  type of evnet!`,
                },
              ]}
              label="Public:notify to all & Private:notify to selected"
              className="collection-create-form_last-form-item"
            >
              <Radio.Group onChange={handleChange}>
                <Radio value="public">Public</Radio>
                <Radio value="private">Private</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          {isPrivate === true && (
            <Col xs={24} md={24}>
              <Form.Item label="Participants" name="particitpants">
                <Select
                  mode="multiple"
                  showSearch
                  placeholder="Please select Participants"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                >
                  {users?.map((p) => (
                    <Option key={p?._id} value={p?._id}>
                      {`${p?.name} ${p.process?.title}`}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          )}
        </Row>
      </Form>
    </Modal>
  );
};

const App = ({
  visible,
  selectedDate,
  list,
  addEvent,
  users,
  cancel,
  setSelectedDate,
}) => {
  return (
    <div>
      <CollectionCreateForm
        visible={visible}
        onCreate={addEvent}
        onCancel={cancel}
        selectedDate={selectedDate}
        list={list}
        users={users}
        setSelectedDate={setSelectedDate}
      />
    </div>
  );
};

export default App;
