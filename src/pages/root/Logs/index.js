import { SmileOutlined } from "@ant-design/icons";
import { Avatar, Button, Image, Spin, Tag, Timeline, Typography } from "antd";
import { useGetData } from "meta/services/auth/ezAPI";
import moment from "moment";
import { useEffect } from "react";
const Logs = ({ name, reload }) => {
  const [{ apiData: logList, loading }, { setRefreshing }] = useGetData(
    `meta/logs/readbymodule?module=${name}`,
    []
  );
  useEffect(() => {
    setRefreshing(true);
  }, [reload]);

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
  if (loading) {
    return <Spin />;
  } else {
    return (
      <Timeline>
        {logList?.map((item) => (
          <Timeline.Item color={getColor(item?.action)} key={item._id}>
            <Typography.Text type="success">
              {item?.message || item?.cuId}
            </Typography.Text>{" "}
            <br />
            By <Avatar
              src={<Image src={item?.createdBy?.picture[0]?.url} />}
            />{" "}
            {item?.createdBy?.name}
            <p>At {moment(item?.createdAt).format("DD-MM-YYYY hh:mm a")}</p>
            <p>
              {item?.changesText?.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </p>
          </Timeline.Item>
        ))}

        <Timeline.Item
          color="#00CCFF"
          dot={<SmileOutlined style={{ fontSize: "30px" }} />}
        >
          <p>Reached end of document.</p>
        </Timeline.Item>
      </Timeline>
    );
  }
};
export default Logs;
