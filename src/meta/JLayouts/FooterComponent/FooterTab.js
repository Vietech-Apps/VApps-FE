import { useEffect, useState } from "react";
import { Button, Divider, Space, Tabs, Avatar, Tooltip, Col, Row } from "antd";
import jwtAxios from "meta/services/auth/jwt-api";
import { getIconByName } from "meta/common/AppIcons";
import { useAuthUser } from "meta/utility/AuthHooks";
import FooterComments from "./CommentsTab";
import SchedualActivityModal from "./SchedualActivityModal";
import SchedualActivityList from "meta/JLayouts/FooterComponent/SchedualActivityList";
import errorHandler from "meta/services/auth/errorHandler";
import { CheckOutlined } from "@ant-design/icons";
import { getUserAvatar } from "meta/common/MyFns";
import { getData } from "meta/common/Apis";
import { StyledTabs } from "meta/common/FormFeilds/index.styled";
import AddNewMessage from "pages/apps/Chat/ChatContent/MessagesScreen/AddNewMessage";
import { StyledTabCard } from "../Layout/index.style";

const FooterTab = ({
  id,
  folder,
  data,
  route = "",

  handleSubmit = () => {},
}) => {
  const { user } = useAuthUser();
  const [following, setFollowing] = useState([]);

  const [message, setMessage] = useState("");
  const [taskId, setTaskId] = useState(data?._id || id);
  const [task, setTask] = useState([]);

  useEffect(() => {
    if (taskId) getData(`meta/logs/readbyid/${taskId}`, setTask);
  }, [taskId, data]);

  useEffect(() => {
    setTaskId(id);
    setFollowing(data?.following);
  }, [data]);

  let items = [
    {
      label: `Send Message`,
      key: "1",
      children: (
        <FooterComments
          task={task}
          setTask={setTask}
          folder={folder}
          id={taskId}
          handleSubmit={handleSubmit}
          setTaskId={setTaskId}
        />
      ),
    },

    {
      label: "Schedule Activity",
      key: "2",
      children: (
        <>
          <StyledTabCard className="p-5">
            <SchedualActivityModal
              id={taskId}
              folder={folder}
              task={task}
              setTask={setTask}
            />
          </StyledTabCard>
        </>
      ),
    },
  ];
  const handleFollowing = async (d) => {
    try {
      const isFollowing =
        following && following.some((p) => p._id === user._id);
      const response = await jwtAxios.put(
        `${route}/${isFollowing ? "unfollow" : "follow"}/${d?._id}`,
        {
          following: isFollowing ? [user._id] : user._id,
        }
      );

      setFollowing(response.data.result.following);
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleButtonClick = async () => {
    if (!id) {
      const response = await handleSubmit();
      if (response) {
        setTaskId(response._id);
        setFollowing(response.following);
        await handleFollowing(response);
      }
    } else {
      await handleFollowing(data);
    }
  };

  return (
    <>
      <StyledTabs
        className="mt-5"
        items={items}
        size="small"
        defaultActiveKey="1"
        type="card"
        tabBarExtraContent={
          <Space key={"1"}>
            {getIconByName("attachment")}
            {data?.attachments?.length}
            <Button
              type={
                following?.some((p) => p._id === user._id) ? "text" : "primary"
              }
              icon={
                following?.some((p) => p._id == user._id) ? (
                  <CheckOutlined />
                ) : (
                  ""
                )
              }
              onClick={handleButtonClick}
            >
              {following?.some((p) => p._id == user._id)
                ? "Unfollow"
                : "Follow"}
            </Button>
            <Avatar.Group
              size={"small"}
              maxCount={3}
              maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
            >
              {following?.map((p, i) => (
                <Tooltip
                  title={`${p.name} ${p.lastName}`}
                  placement="left"
                  key={i}
                >
                  {p?.picture?.length > 0 ? (
                    <Avatar src={p.picture[0]?.url} />
                  ) : (
                    <Avatar> {getUserAvatar(p)}</Avatar>
                  )}
                </Tooltip>
              ))}
            </Avatar.Group>
          </Space>
        }
      />
      <Row className="mt-5" gutter={24}>
        <Col xs={24} sm={24}>
          {/* <FooterComments
            task={task}
            setTask={setTask}
            folder={folder}
            id={taskId}
            handleSubmit={handleSubmit}
            setTaskId={setTaskId}
          /> */}
        </Col>
        <Col xs={24} sm={24}>
          <SchedualActivityList id={taskId} task={task} setTask={setTask} />
        </Col>
      </Row>
    </>
  );
};

export default FooterTab;
