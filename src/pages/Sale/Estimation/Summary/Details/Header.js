import { DownloadOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import React, { useState } from "react";
import SendMessageForm from "./Whatsapp";

const Header = ({
  createAndDownloadPdf,
  downlaodTechnical,
  downloadStatus,
  download2Status,
  sendPdf,
  sendStatus,
}) => {
  const [showForm, setShowForm] = useState(false);
  return (
    <Space>
      <SendMessageForm />
      <Button
        loading={download2Status}
        type="primary"
        shape="round"
        icon={<DownloadOutlined />}
        onClick={downlaodTechnical}
      >
        Technical
      </Button>
      <Button
        loading={downloadStatus}
        type="primary"
        shape="round"
        icon={<DownloadOutlined />}
        onClick={createAndDownloadPdf}
      >
        Commercial
      </Button>
      <Button
        loading={sendStatus}
        type="primary"
        shape="round"
        onClick={sendPdf}
      >
        Send via Email
      </Button>
    </Space>
  );
};

export default Header;
