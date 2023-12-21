import { SmileOutlined } from "@ant-design/icons";
import { Avatar, Button, Drawer, Image, Timeline, Tooltip } from "antd";
import { useGetData } from "meta/services/auth/ezAPI";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { FiActivity } from "react-icons/fi";

const LogDrawer = ({ name }) => {
  const [open, setOpen] = useState();
  const encodedName = encodeURIComponent(JSON.stringify(name));
  const [{ apiData: logList }, { setRefreshing }] = useGetData(
    `erp/panel/log?myArray=${encodedName}`,
    []
  );
  useEffect(() => {
    setRefreshing(true);
  }, []);

  function getColor(action) {
    switch (action) {
      case "Create":
        return "green";
      case "Update":
        return "blue";
      case "Delete":
        return "red";
      default:
        return "black";
    }
  }
  return (
    <>
      <Tooltip color="cyan" title={`Activity log `} key={"logs"}>
        <Button
          onClick={() => setOpen(true)}
          icon={<FiActivity />}
        ></Button>
      </Tooltip>
      <Drawer
        title={`${logList?.length} Activity log`}
        placement="right"
        // closable={false}
        onClose={() => setOpen(false)}
        open={open}
      >
        <Timeline>
          {logList?.map((item) => (
            <Timeline.Item color={getColor(item?.action)} key={item._id}>
              <p>{item?.title}</p>
              By{" "}
              <Avatar
                src={<Image src={item?.createdBy?.picture[0]?.url} />}
              />{" "}
              {item?.createdBy?.name}
              <p>At {moment(item?.createdAt).format("DD-MM-YYYY hh:mm a")}</p>
            </Timeline.Item>
          ))}

          <Timeline.Item
            color="#00CCFF"
            dot={<SmileOutlined style={{ fontSize: "30px" }} />}
          >
            <p>Reached end of document.</p>
          </Timeline.Item>
        </Timeline>
      </Drawer>
    </>
  );
};

export default LogDrawer;
