import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Input, Modal, Space } from "antd";
import jwtAxios from "meta/services/auth/jwt-api";
import { useState } from "react";
const { confirm } = Modal;

const MarkAsComplete = ({ title, disabled = false, id, task }) => {
  const [remarks, setRemarks] = useState("");
  const showPromiseConfirm = (id) => {
    confirm({
      title: "Are You Sure?",
      icon: <ExclamationCircleFilled />,
      content: (
        <Input
          placeholder="remarks.."
          onChange={(e) => setRemarks(e.target.value)}
        />
      ),

      onOk() {
        return new Promise((resolve, reject) => {
          jwtAxios
            .patch(`meta/ticket/update/${id}`, {
              status: true,
              remarks,
            })
            .then((response) => {
              task = response.data.result;
              resolve();
            })
            .catch((error) => {
              console.error(error);
              reject();
            });
        });
      },
      onCancel() {},
    });
  };
  return (
    <Space wrap>
      <Button
        onClick={() => showPromiseConfirm(id)}
        disabled={disabled}
        size="small"
      >
        {title}
      </Button>
    </Space>
  );
};
export default MarkAsComplete;
