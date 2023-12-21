import { SmileOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import { useAuthUser } from "meta/utility/AuthHooks";
import React from "react";
import { TbHeartHandshake } from "react-icons/tb";
const App = () => {
  const { user } = useAuthUser();
  return (
    <Result
      icon={
        <TbHeartHandshake style={{ fontSize: "200px", color: "#499557" }} />
      }
      title={`hi, ${user?.name}! السَّلَامُ عَلَيْكُمْ`}
    />
  );
};

export default App;
