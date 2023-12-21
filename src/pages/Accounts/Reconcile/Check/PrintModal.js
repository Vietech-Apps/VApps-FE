import { Modal } from "antd";
import React from "react";

const PrintModal = ({ title, open, onCancel, src }) => (
  <Modal title={title} open={open} onCancel={onCancel} footer={null}>
    <iframe src={src} title={title} width="100%" height="500px" />
  </Modal>
);

export default PrintModal;
