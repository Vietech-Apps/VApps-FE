import { Button, Modal } from "antd";
import { useState } from "react";
const App = ({ open, setOpen, data }) => {
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        width={1100}
        title="Basic Modal"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <iframe src={`${data}`} title="testPdf" width="100%" height={"500px"} />
      </Modal>
    </>
  );
};
export default App;
