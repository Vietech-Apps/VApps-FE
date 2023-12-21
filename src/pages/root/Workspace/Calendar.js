import React, { useState, useEffect } from "react";
import {
  Calendar,
  Badge,
  Card,
  Row,
  Col,
  Button,
  Tooltip,
  message,
  Avatar,
} from "antd";
import moment from "moment";
import { useAuthUser } from "meta/utility/AuthHooks";
import {
  CalendarOutlined,
  DeleteOutlined,
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import "./calendar.style.less";
import jwtAxios from "meta/services/auth/jwt-api";
import EventModal from "./EventModal";

const AgendaList = (props) => {
  const { list, onDelete } = props;
  const { user } = useAuthUser();
  return list
    ?.map((list) => (
      <div key={list._id} className="calendar-list">
        <h4>
          <CalendarOutlined />
          <span className="ml-2"> {list.date}</span>
        </h4>

        {list?.event.map((eventItem, i) => (
          <Tooltip
            color="cyan"
            title={`CreatedBy: ${eventItem.userId?.name} ${eventItem.process?.title}`}
            key={`${eventItem.title}-${i}`}
          >
            <div className="calendar-list-item">
              <div className="d-flex">
                {eventItem.modifier === "public" ? (
                  <UnlockOutlined />
                ) : (
                  <LockOutlined />
                )}
                <Badge color={eventItem.bullet} />
                <div>
                  <h6 className="mb-0">{eventItem.title}</h6>{" "}
                  {eventItem.particitpants?.length > 0 && (
                    <span className="text-muted">
                      <Avatar.Group
                        maxCount={6}
                        maxStyle={{
                          color: "#f56a00",
                          backgroundColor: "#fde3cf",
                        }}
                        size="small"
                      >
                        {eventItem.particitpants?.map((data) => (
                          <Tooltip
                            color="cyan"
                            title={`${data.name} ${data.process?.title}`}
                            placement="top"
                            key={data._id}
                          >
                            <Avatar
                              style={{
                                backgroundColor: "#87d068",
                              }}
                              // icon={<UserOutlined />}
                              src={data.avatar}
                            />
                          </Tooltip>
                        ))}
                      </Avatar.Group>
                    </span>
                  )}
                  {eventItem.particitpants?.length > 0 && <br></br>}
                  <span className="text-muted">
                    <small>
                      {" "}
                      <b>
                        {" "}
                        {moment(eventItem.start).format("HH:mm")} -{" "}
                        {moment(eventItem.end).format("HH:mm")}
                      </b>{" "}
                      <br></br>
                      {eventItem.venue?.title}
                    </small>{" "}
                  </span>
                  <br></br>
                  <small> {eventItem.description}</small>
                </div>
              </div>
              <div className="calendar-list-item-delete">
                <Tooltip title="Delete event">
                  <Button
                    icon={<DeleteOutlined />}
                    onClick={() => onDelete(list, i, eventItem)}
                    disabled={eventItem.userId._id !== user._id}
                  ></Button>
                </Tooltip>
              </div>{" "}
            </div>
          </Tooltip>
        ))}
      </div>
    ))

    .reverse();
};

const CalendarApp = () => {
  const [calendarList, setCalendarList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [clickedMonth, setClickedMonth] = useState(
    moment().format("YYYY-MM-DD")
  );
  const { user } = useAuthUser();
  const [users, setUsers] = useState([]);
  useEffect(function () {
    async function getArticles() {
      try {
        const response = await jwtAxios.get(`admin/alllist`);
        setUsers(response.data.result);
      } catch (error) {
        console.log("error", error);
      }
    }
    getArticles();
  }, []);

  useEffect(
    function () {
      async function getArticles() {
        try {
          const response = await jwtAxios.get(
            `meta/calender?month=${clickedMonth}`
          );
          setCalendarList(response.data);
        } catch (error) {
          console.log("error", error);
        }
      }
      getArticles();
    },
    [clickedMonth]
  );
  console.log(calendarList);
  // console.log(calendarList);
  const cellRender = (value) => {
    const listData = getListData(moment(value).format("DD MMMM"));

    return (
      <ul className="calendar-event">
        {listData.map((item, i) => (
          <li key={`${item.title}-${i}`}>
            <Badge color={item.bullet} text={item.title} />
          </li>
        ))}
      </ul>
    );
  };

  const getListData = (value) => {
    let listData = [];
    calendarList?.forEach((elm) => {
      if (moment(elm.date, "DD MMMM").format("DD MMMM") === value) {
        listData = elm.event;
      }
    });
    return listData;
  };

  const onSelect = () => {
    setModalVisible(true);
  };
  const handleMonthData = (values) => {
    let month = moment(values).format("YYYY-MM-DD");
    setClickedMonth(month);
  };

  const onDeleteEvent = async (list, index, event) => {
    if (list.event.length == 1) {
      try {
        await jwtAxios.delete(`meta/calender/${list._id}`);
        message.success("event data delete successfully");
        const data = calendarList
          .map((calendarList) => {
            if (calendarList._id === list._id) {
              calendarList.event = calendarList.event.filter(
                (_, i) => i !== index
              );
            }
            return calendarList;
          })
          .filter((elm) => elm.event.length !== 0);
        setCalendarList(data);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await jwtAxios.delete(
          `meta/calender/object/${list._id}/event/${event._id}`
        );
        message.success("event data delete successfully");
        const data = calendarList
          .map((calendarList) => {
            if (calendarList._id === list._id) {
              calendarList.event = calendarList.event.filter(
                (_, i) => i !== index
              );
            }
            return calendarList;
          })
          .filter((elm) => elm.event.length !== 0);
        setCalendarList(data);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleNotification = async (result, id) => {
    try {
      const response = await jwtAxios.post("meta/notification/create", {
        senderId: user._id,
        receiverId: id,
        message: `invited you to an Event ${
          result.event[0].title
        } from ${moment(result.event[0].start).format("ll")} to ${moment(
          result.event[0].end
        ).format("ll")}`,
        type: "event",
        docId: result.Id,
        mode: "Event",
        path: `/meta-workspace/event-management`,
      });

      //dispatch(addNotification(response.data));
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleNotificationUpdate = async (result, id, length) => {
    try {
      const response = await jwtAxios.post("meta/notification/create", {
        senderId: user._id,
        receiverId: id,
        message: `invited you to an Event ${
          result.event[length].title
        } from ${moment(result.event[length].start).format("ll")} to ${moment(
          result.event[length].end
        ).format("ll")}`,
        type: "event",
        docId: result.Id,
        mode: "event",
        path: `/meta-workspace/event-management`,
      });

      //dispatch(addNotification(response.data));
    } catch (error) {
      console.log("error", error);
    }
  };

  const onAddEvent = async (values) => {
    const data = [
      {
        title: values.title ? values.title : "Untitled Event",
        bullet: values.bullet,
        start: values.start,
        end: values.end,
        userId: user._id,
        process: user.processId,
        modifier: values.modifier,
        venue: values.venue,
        description: values.description ? values.description : "",
        startDate: moment(values.start).format("HH:mm"),
        endDate: moment(values.end).format("HH:mm"),
        particitpants: values.particitpants ? values.particitpants : [],
      },
    ];
    const newCalendarArr = calendarList;
    const isExistingDate = newCalendarArr.find(
      (x) => x.date == moment(selectedDate).format("DD-MM-YYYY")
    );

    if (isExistingDate) {
      for (let elm of newCalendarArr) {
        if (elm.date === moment(selectedDate).format("DD-MM-YYYY")) {
          try {
            const response = await jwtAxios.put(
              `meta/calender/${isExistingDate._id}`,
              {
                event: data,
              }
            );

            if (response.data.success === true) {
              if (data[0].modifier == "public") {
                let eventTotalLength = response.data.result.event.length;
                let eventlent = eventTotalLength - 1;
                users.map(
                  (p) =>
                    p._id !== user._id &&
                    handleNotificationUpdate(response.data.result, p, eventlent)
                );
              } else {
                let eventTotalLength = response.data.result.event.length;
                let eventlent = eventTotalLength - 1;

                data[0].particitpants.map((p) =>
                  handleNotificationUpdate(response.data.result, p, eventlent)
                );
              }
              let eventlent = response.data.result.event.length;
              let dataa = [
                {
                  title: values.title ? values.title : "Untitled Event",
                  bullet: values.bullet,
                  start: values.start,
                  end: values.end,
                  userId: response.data.result.event[eventlent - 1].userId,
                  process: response.data.result.event[eventlent - 1].process,
                  modifier: values.modifier,
                  venue: response.data.result.event[eventlent - 1].venue,
                  description: values.description ? values.description : "",
                  startDate: moment(values.start).format("HH:mm"),
                  endDate: moment(values.end).format("HH:mm"),
                  particitpants: values.particitpants
                    ? response.data.result.event[eventlent - 1].particitpants
                    : [],
                },
              ];
              elm.event = [...elm.event, ...dataa];
              message.success("event created successfully");
            }
          } catch (error) {
            console.log("error", error);
          }
        }
      }
    } else {
      try {
        const response = await jwtAxios.post("meta/calender", {
          date: moment(selectedDate).format("DD-MM-YYYY"),
          event: data,
        });
        if (response.data.success === true) {
          if (data[0].modifier == "public") {
            users.map(
              (p) =>
                p._id !== user._id &&
                handleNotification(response.data.result, p)
            );
          } else {
            data[0].particitpants.map((p) =>
              handleNotification(response.data.result, p)
            );
          }

          message.success("event created successfully");
          newCalendarArr.push({
            _id: response.data.result._id,
            date: moment(selectedDate).format("YYYY-MM-DD"),
            event: [
              {
                title: values.title ? values.title : "Untitled Event",
                bullet: values.bullet,
                start: values.start,
                end: values.end,
                userId: response.data.result.event[0].userId,
                venue: response.data.result.event[0].venue,
                process: response.data.result.event[0].process,
                modifier: values.modifier,

                description: values.description ? values.description : "",
                startDate: moment(values.start).format("HH:mm"),
                endDate: moment(values.end).format("HH:mm"),
                particitpants: response.data.result.event[0].particitpants,
              },
            ],
          });
        }
      } catch (error) {
        console.log("error", error);
      }
    }
    const sortedNewCalendarArr = newCalendarArr.sort(
      (a, b) => moment(a.date) - moment(b.date)
    );
    setModalVisible(false);
    setCalendarList(sortedNewCalendarArr);
  };

  const onAddEventCancel = () => {
    setModalVisible(false);
  };

  const getMonthData = (value) => {
    if (value.month() === 8) {
      return 1394;
    }
  };
  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  return (
    <Card className="calendar mb-0">
      <Row>
        <Col xs={24} sm={24} md={7} lg={7}>
          {
            <Button onClick={onSelect} type="primary">
              Add Event
            </Button>
          }

          <h2 className="mb-4 d-block">
            {moment(clickedMonth).format("MMMM")}
          </h2>

          <AgendaList
            list={calendarList ? calendarList : []}
            onDelete={onDeleteEvent}
          />
        </Col>
        <Col xs={24} sm={24} md={17} lg={17}>
          <Calendar
            onSelect={(val) => handleMonthData(val)}
            dateCellRender={cellRender}
            fullscreen={true}
            monthCellRender={monthCellRender}
          />
        </Col>
      </Row>
      <EventModal
        visible={modalVisible}
        addEvent={onAddEvent}
        cancel={onAddEventCancel}
        users={users}
        user={user}
        list={calendarList ? calendarList : []}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </Card>
  );
};

export default CalendarApp;
